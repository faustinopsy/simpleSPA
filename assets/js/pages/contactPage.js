import Component from '../component/Component.js';
import FormContact from '../form/FormContact.js';

class ContactPage extends Component {
    constructor() {
        super();
        this.title = 'Contato - Meu SPA';
        this.description = 'Entre em contato conosco através desta página.';
        this.keywords = 'contato,email,telefone,endereço';
    }

    render() {
        const handleSubmit = (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            console.log('Dados do Formulário:', data);
        };

        const formComponent = new FormContact(handleSubmit);
        return `
        <div class="w3-center">
            <div class="contact-page">
                <h1>Contato</h1>
                ${formComponent.render()}
            </div>
        </div>
        `;
    }

    afterRender() {
        const formComponent = new FormContact();
        formComponent.afterRender(); 
    }
}

export default ContactPage;