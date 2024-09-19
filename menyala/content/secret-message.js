import { LitElement, html, css } from '/lit-all.min.js';

class SecretMessage extends LitElement {
    static styles = css`
        :host {
            display: block;
            font-family: 'Roboto', sans-serif;
        }
        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f5f5f5;
        }
        .card {
            background-color: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .secret-container {
            margin: 1rem 0;
            padding: 1rem;
            background-color: #e0e0e0;
            border-radius: 4px;
            cursor: pointer;
        }
        .secret-message {
            font-size: 1.2rem;
            font-weight: bold;
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        .revealed .secret-message {
            opacity: 1;
        }
        button {
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background-color: #0056b3;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
    `;

    static properties = {
        secretMessage: { type: String },
        isRevealed: { type: Boolean },
        isAuthenticated: { type: Boolean }
    };

    constructor() {
        super();
        this.secretMessage = "You're awesome! 🌟";
        this.isRevealed = false;
        this.isAuthenticated = false;
    }

    connectedCallback() {
        super.connectedCallback();
        this.checkAuthentication();
    }

    checkAuthentication() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        this.isAuthenticated = isLoggedIn === 'true';
    }

    render() {
        if (!this.isAuthenticated) {
            return html`
                <div class="container">
                    <div class="card">
                        <h2>Access Denied</h2>
                        <p>Please log in to view the secret message.</p>
                    </div>
                </div>
            `;
        }

        return html`
            <div class="container">
                <div class="card">
                    <h2>Secret Message</h2>
                    <div class="secret-container ${this.isRevealed ? 'revealed' : ''}" @click="${this.toggleReveal}">
                        <p class="secret-message">${this.secretMessage}</p>
                    </div>
                    <button @click="${this.toggleReveal}">
                        ${this.isRevealed ? 'Hide' : 'Reveal'} Secret
                    </button>
                    <button @click="${this.logout}">Logout</button>
                </div>
            </div>
        `;
    }

    toggleReveal() {
        this.isRevealed = !this.isRevealed;
    }

    logout() {
        localStorage.removeItem('isLoggedIn');
        this.dispatchEvent(new CustomEvent('logout', {
            bubbles: true,
            composed: true
        }));
    }
}
customElements.define('secret-message', SecretMessage);