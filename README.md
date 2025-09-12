# Monastery360 - Sacred Sikkim

A comprehensive Progressive Web App (PWA) showcasing over 100 monasteries of Sikkim with interactive maps, 360° image placeholders, multilingual audio guides, and an intelligent chatbot.

## 🌟 Features

### Core Functionality
- **100+ Monasteries**: Comprehensive dataset with detailed information about each monastery
- **Interactive Map**: Leaflet-based map with monastery markers and clustering
- **360° Image Placeholders**: Ready for 360° panoramic images
- **Multilingual Support**: English, Hindi, and Nepali audio guides
- **Smart Chatbot**: AI-powered assistant for monastery queries
- **3D Virtual Tours**: Google Street View integration where available
- **Responsive Design**: Mobile-first, PWA-ready interface

### Technical Features
- **Progressive Web App**: Installable, offline-capable, and app-like experience
- **Service Worker**: Caching and offline functionality
- **Audio System**: Text-to-speech with multiple languages
- **Search & Filter**: Advanced filtering by sect, location, and text search
- **Real-time Updates**: Dynamic content loading and updates

## 🏗️ Project Structure

```
monastery360/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
├── styles/
│   ├── main.css           # Main stylesheet
│   └── responsive.css     # Responsive design
├── js/
│   ├── app.js             # Main application logic
│   ├── data.js            # Monastery dataset
│   ├── map.js             # Interactive map functionality
│   ├── chatbot.js         # Smart chatbot system
│   ├── audio.js           # Audio guide system
│   └── pwa.js             # PWA functionality
├── icons/                 # PWA icons (various sizes)
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- Local web server (for development)

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd monastery360
   ```

2. **Start a local server**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### PWA Installation
- **Desktop**: Click the install button in the address bar or use the install button in the app
- **Mobile**: Use "Add to Home Screen" option in your browser

## 📱 Usage

### Exploring Monasteries
1. **Browse List**: View all monasteries in a responsive grid
2. **Search**: Use the search bar to find specific monasteries
3. **Filter**: Filter by Buddhist sect or district
4. **View Details**: Click any monastery for detailed information

### Interactive Map
1. **Navigate**: Use the map to explore monastery locations
2. **Clustering**: Toggle clustering for better performance
3. **Monastery List**: Access sidebar list for quick navigation
4. **Details**: Click markers for quick monastery information

### Audio Guides
1. **Language Selection**: Choose from English, Hindi, or Nepali
2. **Play Audio**: Click the audio guide button on any monastery
3. **Controls**: Use play/pause, volume, and speed controls
4. **Offline**: Audio guides work offline once cached

### Smart Chatbot
1. **Ask Questions**: Query about monasteries, sects, festivals, or locations
2. **Natural Language**: Use conversational language
3. **Audio Integration**: Request audio guides through chat
4. **Contextual Help**: Get relevant information based on your queries

## 🎨 Customization

### Adding New Monasteries
Edit `js/data.js` to add new monastery entries:

```javascript
{
    id: 101,
    name: "New Monastery",
    sect: "Nyingma",
    district: "East Sikkim",
    location: "Location, District",
    coordinates: {
        latitude: 27.3333,
        longitude: 88.6167
    },
    established: "2024",
    description: "Description of the monastery...",
    history: "Historical background...",
    prayerHall: {
        capacity: 100,
        features: ["Feature 1", "Feature 2"],
        dimensions: "30m x 20m"
    },
    festivals: [
        {
            name: "Festival Name",
            date: "Month",
            description: "Festival description"
        }
    ],
    images: [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg"
    ],
    audioGuide: {
        english: "English audio guide text...",
        hindi: "हिंदी ऑडियो गाइड टेक्स्ट...",
        nepali: "नेपाली ऑडियो गाइड टेक्स्ट..."
    },
    specialFeatures: ["Feature 1", "Feature 2"],
    visitingHours: "6:00 AM - 6:00 PM",
    entryFee: "Free"
}
```

### Styling Customization
- **Colors**: Modify CSS variables in `styles/main.css`
- **Typography**: Update font imports and styles
- **Layout**: Adjust grid layouts and responsive breakpoints

### Language Support
Add new languages by:
1. Adding language options to the language selector
2. Including translations in monastery audio guides
3. Updating UI text translations in `js/app.js`

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup and PWA features
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript ES6+**: Modern JavaScript features
- **Leaflet**: Interactive mapping library
- **Web Speech API**: Text-to-speech functionality
- **Service Worker**: Offline functionality and caching

### Browser Support
- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support (iOS 11.3+)
- **Edge**: Full support

### Performance Features
- **Lazy Loading**: Images load as needed
- **Caching**: Aggressive caching for offline use
- **Compression**: Optimized assets and code
- **Responsive Images**: Appropriate image sizes for different devices

## 📊 Data Structure

### Monastery Object
```javascript
{
    id: Number,                    // Unique identifier
    name: String,                  // Monastery name
    sect: String,                  // Buddhist sect (Nyingma, Kagyu, etc.)
    district: String,              // Sikkim district
    location: String,              // Specific location
    coordinates: {                 // GPS coordinates
        latitude: Number,
        longitude: Number
    },
    established: String,           // Year established
    description: String,           // Brief description
    history: String,               // Historical background
    prayerHall: {                  // Prayer hall details
        capacity: Number,
        features: Array,
        dimensions: String
    },
    festivals: Array,              // Festival information
    images: Array,                 // Image URLs
    audioGuide: {                  // Multilingual audio guides
        english: String,
        hindi: String,
        nepali: String
    },
    specialFeatures: Array,        // Unique features
    visitingHours: String,         // Opening hours
    entryFee: String              // Entry fee information
}
```

## 🚀 Deployment

### Static Hosting
Deploy to any static hosting service:
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your repository
- **GitHub Pages**: Enable in repository settings
- **Firebase Hosting**: Use Firebase CLI

### Server Requirements
- **HTTPS**: Required for PWA features
- **MIME Types**: Ensure proper MIME types for all files
- **Caching**: Configure appropriate cache headers

## 🧭 Google 3D Virtual Tours

Monastery360 supports 3D virtual tours using Google Street View where panoramas are available near the monastery coordinates.

### Setup API Key

1. Create a Google Cloud project and enable the Maps JavaScript API and Street View Static API.
2. Create an API key and restrict it to your domains.
3. Provide the key to the app via either method:

   - Add a small inline script in `index.html` before `js/virtual.js`:
     ```html
     <script>window.MONASTERY360_GOOGLE_MAPS_API_KEY = 'YOUR_REAL_API_KEY';</script>
     ```
   - Or set it at runtime via any script that runs before `virtual.js` loads.

### Usage

- Open any monastery detail and click the "🧭 3D View" button.
- If a Street View panorama is available within ~250m, it will appear in the embedded viewer.
- If not available, the UI hides gracefully with a notification.

### Notes

- Street View coverage in remote Himalayan regions can be limited.
- Use your own API key in production to avoid quota issues.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test on multiple devices and browsers
- Ensure accessibility compliance

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Sikkim Tourism**: For inspiration and cultural context
- **Buddhist Communities**: For spiritual guidance and information
- **Open Source Libraries**: Leaflet, Web APIs, and other tools
- **Contributors**: All those who help improve this project

## 📞 Support

For questions, issues, or contributions:
- **Issues**: Use the GitHub issues tracker
- **Documentation**: Check this README and code comments
- **Community**: Join discussions in the repository

---

**Monastery360** - Preserving and sharing the spiritual heritage of Sikkim's monasteries through modern technology.

*May this digital journey bring you closer to the sacred wisdom of the Himalayas.* 🙏