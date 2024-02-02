import Component from '../component/component.js';

class CardComponent extends Component {
    constructor(data, clickCallback) {
        super();
        this.data = data;
        this.clickCallback = clickCallback; 
    }

    render() {
        return this.data.map(post => `
        <div class="w3-cell-row">
            <div class="w3-cell" data-id="${post.id}" style="cursor: pointer;">
                <h5 class="card-title">${post.title}</h5>
                <img src="${post.image}" alt="${post.title}" class="card-img-top">
                <div class="card-body">
                    <p class="card-text">${this.truncateContent(post.content)}</p>
                </div>
            </div>
        </div><hr>
        `).join('');
    }

    truncateContent(content) {
        return content.length > 100 ? content.substring(0, 100) + '...' : content;
    }

    afterRender() {
        this.data.forEach(post => {
            const card = document.querySelector(`.w3-cell[data-id="${post.id}"]`);
            if (card) { 
                card.addEventListener('click', () => this.clickCallback(post));
            } else {
                console.error(`Card with id ${post.id} not found`);
            }
        });
    }
}
export default CardComponent;
