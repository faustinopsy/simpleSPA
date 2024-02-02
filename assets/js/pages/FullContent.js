import Component from '../component/Component.js';

class FullContent extends Component {
    constructor(post) {
        super();
        this.post = post;
    }

    render() {
        return `
            <div class="full-content">
                <h2>${this.post.title}</h2>
                <img src="${this.post.image}" alt="${this.post.title}" class="full-content-img">
                <p>${this.post.content}</p>
            </div>
        `;
    }
}
export default FullContent;
