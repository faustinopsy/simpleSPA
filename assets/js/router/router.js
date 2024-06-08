import Navbar from './Navbar.js';

class Router {
    constructor() {
        this.components = {};
        this.componentCache = {};
        this.routes = {
            '/#': 'HomePage',
            '/#about': 'AboutPage',
            '/#contact': 'ContactPage'
        };
        this.navbar = new Navbar();
        this.init();
        this.preloadComponents();
    }

    async init() {
        document.body.insertAdjacentHTML('afterbegin', this.navbar.render());
        await this.navbar.afterRender();
    
        window.addEventListener('hashchange', () => this.render(window.location.hash));
        this.render(window.location.hash);
    }
    

    preloadComponents() {
        Object.keys(this.routes).forEach(route => {
            const componentName = this.routes[route];
            import(`../pages/${componentName}.js`).then(module => {
                this.components[route] = module.default;
            }).catch(e => console.error("Erro ao pré-carregar o componente:", componentName, e));
        });
    }
    async render(hash) {
        const start = performance.now();
        let normalizedHash = hash.startsWith('/#') ? hash : '/#' + hash.replace('#', '');
        normalizedHash = normalizedHash === '/#' ? normalizedHash : normalizedHash;
        const componentName = this.routes[normalizedHash];
        if (!componentName) {
            console.error("Rota não encontrada, carregando página de erro.");
            this.loadErrorPage();
            return;
        }
    
        await this.loadAndRenderComponent(normalizedHash, componentName);
        const end = performance.now();
        console.log(`Carregamento do componente para "${normalizedHash}": ${(end - start).toFixed(2)} ms.`);
    }
    
    async loadAndRenderComponent(route, componentName) {
        if (!this.componentCache[route]) {
            try {
                const module = await import(`../pages/${componentName}.js`);
                const componentInstance = new module.default();
                this.componentCache[route] = componentInstance;
            } catch (e) {
                console.error(`Erro ao carregar o componente: ${componentName}`, e);
                this.loadErrorPage();
                return;
            }
        }
    
        const component = this.componentCache[route];
        const pageContent = await component.render();
        document.getElementById('app').innerHTML = pageContent;
        if (component.afterRender) await component.afterRender();
        this.updateMetaTags(component.title, component.description, component.keywords);
    }
    
    async loadErrorPage() {
        const module = await import(`../pages/ErrorPage.js`);
        const errorPage = new module.default();
        document.getElementById('app').innerHTML = await errorPage.render();
        if (errorPage.afterRender) await errorPage.afterRender();
        this.updateMetaTags(errorPage.title, errorPage.description, errorPage.keywords);
    }
    

    updateMetaTags(title, description, keywords) {
        document.title = title;
        this.updateMeta('description', description);
        this.updateMeta('keywords', keywords);
    }

    updateMeta(name, content) {
        let element = document.querySelector(`meta[name="${name}"]`);
        if (!element) {
            element = document.createElement('meta');
            element.setAttribute('name', name);
            document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    }
}

export default Router;
