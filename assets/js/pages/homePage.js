import Component from '../component/component.js';
import FetchData from '../lib/FetchData.js';
import CardComponent from '../card/CardComponent.js';
import FullContent from './FullContent.js';
import Modal from '../modal/Modal.js';
class HomePage extends Component {
    constructor() {
        super();
        this.title = 'Home - Meu SPA';
        this.description = 'Bem-vindo à página inicial do nosso Single Page Application.';
        this.keywords = 'home,spa,single page application,principal';
        //this.postsUrl = 'assets/js/json/posts.json';
        this.postsUrl = 'back/fetch_posts.php';
    }

    async render() {
        const fetchData = new FetchData(this.postsUrl);
        const posts = await fetchData.getJson();
        this.posts = posts;

        this.modal = new Modal('');

        this.handleCardClick = (post) => {
            const fullContentComponent = new FullContent(post);
            this.modal.updateContent(fullContentComponent.render()); 
            this.modal.open(); 
        };

        this.cardComponent = new CardComponent(posts, this.handleCardClick);

        return `
            <div>
                ${this.modal.render()}
                <div class="w3-center">
                    ${this.cardComponent.render()}
                </div>
            </div>
        `;
    }

    async afterRender() {
        this.modal.afterRender();
        this.cardComponent.afterRender();
    }
    
}

export default HomePage;
