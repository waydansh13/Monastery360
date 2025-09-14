// Main Application JavaScript
class MonasteryApp {
    constructor() {
        this.monasteries = window.monasteriesData || [];
        this.filteredMonasteries = [...this.monasteries];
        this.currentLanguage = 'english';
        this.currentAudio = null;
        this.isAudioPlaying = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadMonasteries();
        this.setupNavigation();
        this.setupSearch();
        this.setupFilters();
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href').substring(1);
                this.navigateToSection(target);
            });
        });
        
        // Mobile navigation toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
        
        // Modal close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });
        
        // Language selector
        this.setupLanguageSelector();
    }
    
    setupNavigation() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Update active navigation on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveNavigation();
        });
    }
    
    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    navigateToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Close mobile menu if open
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
    
    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchMonasteries(e.target.value);
            });
        }
    }
    
    setupFilters() {
        const sectFilter = document.getElementById('sectFilter');
        const locationFilter = document.getElementById('locationFilter');
        
        if (sectFilter) {
            sectFilter.addEventListener('change', () => {
                this.filterMonasteries();
            });
        }
        
        if (locationFilter) {
            locationFilter.addEventListener('change', () => {
                this.filterMonasteries();
            });
        }
    }
    
    setupLanguageSelector() {
        // Create language selector if it doesn't exist
        if (!document.getElementById('languageSelector')) {
            const languageSelector = document.createElement('div');
            languageSelector.id = 'languageSelector';
            languageSelector.className = 'language-selector';
            languageSelector.innerHTML = `
                <select id="languageSelect" onchange="app.changeLanguage(this.value)">
                    <option value="english">English</option>
                    <option value="hindi">हिन्दी</option>
                    <option value="nepali">नेपाली</option>
                </select>
            `;
            
            const navContainer = document.querySelector('.nav-container');
            if (navContainer) {
                navContainer.appendChild(languageSelector);
            }
        }
    }
    
    changeLanguage(language) {
        this.currentLanguage = language;
        // Update UI text based on language
        this.updateUIText(language);
        
        // Sync with chatbot if it exists
        if (window.chatbot && window.chatbot.syncWithAppLanguage) {
            window.chatbot.syncWithAppLanguage();
        }
    }
    
    updateUIText(language) {
        const translations = {
            english: {
                searchPlaceholder: "Search monasteries by name, sect, or location...",
                allSects: "All Sects",
                allDistricts: "All Districts",
                loadingText: "Loading monasteries...",
                exploreMonasteries: "Explore Monasteries",
                viewMap: "View Map"
            },
            hindi: {
                searchPlaceholder: "नाम, संप्रदाय या स्थान से मठ खोजें...",
                allSects: "सभी संप्रदाय",
                allDistricts: "सभी जिले",
                loadingText: "मठ लोड हो रहे हैं...",
                exploreMonasteries: "मठों का अन्वेषण करें",
                viewMap: "मानचित्र देखें"
            },
            nepali: {
                searchPlaceholder: "नाम, सम्प्रदाय वा स्थानबाट मठ खोज्नुहोस्...",
                allSects: "सबै सम्प्रदाय",
                allDistricts: "सबै जिल्ला",
                loadingText: "मठ लोड भइरहेको छ...",
                exploreMonasteries: "मठहरू अन्वेषण गर्नुहोस्",
                viewMap: "नक्शा हेर्नुहोस्"
            }
        };
        
        const t = translations[language] || translations.english;
        
        // Update search placeholder
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.placeholder = t.searchPlaceholder;
        }
        
        // Update filter options
        const sectFilter = document.getElementById('sectFilter');
        if (sectFilter) {
            sectFilter.options[0].text = t.allSects;
        }
        
        const locationFilter = document.getElementById('locationFilter');
        if (locationFilter) {
            locationFilter.options[0].text = t.allDistricts;
        }
        
        // Update loading text
        const loadingIndicator = document.getElementById('loadingIndicator');
        if (loadingIndicator) {
            loadingIndicator.querySelector('p').textContent = t.loadingText;
        }
    }
    
    loadMonasteries() {
        const grid = document.getElementById('monasteriesGrid');
        const loadingIndicator = document.getElementById('loadingIndicator');
        
        if (!grid) return;
        
        // Show loading indicator
        if (loadingIndicator) {
            loadingIndicator.style.display = 'block';
        }
        
        // Simulate loading delay for better UX
        setTimeout(() => {
            this.renderMonasteries();
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        }, 1000);
    }
    
    renderMonasteries() {
        const grid = document.getElementById('monasteriesGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        this.filteredMonasteries.forEach(monastery => {
            const card = this.createMonasteryCard(monastery);
            grid.appendChild(card);
        });
        
        // Update count
        this.updateMonasteryCount();
    }
    
    createMonasteryCard(monastery) {
        const card = document.createElement('div');
        card.className = 'monastery-card';
        card.onclick = () => this.showMonasteryDetail(monastery);
        
        card.innerHTML = `
            <div class="monastery-image">
                <img src="${monastery.images[0]}" alt="${monastery.name}" loading="lazy">
                <div class="monastery-badge">${monastery.sect}</div>
            </div>
            <div class="monastery-content">
                <h3 class="monastery-name">${monastery.name}</h3>
                <p class="monastery-sect">${monastery.sect} Sect</p>
                <p class="monastery-description">${monastery.description}</p>
                <div class="monastery-meta">
                    <span class="monastery-location">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        ${monastery.district}
                    </span>
                    <span class="monastery-year">Est. ${monastery.established}</span>
                </div>
            </div>
        `;
        
        return card;
    }
    
    updateMonasteryCount() {
        const count = this.filteredMonasteries.length;
        const total = this.monasteries.length;
        
        // Update section header if it exists
        const sectionHeader = document.querySelector('.section-header p');
        if (sectionHeader) {
            sectionHeader.textContent = `Discover the spiritual heritage of the Himalayas (${count} of ${total} monasteries)`;
        }
    }
    
    searchMonasteries(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (!searchTerm) {
            this.filteredMonasteries = [...this.monasteries];
        } else {
            this.filteredMonasteries = this.monasteries.filter(monastery => 
                monastery.name.toLowerCase().includes(searchTerm) ||
                monastery.sect.toLowerCase().includes(searchTerm) ||
                monastery.district.toLowerCase().includes(searchTerm) ||
                monastery.location.toLowerCase().includes(searchTerm) ||
                monastery.description.toLowerCase().includes(searchTerm)
            );
        }
        
        this.renderMonasteries();
    }
    
    filterMonasteries() {
        const sectFilter = document.getElementById('sectFilter');
        const locationFilter = document.getElementById('locationFilter');
        const searchInput = document.getElementById('searchInput');
        
        let filtered = [...this.monasteries];
        
        // Apply sect filter
        if (sectFilter && sectFilter.value) {
            filtered = filtered.filter(monastery => monastery.sect === sectFilter.value);
        }
        
        // Apply location filter
        if (locationFilter && locationFilter.value) {
            filtered = filtered.filter(monastery => monastery.district === locationFilter.value);
        }
        
        // Apply search filter
        if (searchInput && searchInput.value.trim()) {
            const searchTerm = searchInput.value.toLowerCase().trim();
            filtered = filtered.filter(monastery => 
                monastery.name.toLowerCase().includes(searchTerm) ||
                monastery.sect.toLowerCase().includes(searchTerm) ||
                monastery.district.toLowerCase().includes(searchTerm) ||
                monastery.location.toLowerCase().includes(searchTerm) ||
                monastery.description.toLowerCase().includes(searchTerm)
            );
        }
        
        this.filteredMonasteries = filtered;
        this.renderMonasteries();
    }
    
    showMonasteryDetail(monastery) {
        const modal = document.getElementById('monasteryModal');
        if (!modal) return;
        
        // Update modal content
        document.getElementById('modalTitle').textContent = monastery.name;
        document.getElementById('modalDescription').textContent = monastery.description;
        document.getElementById('modalHistory').textContent = monastery.history;
        document.getElementById('modalPrayerHall').textContent = 
            `Capacity: ${monastery.prayerHall.capacity} people. Features: ${monastery.prayerHall.features.join(', ')}. Dimensions: ${monastery.prayerHall.dimensions}.`;
        document.getElementById('modalLocation').textContent = 
            `${monastery.location} (${monastery.coordinates.latitude}, ${monastery.coordinates.longitude})`;
        
        // Update festivals list
        const festivalsList = document.getElementById('modalFestivals');
        festivalsList.innerHTML = '';
        monastery.festivals.forEach(festival => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${festival.name}</strong> (${festival.date}): ${festival.description}`;
            festivalsList.appendChild(li);
        });
        
        // Update images
        document.getElementById('modalMainImage').src = monastery.images[0];
        document.getElementById('modalMainImage').alt = monastery.name;
        
        const imageGallery = document.getElementById('imageGallery');
        imageGallery.innerHTML = '';
        monastery.images.slice(1).forEach(image => {
            const img = document.createElement('img');
            img.src = image;
            img.alt = monastery.name;
            img.onclick = () => {
                document.getElementById('modalMainImage').src = image;
            };
            imageGallery.appendChild(img);
        });
        
        // Store current monastery for other functions
        this.currentMonastery = monastery;
        
        // Show modal
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        const modal = document.getElementById('monasteryModal');
        if (modal) {
            modal.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
    }
    
    showOnMap() {
        if (this.currentMonastery) {
            // Close modal first
            this.closeModal();
            
            // Navigate to map section
            this.navigateToSection('map');
            
            // Center map on monastery (this will be handled by map.js)
            if (window.monasteryMap) {
                window.monasteryMap.centerOnMonastery(this.currentMonastery);
            }
        }
    }
    
    open3DView() {
        if (!this.currentMonastery) return;
        const { latitude, longitude } = this.currentMonastery.coordinates || {};
        const container = document.getElementById('streetViewContainer');
        if (!container) return;
        // Ensure the container is visible
        container.style.display = 'block';
        // Load Google Maps API and open Street View at the monastery coordinates
        if (window.VirtualTours && typeof window.VirtualTours.openStreetView === 'function') {
            window.VirtualTours.openStreetView(latitude, longitude, 0, 0, 1);
        } else if (window.VirtualTours && typeof window.VirtualTours.loadGoogleMapsIfNeeded === 'function') {
            window.VirtualTours.loadGoogleMapsIfNeeded();
            // Defer opening until API load completes
            setTimeout(() => {
                if (window.VirtualTours.openStreetView) {
                    window.VirtualTours.openStreetView(latitude, longitude, 0, 0, 1);
                }
            }, 1500);
        }
    }
    
    playAudioGuide() {
        if (this.currentMonastery && this.currentMonastery.audioGuide) {
            const audioText = this.currentMonastery.audioGuide[this.currentLanguage] || 
                            this.currentMonastery.audioGuide.english;
            
            // Use Web Speech API for text-to-speech
            if ('speechSynthesis' in window) {
                // Stop any current speech
                window.speechSynthesis.cancel();
                
                const utterance = new SpeechSynthesisUtterance(audioText);
                utterance.rate = 0.8;
                utterance.pitch = 1;
                utterance.volume = 0.8;
                
                // Update audio player UI
                this.updateAudioPlayer(this.currentMonastery.name, audioText);
                
                utterance.onstart = () => {
                    this.isAudioPlaying = true;
                    this.updateAudioPlayerControls();
                };
                
                utterance.onend = () => {
                    this.isAudioPlaying = false;
                    this.updateAudioPlayerControls();
                };
                
                window.speechSynthesis.speak(utterance);
                this.currentAudio = utterance;
            }
        }
    }
    
    updateAudioPlayer(title, description) {
        const audioPlayer = document.getElementById('audioPlayer');
        const audioTitle = document.getElementById('audioTitle');
        const audioDescription = document.getElementById('audioDescription');
        
        if (audioPlayer && audioTitle && audioDescription) {
            audioTitle.textContent = title;
            audioDescription.textContent = description;
            audioPlayer.classList.add('active');
        }
    }
    
    updateAudioPlayerControls() {
        const playPauseBtn = document.getElementById('playPauseBtn');
        if (playPauseBtn) {
            playPauseBtn.textContent = this.isAudioPlaying ? '⏸' : '▶';
        }
    }
    
    toggleAudio() {
        if (this.isAudioPlaying) {
            window.speechSynthesis.pause();
            this.isAudioPlaying = false;
        } else {
            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
                this.isAudioPlaying = true;
            } else if (this.currentMonastery) {
                this.playAudioGuide();
            }
        }
        this.updateAudioPlayerControls();
    }
    
    toggleMute() {
        // Toggle volume for speech synthesis
        const volumeBtn = document.getElementById('volumeBtn');
        if (volumeBtn) {
            const isMuted = volumeBtn.textContent === '🔇';
            volumeBtn.textContent = isMuted ? '🔊' : '🔇';
            
            // Adjust volume
            if (this.currentAudio) {
                this.currentAudio.volume = isMuted ? 0.8 : 0;
            }
        }
    }
}

// Global functions for HTML onclick handlers
function showMonasteries() {
    app.navigateToSection('monasteries');
}

function showMap() {
    app.navigateToSection('map');
}

function searchMonasteries() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        app.searchMonasteries(searchInput.value);
    }
}

function filterMonasteries() {
    app.filterMonasteries();
}

function closeModal() {
    app.closeModal();
}

function showOnMap() {
    app.showOnMap();
}

function playAudioGuide() {
    app.playAudioGuide();
}

function open3DView() {
    app.open3DView();
}

function toggleAudio() {
    app.toggleAudio();
}

function toggleMute() {
    app.toggleMute();
}

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

// Handle page visibility change to pause/resume audio
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.app && window.app.isAudioPlaying) {
        window.speechSynthesis.pause();
    } else if (!document.hidden && window.app && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
    }
});