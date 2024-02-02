import HomePage from '../pages/HomePage.js';
import AboutPage from '../pages/AboutPage.js';
import ContactPage from '../pages/ContactPage.js';
import Navbar from './Navbar.js';

class Router {
    constructor() {
        this.routes = {
            '/': new HomePage(),
            '/about': new AboutPage(),
            '/contact': new ContactPage()
        };
        this.init();
    }

    init() {
        const navbar = new Navbar();
        document.body.insertAdjacentHTML('afterbegin', navbar.render());
        navbar.afterRender();
        window.addEventListener('popstate', () => {
            this.render(decodeURI(window.location.pathname));
        });
    
        document.body.addEventListener('click', e => {
            if (e.target.matches('.w3-bar-item')) {
                e.preventDefault();
                this.navigateTo(e.target.getAttribute('href'));
            }
        });
        this.render(decodeURI(window.location.pathname));
    }

    navigateTo(url) {
        history.pushState(null, null, url);
        this.render(decodeURI(window.location.pathname));
    }

    
    async  render(pathname) {
        
        const page = this.routes[pathname] || new ErrorPage();
        const pageContent = await page.render();
        document.getElementById('app').innerHTML = pageContent;
        if (page.afterRender) {
            await page.afterRender(); 
        }
        const title = page.title || 'Página não encontrada';
        const description = page.description || 'Descrição padrão da página.';
        const keywords = page.keywords || 'palavra-chave1, palavra-chave2';
        
        this.updateMetaTags(title, description, keywords);
    }
    
    updateMetaTags(title, description = '', keywords = '') {
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
