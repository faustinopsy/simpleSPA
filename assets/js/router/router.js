import Navbar from './Navbar.js';

class Router {
    constructor() {
        this.components = {};
        this.componentCache = {};
        this.routes = {
            '/': 'HomePage',
            '/about': 'AboutPage',
            '/contact': 'ContactPage'
        };
        this.init();
        this.preloadComponents();
    }

    async init() {
        const navbar = new Navbar();
        document.body.insertAdjacentHTML('afterbegin', navbar.render());
        await navbar.afterRender();

        window.addEventListener('popstate', () => {
            this.render(decodeURI(window.location.pathname));
        });

        document.body.addEventListener('click', e => {
            if (e.target.matches('.w3-bar-item')) {
                e.preventDefault();
                const href = e.target.getAttribute('href');
                history.pushState(null, null, href);
                this.render(href);
            }
        });

        this.render(decodeURI(window.location.pathname));
    }

    preloadComponents() {
        const componentsToPreload = ['HomePage', 'AboutPage', 'ContactPage'];
        componentsToPreload.forEach(componentName => {
            import(`../pages/${componentName}.js`).then(module => {
                this.components['/' + componentName.replace('Page', '').toLowerCase()] = module.default;
            });
        });
    }

    async render(pathname) {
        const start = performance.now();
        let page = this.componentCache[pathname];
        if (!page) {
            const componentClass = this.components[pathname] || await this.loadComponent(this.routes[pathname]);
            page = new componentClass();
            this.componentCache[pathname] = page; 
        }
        const componentClass = this.components[pathname] || await this.loadComponent(this.routes[pathname]);
        page = new componentClass();
        const pageContent = await page.render();
        document.getElementById('app').innerHTML = pageContent;
        if (page.afterRender) {
            await page.afterRender();
        }
        const end = performance.now(); 
        console.log(`Carregamento do componente para "${pathname}": ${(end - start).toFixed(2)} ms.`);
        this.updateMetaTags(page.title, page.description, page.keywords);
    }

    async loadComponent(componentName) {
        if (!componentName) {
            return ErrorPage;
        }
        if (this.components['/' + componentName.toLowerCase()]) {
            return this.components['/' + componentName.toLowerCase()];
        }
        const module = await import(`../pages/${componentName}.js`);
        return module.default;
    }

    updateMetaTags(title, description, keywords) {
        document.title = title;

        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        } else {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            metaDescription.setAttribute('content', description);
            document.head.appendChild(metaDescription);
        }

        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', keywords);
        } else {
            metaKeywords = document.createElement('meta');
            metaKeywords.setAttribute('name', 'keywords');
            metaKeywords.setAttribute('content', keywords);
            document.head.appendChild(metaKeywords);
        }
    }
}

export default Router;
