import Component from '../component/Component.js';

class Navbar extends Component {
    constructor() {
        super();
        this.navOpen = false;
    }

    openNav() {
        console.log(this.navOpen)
        this.navOpen = !this.navOpen; 
        if(this.navOpen){
            document.getElementById("myNav").style.height = "100%";
            document.getElementById("hamburg").innerText = "X";
        } else {
            document.getElementById("myNav").style.height = "0%";
            document.getElementById("hamburg").innerText = "☰";
        }
    }
    render() {
        return `
            <div id="myNav" class="overlay">
                <div class="overlay-content">
                    <a href="/">Home</a>
                    <a href="/about">Sobre</a>
                    <a href="/contact">Contato</a>
                </div>
            </div>
            <div class="w3-bottom w3-black" style="z-index:99;">
                <button class="w3-bar w3-xlarge w3-black w3-display-bottommiddle" id="hamburg" style="cursor: pointer;">☰</button>
            </div>
            <div class="w3-container w3-black" hidden>
                <div class="w3-bar w3-black ">
                    <a href="/" class="w3-bar-item w3-button"><i class="fa fa-home"></i> Home</a>
                    <a href="/about" class="w3-bar-item w3-button"><i class="fa fa-search"></i> Sobre</a>
                    <a href="/contact" class="w3-bar-item w3-button"><i class="fa fa-envelope"></i> Contato</a>
                </div>
            </div>
        `;
    }

    afterRender() {
        const hamburgButton = document.getElementById("hamburg");
        hamburgButton.addEventListener('click', () => this.openNav());
    }
}

export default Navbar;
