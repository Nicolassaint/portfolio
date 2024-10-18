class PromptManager {
    constructor() {
        this.conversationHistory = [];
    }

    getConversationHistory() {
        return this.conversationHistory;
    }

    addToHistory(role, content) {
        this.conversationHistory.push({ role, content });
        // Gardez seulement les 10 derniers messages pour éviter les limites de tokens
        if (this.conversationHistory.length > 10) {
            this.conversationHistory.shift();
        }
    }
}
