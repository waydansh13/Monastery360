// Smart Chatbot for Monastery Queries
class MonasteryChatbot {
    constructor() {
        this.monasteries = window.monasteriesData || [];
        this.isOpen = false;
        this.conversationHistory = [];
        this.currentLanguage = 'english';
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadInitialGreeting();
    }
    
    setupEventListeners() {
        // Chatbot toggle
        const chatbotToggle = document.getElementById('chatbotToggle');
        if (chatbotToggle) {
            chatbotToggle.addEventListener('click', () => {
                this.toggleChatbot();
            });
        }
        
        // Chat input
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
        
        // Send button
        const sendButton = document.querySelector('.chatbot-input button');
        if (sendButton) {
            sendButton.addEventListener('click', () => {
                this.sendMessage();
            });
        }
        
        // Close button
        const closeButton = document.querySelector('.chatbot-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.toggleChatbot();
            });
        }
    }
    
    toggleChatbot() {
        const chatbot = document.getElementById('chatbot');
        const toggle = document.getElementById('chatbotToggle');
        
        if (chatbot && toggle) {
            this.isOpen = !this.isOpen;
            
            if (this.isOpen) {
                chatbot.classList.add('open');
                toggle.style.display = 'none';
                // Focus on input
                setTimeout(() => {
                    const input = document.getElementById('chatInput');
                    if (input) input.focus();
                }, 300);
            } else {
                chatbot.classList.remove('open');
                toggle.style.display = 'block';
            }
        }
    }
    
    loadInitialGreeting() {
        const greetings = {
            english: [
                "Namaste! I'm your monastery guide. Ask me about any monastery, sect, festival, or location in Sikkim.",
                "Welcome! I can help you discover Sikkim's monasteries. What would you like to know?",
                "Hello! I'm here to help you explore the sacred monasteries of Sikkim. How can I assist you?"
            ],
            hindi: [
                "नमस्ते! मैं आपका मठ गाइड हूं। सिक्किम के किसी भी मठ, संप्रदाय, त्योहार या स्थान के बारे में पूछें।",
                "स्वागत है! मैं आपको सिक्किम के मठों की खोज में मदद कर सकता हूं। आप क्या जानना चाहते हैं?",
                "नमस्कार! मैं यहां सिक्किम के पवित्र मठों का अन्वेषण करने में आपकी मदद के लिए हूं।"
            ],
            nepali: [
                "नमस्ते! म सिक्किमको मठ गाइड हुँ। सिक्किमको कुनै पनि मठ, सम्प्रदाय, चाड वा स्थानको बारेमा सोध्नुहोस्।",
                "स्वागत छ! म तपाईंलाई सिक्किमका मठहरू खोज्न मद्दत गर्न सक्छु। तपाईं के जान्न चाहनुहुन्छ?",
                "नमस्कार! म यहाँ सिक्किमका पवित्र मठहरू अन्वेषण गर्न मद्दत गर्न आएको हुँ।"
            ]
        };
        
        const languageGreetings = greetings[this.currentLanguage] || greetings.english;
        const randomGreeting = languageGreetings[Math.floor(Math.random() * languageGreetings.length)];
        
        this.addBotMessage(randomGreeting);
    }
    
    sendMessage() {
        const input = document.getElementById('chatInput');
        if (!input || !input.value.trim()) return;
        
        const message = input.value.trim();
        input.value = '';
        
        // Add user message
        this.addUserMessage(message);
        
        // Process the message
        this.processMessage(message);
    }
    
    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `<p>${this.escapeHtml(message)}</p>`;
        
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Add to conversation history
        this.conversationHistory.push({
            type: 'user',
            message: message,
            timestamp: new Date()
        });
    }
    
    addBotMessage(message, options = {}) {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        
        if (options.type === 'monastery') {
            messageDiv.innerHTML = this.createMonasteryResponse(message, options);
        } else if (options.type === 'audio') {
            messageDiv.innerHTML = this.createAudioResponse(message, options);
        } else {
            messageDiv.innerHTML = `<p>${this.escapeHtml(message)}</p>`;
        }
        
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Add to conversation history
        this.conversationHistory.push({
            type: 'bot',
            message: message,
            timestamp: new Date(),
            options: options
        });
    }
    
    createMonasteryResponse(monastery, options) {
        return `
            <div class="monastery-response">
                <h4>${monastery.name}</h4>
                <p><strong>Sect:</strong> ${monastery.sect}</p>
                <p><strong>Location:</strong> ${monastery.district}</p>
                <p><strong>Established:</strong> ${monastery.established}</p>
                <p>${monastery.description}</p>
                <div class="response-actions">
                    <button onclick="chatbot.showMonasteryDetail('${monastery.id}')">View Details</button>
                    <button onclick="chatbot.playAudioGuide('${monastery.id}')">🎧 Audio Guide</button>
                </div>
            </div>
        `;
    }
    
    createAudioResponse(message, options) {
        return `
            <div class="audio-response">
                <p>${message}</p>
                <div class="audio-controls">
                    <button onclick="chatbot.playAudio('${options.audioText}')">▶ Play Audio</button>
                </div>
            </div>
        `;
    }
    
    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Simulate processing delay
        setTimeout(() => {
            this.hideTypingIndicator();
            this.generateResponse(lowerMessage);
        }, 1000 + Math.random() * 2000);
    }
    
    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    generateResponse(message) {
        // Check for specific monastery queries
        const monasteryMatch = this.findMonasteryByName(message);
        if (monasteryMatch) {
            this.addBotMessage(monasteryMatch, { type: 'monastery' });
            return;
        }
        
        // Check for sect queries
        const sectMatch = this.findMonasteriesBySect(message);
        if (sectMatch.length > 0) {
            this.handleSectQuery(sectMatch, message);
            return;
        }
        
        // Check for location queries
        const locationMatch = this.findMonasteriesByLocation(message);
        if (locationMatch.length > 0) {
            this.handleLocationQuery(locationMatch, message);
            return;
        }
        
        // Check for festival queries
        const festivalMatch = this.findMonasteriesByFestival(message);
        if (festivalMatch.length > 0) {
            this.handleFestivalQuery(festivalMatch, message);
            return;
        }
        
        // Check for general queries
        const generalResponse = this.handleGeneralQuery(message);
        if (generalResponse) {
            this.addBotMessage(generalResponse);
            return;
        }
        
        // Default response
        this.addBotMessage("I'm not sure I understand. Could you ask about a specific monastery, sect, festival, or location in Sikkim?");
    }
    
    findMonasteryByName(message) {
        const monasteryNames = this.monasteries.map(m => ({
            monastery: m,
            name: m.name.toLowerCase(),
            words: m.name.toLowerCase().split(' ')
        }));
        
        for (const { monastery, name, words } of monasteryNames) {
            if (name.includes(message) || words.some(word => message.includes(word))) {
                return monastery;
            }
        }
        
        return null;
    }
    
    findMonasteriesBySect(message) {
        const sects = ['nyingma', 'kagyu', 'sakya', 'gelug', 'bon'];
        const matchedSects = sects.filter(sect => message.includes(sect));
        
        if (matchedSects.length > 0) {
            return this.monasteries.filter(m => 
                matchedSects.some(sect => m.sect.toLowerCase() === sect)
            );
        }
        
        return [];
    }
    
    findMonasteriesByLocation(message) {
        const locations = ['gangtok', 'pelling', 'yuksom', 'mangan', 'namchi', 'ravangla', 'geyzing'];
        const districts = ['east sikkim', 'west sikkim', 'north sikkim', 'south sikkim'];
        
        const matchedLocations = locations.filter(loc => message.includes(loc));
        const matchedDistricts = districts.filter(dist => message.includes(dist));
        
        if (matchedLocations.length > 0 || matchedDistricts.length > 0) {
            return this.monasteries.filter(m => 
                matchedLocations.some(loc => m.location.toLowerCase().includes(loc)) ||
                matchedDistricts.some(dist => m.district.toLowerCase() === dist)
            );
        }
        
        return [];
    }
    
    findMonasteriesByFestival(message) {
        const festivals = ['losar', 'bumchu', 'cham', 'saga dawa', 'guru rinpoche', 'pang lhabsol'];
        const matchedFestivals = festivals.filter(festival => message.includes(festival));
        
        if (matchedFestivals.length > 0) {
            return this.monasteries.filter(m => 
                m.festivals.some(f => 
                    matchedFestivals.some(mf => f.name.toLowerCase().includes(mf))
                )
            );
        }
        
        return [];
    }
    
    handleSectQuery(monasteries, message) {
        const sect = monasteries[0].sect;
        const count = monasteries.length;
        
        let response = `I found ${count} ${sect} monasteries in Sikkim:\n\n`;
        
        monasteries.slice(0, 5).forEach((monastery, index) => {
            response += `${index + 1}. ${monastery.name} (${monastery.district})\n`;
        });
        
        if (monasteries.length > 5) {
            response += `\n...and ${monasteries.length - 5} more.`;
        }
        
        response += `\n\nWould you like to know more about any specific ${sect} monastery?`;
        
        this.addBotMessage(response);
    }
    
    handleLocationQuery(monasteries, message) {
        const location = monasteries[0].district;
        const count = monasteries.length;
        
        let response = `I found ${count} monasteries in ${location}:\n\n`;
        
        monasteries.slice(0, 5).forEach((monastery, index) => {
            response += `${index + 1}. ${monastery.name} (${monastery.sect})\n`;
        });
        
        if (monasteries.length > 5) {
            response += `\n...and ${monasteries.length - 5} more.`;
        }
        
        response += `\n\nWould you like to know more about any specific monastery in ${location}?`;
        
        this.addBotMessage(response);
    }
    
    handleFestivalQuery(monasteries, message) {
        const count = monasteries.length;
        
        let response = `I found ${count} monasteries that celebrate festivals related to your query:\n\n`;
        
        monasteries.slice(0, 5).forEach((monastery, index) => {
            const relevantFestivals = monastery.festivals.filter(f => 
                message.includes(f.name.toLowerCase())
            );
            response += `${index + 1}. ${monastery.name} - ${relevantFestivals.map(f => f.name).join(', ')}\n`;
        });
        
        if (monasteries.length > 5) {
            response += `\n...and ${monasteries.length - 5} more.`;
        }
        
        this.addBotMessage(response);
    }
    
    handleGeneralQuery(message) {
        const responses = {
            'hello': 'Hello! How can I help you explore Sikkim\'s monasteries today?',
            'hi': 'Hi there! I\'m here to help you discover the sacred monasteries of Sikkim.',
            'help': 'I can help you find information about monasteries, sects, festivals, and locations in Sikkim. Just ask me anything!',
            'how many': 'There are over 100 monasteries in Sikkim, each with its own unique history and spiritual significance.',
            'oldest': 'The oldest monastery in Sikkim is Dubdi Monastery, established in 1701.',
            'famous': 'Some of the most famous monasteries include Rumtek, Pemayangtse, Tashiding, and Enchey.',
            'sects': 'Sikkim has monasteries from five main Buddhist sects: Nyingma, Kagyu, Sakya, Gelug, and Bon.',
            'festivals': 'Monasteries celebrate various festivals like Losar, Bumchu, Cham Dance, and Guru Rinpoche Day.',
            'visit': 'Most monasteries are open to visitors from 6 AM to 6 PM. Some may have entry fees.',
            'audio': 'Yes! Many monasteries have audio guides available in multiple languages including English, Hindi, and Nepali.'
        };
        
        for (const [key, response] of Object.entries(responses)) {
            if (message.includes(key)) {
                return response;
            }
        }
        
        return null;
    }
    
    showMonasteryDetail(monasteryId) {
        const monastery = this.monasteries.find(m => m.id == monasteryId);
        if (monastery && window.app) {
            window.app.showMonasteryDetail(monastery);
        }
    }
    
    playAudioGuide(monasteryId) {
        const monastery = this.monasteries.find(m => m.id == monasteryId);
        if (monastery && window.app) {
            window.app.currentMonastery = monastery;
            window.app.playAudioGuide();
        }
    }
    
    playAudio(audioText) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(audioText);
            utterance.rate = 0.8;
            utterance.pitch = 1;
            utterance.volume = 0.8;
            
            window.speechSynthesis.speak(utterance);
        }
    }
    
    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Method to change language
    changeLanguage(language) {
        this.currentLanguage = language;
        // Clear messages and reload greeting
        const messagesContainer = document.getElementById('chatbotMessages');
        if (messagesContainer) {
            messagesContainer.innerHTML = '';
        }
        this.loadInitialGreeting();
    }
}

// Global functions for HTML onclick handlers
function toggleChatbot() {
    if (window.chatbot) {
        window.chatbot.toggleChatbot();
    }
}

function sendChatMessage() {
    if (window.chatbot) {
        window.chatbot.sendMessage();
    }
}

function handleChatKeypress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new MonasteryChatbot();
});

// Add CSS for chatbot enhancements
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .typing-indicator {
            opacity: 0.7;
        }
        
        .typing-dots {
            display: flex;
            gap: 4px;
        }
        
        .typing-dots span {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #8B4513;
            animation: typing 1.4s infinite ease-in-out;
        }
        
        .typing-dots span:nth-child(1) {
            animation-delay: -0.32s;
        }
        
        .typing-dots span:nth-child(2) {
            animation-delay: -0.16s;
        }
        
        @keyframes typing {
            0%, 80%, 100% {
                transform: scale(0.8);
                opacity: 0.5;
            }
            40% {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        .monastery-response {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 1rem;
            margin: 0.5rem 0;
        }
        
        .monastery-response h4 {
            color: #8B4513;
            margin: 0 0 0.5rem 0;
        }
        
        .monastery-response p {
            margin: 0.25rem 0;
            font-size: 0.9rem;
        }
        
        .response-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 0.75rem;
        }
        
        .response-actions button {
            padding: 0.375rem 0.75rem;
            background: #8B4513;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 0.8rem;
            cursor: pointer;
        }
        
        .response-actions button:hover {
            background: #A0522D;
        }
        
        .audio-response {
            background: #e8f4f8;
            border-radius: 8px;
            padding: 1rem;
            margin: 0.5rem 0;
        }
        
        .audio-controls {
            margin-top: 0.5rem;
        }
        
        .audio-controls button {
            padding: 0.375rem 0.75rem;
            background: #8B4513;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 0.8rem;
            cursor: pointer;
        }
        
        .audio-controls button:hover {
            background: #A0522D;
        }
    `;
    document.head.appendChild(style);
});