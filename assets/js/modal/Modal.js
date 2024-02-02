import Component from '../component/component.js';

class Modal extends Component {
    constructor(content) {
        super();
        this.content = content;
    }

    render() {
        return `
            <div class="w3-modal" style="display:none;">
                <div class="w3-center">
                    <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:600px">
                        <span id="closebutton" class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
                        <div class="w3-center">
                            ${this.content}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    afterRender() {
        const modal = document.querySelector('.w3-modal');
        const closeButton = document.getElementById('closebutton');

        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        this.open = () => {
            modal.style.display = 'block';
        };
    }

    updateContent(newContent) {
        this.content = newContent;
        const modalContentContainer = document.querySelector('.w3-modal-content');
        modalContentContainer.innerHTML = `<span id="closebutton" class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Fechar">&times;</span>${this.content}`;
        this.afterRender(); 
    }
}

export default Modal;
