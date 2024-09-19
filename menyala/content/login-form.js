import {LitElement, html, css} from '/lit-core.min.js';

// Login Form Component
class LoginForm extends LitElement {
    static styles = css`
    :host {
        display: block;
        font-family: 'Roboto', sans-serif;
        --primary-color: #6200ea;
        --primary-color-hover: #3700b3;
        --background-color: #f5f5f5;
        --card-background: #ffffff;
        --input-border-color: #bdbdbd;
        --input-border-focus-color: #6200ea;
        --text-color: #000000;
    }
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: var(--background-color);
    }
    .login-form {
        background-color: var(--card-background);
        padding: 24px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    input {
        padding: 16px;
        border: 1px solid var(--input-border-color);
        border-radius: 4px;
        font-size: 16px;
        color: var(--text-color);
        transition: border-color 0.3s ease;
    }
    input:focus {
        border-color: var(--input-border-focus-color);
        outline: none;
    }
    button {
        padding: 12px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;
    }
    button:hover {
        background-color: var(--primary-color-hover);
    }
    .error-message {
        color: red;
        font-size: 14px;
        margin-top: 8px;
    }
`;

    static properties = {
        username: { type: String },
        password: { type: String },
        errorMessage: { type: String },
    };

    constructor() {
        super();
        this.username = '';
        this.password = '';
        this.errorMessage = '';
    }

    render() {
        return html`
            <div class="container">
                <div class="login-form">
                    <form @submit=${this._handleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            .value=${this.username}
                            @input=${(e) => this.username = e.target.value}
                            required
                        >
                        <input
                            type="password"
                            placeholder="Password"
                            .value=${this.password}
                            @input=${(e) => this.password = e.target.value}
                            required
                        >
                        <button type="submit">Login</button>
                        ${this.errorMessage ? html`<p class="error-message">${this.errorMessage}</p>` : ''}
                    </form>
                </div>
            </div>
        `;
    }

    async _handleSubmit(e) {
        e.preventDefault();
        this.errorMessage = '';

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.username,
                    password: this.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('isLoggedIn', 'true');
                this.dispatchEvent(new CustomEvent('login-success', {
                    bubbles: true,
                    composed: true
                }));
            } else {
                this.errorMessage = data.message || 'Login failed. Please try again.';
            }
        } catch (error) {
            console.error('Login error:', error);
            this.errorMessage = 'An error occurred. Please try again later.';
        }
    }
}
customElements.define('login-form', LoginForm);