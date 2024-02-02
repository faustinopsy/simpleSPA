import Component from '../component/component.js';
import FetchData from '../lib/FetchData.js';

class FormContact extends Component {
    constructor(submitCallback) {
        super();
        this.submitCallback = submitCallback;
    }

    render() {
        return `
            <form id="contact-form">
                <div class="form-group">
                    <label for="name">Nome:</label>
                    <input type="text" id="name" name="name" class="w3-input" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" class="w3-input" required>
                </div>
                <div class="form-group">
                    <label for="message">Mensagem:</label>
                    <textarea id="message" name="message" class="w3-input" rows="4" required></textarea>
                </div>
                <button type="submit" class="w3-btn w3-blue">Enviar</button>
            </form>
        `;
    }

    afterRender() {
        const form = document.getElementById('contact-form');
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); 
            const formData = new FormData(form);
            
            const formObj = {};
            formData.forEach((value, key) => { formObj[key] = value; });
            
            const jsonData = JSON.stringify(formObj);

            const fetchData = new FetchData('back/submit_contact.php');
            
            try {
                const response = await fetch(fetchData.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: jsonData
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Success:', data);
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
}

export default FormContact;