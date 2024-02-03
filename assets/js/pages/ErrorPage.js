import Component from '../component/Component.js';

class ErrorPage extends Component {
    constructor() {
        super();
        this.title = '404 Não Encontrado - Meu SPA';
        this.description = 'Página de erro amigável.';
        this.keywords = 'contato,email,telefone,endereço';
    }
    render() {
        document.head.appendChild(this.createMetaTag('robots', 'noindex'));
        return `<div>Error: Página não encontrada.</div>`;
    }
    
    createMetaTag(name, content) {
        let tag = document.createElement('meta');
        tag.name = name;
        tag.content = content;
        return tag;
    }
    
}

export default ErrorPage;
