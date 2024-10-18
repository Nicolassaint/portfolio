class APIHandler {
    constructor(language = 'en') {
        this.promptManager = new PromptManager(language);
        this.language = language;
        this.environment = this.defineEnvironment();
        this.apiUrl = this.defineApiUrl();
    }

    defineEnvironment() {
        if (window.location.hostname === 'localhost') {
            return 'dev';
        } else {
            return 'prod';
        }
    }

    defineApiUrl() {
        if (this.environment === 'dev') {
            return 'http://localhost:8888';
        } else {
            return 'https://backend-portfolio-ns.netlify.app';
        }
    }

    async sendMessage(userMessage) {
        const conversationHistory = this.promptManager.getConversationHistory();

        try {
            const response = await fetch(this.apiUrl + '/.netlify/functions/sendMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userMessage: userMessage,
                    language: this.language,
                    conversationHistory: conversationHistory
                })
            });

            if (!response.ok) {
                throw new Error(`Erreur d'appel API : ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const assistantResponse = data.assistantResponse;

            // Stockage de la conversation dans Supabase
            await this.storeConversation(userMessage, assistantResponse);

            // Ajout de l'historique des messages côté frontend
            this.promptManager.addToHistory('user', userMessage);
            this.promptManager.addToHistory('assistant', assistantResponse);

            return assistantResponse;
        } catch (error) {
            console.error('Erreur lors de l\'appel à Netlify:', error);
            throw error;
        }
    }

    async storeConversation(userMessage, assistantResponse) {
        try {
            const response = await fetch(this.apiUrl + '/.netlify/functions/saveMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userMessage: userMessage,
                    assistantResponse: assistantResponse,
                    language: this.language,
                    environment: this.environment
                })
            });

            if (!response.ok) {
                console.error('Erreur de stockage:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de l\'appel à Netlify:', error);
        }
    }
}
