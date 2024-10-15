class APIHandler {
    constructor(language = 'en') {
        this.endpoint = 'https://api.olympia.bhub.cloud/generate';
        this.promptManager = new PromptManager(language);
        this.supabase = this.initSupabase();
        this.environment = this.determineEnvironment();
        this.language = language;
    }

    initSupabase() {
        if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
            console.error('Les configurations Supabase ne sont pas définies');
            return null;
        }
        
        return supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }

    determineEnvironment() {
        return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'development'
            : 'production';
    }

    setLanguage(language) {
        this.language = language;
        this.promptManager.setLanguage(language);
    }

    async sendMessage(userMessage) {
        const prompt = this.promptManager.buildPrompt(userMessage);
        // console.log('Prompt:', prompt);

        try {
            const requestBody = {
                model: 'llama3.1',
                prompt: prompt,
                stream: false,
                temperature: 0
            };

            // console.log('Request body:', requestBody);

            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            // console.log('Response status:', response.status);

            if (response.status === 405) {
                throw new Error(`Method Not Allowed: The server does not allow POST requests at this endpoint.`);
            }

            const responseText = await response.text();

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}\nResponse: ${responseText}`);
            }

            const data = JSON.parse(responseText);

            const assistantResponse = data.text;

            // Stockage de la conversation dans Supabase
            await this.storeConversationInSupabase(userMessage, assistantResponse);

            this.promptManager.addToHistory('user', userMessage);
            this.promptManager.addToHistory('assistant', assistantResponse);

            return assistantResponse;
        } catch (error) {
            console.error('Erreur détaillée:', {
                message: error.message,
                stack: error.stack
            });
            throw error;
        }
    }

    async storeConversationInSupabase(userMessage, assistantResponse) {
        const tableName = this.environment === 'development' ? 'conversations_dev' : 'conversations_prod';
        
        try {
            const { data, error } = await this.supabase
                .from(tableName)
                .insert([
                    {
                        user: userMessage,
                        assistant: assistantResponse,
                        language: this.language,
                    }
                ]);

            if (error) throw error;
            // console.log(`Conversation stored in Supabase (${this.environment}):`, data);
        } catch (error) {
            // console.error(`Error storing conversation in Supabase (${this.environment}):`, error);
        }
    }

}
