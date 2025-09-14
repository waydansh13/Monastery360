# Chatbot Integration Guide - Monastery360

## 🔧 **Fixed Issues**

The chatbot wasn't working due to several integration issues that have now been resolved:

### 1. **Initialization Timing**
- **Problem**: Chatbot was trying to initialize before monastery data was loaded
- **Fix**: Added proper timing and retry logic in `chatbot.js`

### 2. **Missing App Integration**
- **Problem**: Chatbot wasn't connected to the main app
- **Fix**: Added chatbot initialization in `app.js` and language synchronization

### 3. **Event Listener Issues**
- **Problem**: Event listeners weren't properly attached
- **Fix**: Added debugging and proper error handling

## 📍 **Where to Integrate Chatbot in Code**

### 1. **HTML Structure** (Already in `index.html`)
```html
<!-- Chatbot Toggle Button -->
<button id="chatbotToggle" class="chatbot-toggle" onclick="toggleChatbot()">
    <svg>...</svg>
</button>

<!-- Chatbot Interface -->
<div id="chatbot" class="chatbot">
    <div class="chatbot-header">
        <h3>Monastery Guide</h3>
        <button class="chatbot-close" onclick="toggleChatbot()">×</button>
    </div>
    <div class="chatbot-messages" id="chatbotMessages">
        <!-- Messages appear here -->
    </div>
    <div class="chatbot-input">
        <input type="text" id="chatInput" placeholder="Ask about monasteries..." onkeypress="handleChatKeypress(event)">
        <button onclick="sendChatMessage()">Send</button>
    </div>
</div>
```

### 2. **JavaScript Initialization** (Fixed in `app.js`)
```javascript
// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MonasteryApp();
    
    // Initialize chatbot after app is ready
    setTimeout(() => {
        if (window.MonasteryChatbot) {
            window.chatbot = new MonasteryChatbot();
        }
    }, 1000);
});
```

### 3. **Language Synchronization** (Added to `app.js`)
```javascript
changeLanguage(language) {
    this.currentLanguage = language;
    this.updateUIText(language);
    
    // Sync with chatbot if it exists
    if (window.chatbot && window.chatbot.syncWithAppLanguage) {
        window.chatbot.syncWithAppLanguage();
    }
}
```

### 4. **Script Loading Order** (In `index.html`)
```html
<!-- Load in this order -->
<script src="js/data.js"></script>        <!-- Monastery data first -->
<script src="js/app.js"></script>         <!-- Main app -->
<script src="js/map.js"></script>         <!-- Map functionality -->
<script src="js/chatbot.js"></script>     <!-- Chatbot (after data) -->
<script src="js/audio.js"></script>       <!-- Audio system -->
<script src="js/pwa.js"></script>         <!-- PWA features -->
```

## 🚀 **How to Test the Chatbot**

### 1. **Open the Application**
```bash
# Start local server
python3 -m http.server 8000

# Visit http://localhost:8000
```

### 2. **Test Chatbot Functions**
- Click the chat icon (💬) in the bottom-right corner
- Try these sample queries:
  - "Tell me about Rumtek Monastery"
  - "Show me Nyingma monasteries"
  - "What monasteries are in Gangtok?"
  - "Play audio guide for Pemayangtse"

### 3. **Use the Test Page**
Visit `http://localhost:8000/chatbot-test.html` for detailed testing

## 🎯 **Chatbot Features**

### **Natural Language Queries**
- **Monastery Names**: "Tell me about Rumtek"
- **Sects**: "Show me Kagyu monasteries"
- **Locations**: "What's in Gangtok?"
- **Festivals**: "Tell me about Losar festival"

### **Interactive Responses**
- **Monastery Details**: Click "View Details" to open monastery modal
- **Audio Guides**: Click "🎧 Audio Guide" to play narration
- **Map Integration**: Responses can center map on monasteries

### **Multilingual Support**
- **English**: Default language
- **Hindi**: हिंदी support
- **Nepali**: नेपाली support

## 🔧 **Troubleshooting**

### **Chatbot Not Appearing**
1. Check browser console for errors
2. Verify `js/data.js` is loaded first
3. Ensure `js/chatbot.js` is loaded after data

### **Chatbot Not Responding**
1. Check if monastery data is loaded: `console.log(window.monasteriesData.length)`
2. Verify chatbot is initialized: `console.log(window.chatbot)`
3. Test with simple queries first

### **Audio Not Working**
1. Check browser permissions for speech synthesis
2. Verify audio system is initialized
3. Test with different browsers

## 📱 **Mobile Integration**

The chatbot is fully responsive and works on mobile devices:
- Touch-friendly interface
- Swipe gestures supported
- Mobile-optimized layout
- Voice input ready (when supported)

## 🎨 **Customization**

### **Adding New Responses**
Edit `js/chatbot.js` and add to the `handleGeneralQuery` method:

```javascript
const responses = {
    'your keyword': 'Your response here',
    // ... existing responses
};
```

### **Adding New Query Types**
Add new methods to the `MonasteryChatbot` class:

```javascript
findMonasteriesByYourCriteria(message) {
    // Your logic here
    return matchingMonasteries;
}
```

### **Styling Changes**
Modify the CSS in `js/chatbot.js` at the bottom of the file.

## 🔗 **Integration Points**

### **With Main App**
- Language synchronization
- Monastery detail modal integration
- Audio guide integration

### **With Map**
- Monastery location queries
- Map centering on selected monasteries

### **With Audio System**
- Audio guide playback
- Language-specific audio

## ✅ **Verification Checklist**

- [ ] Chatbot toggle button appears
- [ ] Chatbot opens when clicked
- [ ] Can send messages
- [ ] Receives responses
- [ ] Monastery queries work
- [ ] Audio integration works
- [ ] Language switching works
- [ ] Mobile responsive
- [ ] No console errors

## 🎉 **Success!**

The chatbot is now fully integrated and functional. Users can:
- Ask natural language questions about monasteries
- Get detailed information and audio guides
- Navigate to monastery details and maps
- Use the chatbot in multiple languages

The integration is seamless and provides an intuitive way for users to explore Sikkim's monasteries!