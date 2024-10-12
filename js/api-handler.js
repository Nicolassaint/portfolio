class APIHandler {
    constructor() {
        // Use relative URL to go through proxy
        this.endpoint = 'https://api.olympia.bhub.cloud/generate';
        this.promptManager = new PromptManager();
    }

    async sendMessage(userMessage) {
        const prompt = this.promptManager.buildPrompt(userMessage);
        // console.log('Sending request with prompt:', prompt);

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
            // console.log('Raw response:', responseText);

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}\nResponse: ${responseText}`);
            }

            const data = JSON.parse(responseText);
            // console.log('Parsed response data:', data);

            const assistantResponse = data.text;

            this.promptManager.addToHistory('user', userMessage);
            this.promptManager.addToHistory('assistant', assistantResponse);

            return assistantResponse;
        } catch (error) {
            console.error('Detailed error:', {
                message: error.message,
                stack: error.stack
            });
            throw error;
        }
    }

}