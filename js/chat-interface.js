document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const typingIndicator = document.getElementById("typing-indicator");

    const apiHandler = new APIHandler(window.currentLanguage);

    function addMessage(content, isUser = false, isError = false) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'} ${isError ? 'error-message' : ''}`;

        // Convert Markdown to HTML using marked.js
        const markdownContent = marked.parse(content);

        messageDiv.innerHTML = `
            <div class="message-content">
                ${markdownContent}
                ${isError ? '<div class="error-details">Check browser console (F12) for details</div>' : ''}
            </div>
        `;
        chatBox.insertBefore(messageDiv, typingIndicator);


        // Manually scroll to show a bit of the previous message
        const previousMessageHeight = messageDiv.previousElementSibling
        ? messageDiv.previousElementSibling.offsetHeight
        : 0;
        const padding = 250; // Adjust the padding to show part of the previous message
        chatBox.scrollTop = messageDiv.offsetTop - previousMessageHeight - padding;
    }

    function showTypingIndicator() {
        typingIndicator.style.display = 'block';
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }

    async function sendMessage() {
        const userMessage = userInput.value.trim();
        if (!userMessage) return;

        // console.log('=== Starting new message ===');
        // console.log('User message:', userMessage);

        addMessage(userMessage, true);
        userInput.value = "";
        showTypingIndicator();

        try {
            const response = await apiHandler.sendMessage(userMessage);
            hideTypingIndicator();
            addMessage(response);
        } catch (error) {
            console.error('=== Error details ===');
            console.error(error);
            hideTypingIndicator();
            addMessage(`Error: ${error.message}`, false, true);
        }
    }

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

    // Add styles for error messages
    const style = document.createElement('style');
    style.textContent = `
        .error-message .message-content {
            background: #ffebee !important;
            color: #c62828 !important;
            border: 1px solid #ef9a9a;
        }
        .error-details {
            font-size: 0.8em;
            margin-top: 5px;
            opacity: 0.7;
        }
    `;
    document.head.appendChild(style);

    // console.log('Chat interface initialized');
});

function initChatInterface(apiHandler) {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const typingIndicator = document.getElementById("typing-indicator");

    function addMessage(content, isUser = false, isError = false) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'} ${isError ? 'error-message' : ''}`;

        // Convert Markdown to HTML using marked.js
        const markdownContent = marked.parse(content);

        messageDiv.innerHTML = `
            <div class="message-content">
                ${markdownContent}
                ${isError ? '<div class="error-details">Check browser console (F12) for details</div>' : ''}
            </div>
        `;
        chatBox.insertBefore(messageDiv, typingIndicator);


        // Manually scroll to show a bit of the previous message
        const previousMessageHeight = messageDiv.previousElementSibling
        ? messageDiv.previousElementSibling.offsetHeight
        : 0;
        const padding = 250; // Adjust the padding to show part of the previous message
        chatBox.scrollTop = messageDiv.offsetTop - previousMessageHeight - padding;
    }

    function showTypingIndicator() {
        typingIndicator.style.display = 'block';
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }

    async function sendMessage() {
        const userMessage = userInput.value.trim();
        if (!userMessage) return;

        // console.log('=== Starting new message ===');
        // console.log('User message:', userMessage);

        addMessage(userMessage, true);
        userInput.value = "";
        showTypingIndicator();

        try {
            const response = await apiHandler.sendMessage(userMessage);
            hideTypingIndicator();
            addMessage(response);
        } catch (error) {
            console.error('=== Error details ===');
            console.error(error);
            hideTypingIndicator();
            addMessage(`Error: ${error.message}`, false, true);
        }
    }

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

    // Add styles for error messages
    const style = document.createElement('style');
    style.textContent = `
        .error-message .message-content {
            background: #ffebee !important;
            color: #c62828 !important;
            border: 1px solid #ef9a9a;
        }
        .error-details {
            font-size: 0.8em;
            margin-top: 5px;
            opacity: 0.7;
        }
    `;
    document.head.appendChild(style);

    // console.log('Chat interface initialized');
}

// Exporter la fonction initChatInterface pour qu'elle soit accessible globalement
window.initChatInterface = initChatInterface;
