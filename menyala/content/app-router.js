import { LitElement, html, css } from '/lit-core.min.js';
import './login-form.js';
import './secret-message.js';
class AppRouter extends LitElement {
    static properties = {
        route: { type: String }
    };

    constructor() {
        super();
        this.route = localStorage.getItem('isLoggedIn') === 'true' ? 'secret' : 'login';
    }

    render() {
        return html`
            ${this.route === 'login' 
                ? html`<login-form @login-success="${this.handleLoginSuccess}"></login-form>` 
                : html`<secret-message @logout="${this.handleLogout}"></secret-message>`}
        `;
    }

    handleLoginSuccess() {
        this.route = 'secret';
    }

    handleLogout() {
        this.route = 'login';
    }
}
customElements.define('app-router', AppRouter);