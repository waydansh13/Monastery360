// Audio Guide System
class AudioGuide {
    constructor() {
        this.currentAudio = null;
        this.isPlaying = false;
        this.currentLanguage = 'english';
        this.audioQueue = [];
        this.isProcessingQueue = false;
        
        this.init();
    }
    
    init() {
        this.setupAudioPlayer();
        this.setupEventListeners();
        this.loadAudioSettings();
    }
    
    setupAudioPlayer() {
        // Create audio player if it doesn't exist
        if (!document.getElementById('audioPlayer')) {
            const audioPlayer = document.createElement('div');
            audioPlayer.id = 'audioPlayer';
            audioPlayer.className = 'audio-player';
            audioPlayer.innerHTML = `
                <div class="audio-info">
                    <h4 id="audioTitle">Audio Guide</h4>
                    <p id="audioDescription">Select a monastery to hear its story</p>
                </div>
                <div class="audio-controls">
                    <button id="playPauseBtn" onclick="audioGuide.togglePlayPause()">▶</button>
                    <div class="audio-progress">
                        <div class="progress-bar">
                            <div id="progressFill" class="progress-fill"></div>
                        </div>
                        <span id="currentTime">0:00</span>
                        <span id="duration">0:00</span>
                    </div>
                    <button id="volumeBtn" onclick="audioGuide.toggleMute()">🔊</button>
                    <button id="speedBtn" onclick="audioGuide.toggleSpeed()">1x</button>
                </div>
            `;
            
            document.body.appendChild(audioPlayer);
        }
    }
    
    setupEventListeners() {
        // Progress bar click
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.addEventListener('click', (e) => {
                this.seekTo(e);
            });
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            switch (e.code) {
                case 'Space':
                    e.preventDefault();
                    this.togglePlayPause();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.seek(-10);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.seek(10);
                    break;
                case 'KeyM':
                    e.preventDefault();
                    this.toggleMute();
                    break;
            }
        });
        
        // Page visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.isPlaying) {
                this.pause();
            }
        });
    }
    
    loadAudioSettings() {
        // Load saved settings from localStorage
        const savedLanguage = localStorage.getItem('audioLanguage') || 'english';
        const savedVolume = localStorage.getItem('audioVolume') || '0.8';
        const savedSpeed = localStorage.getItem('audioSpeed') || '1';
        
        this.currentLanguage = savedLanguage;
        this.volume = parseFloat(savedVolume);
        this.speed = parseFloat(savedSpeed);
        
        this.updateSpeedDisplay();
    }
    
    saveAudioSettings() {
        localStorage.setItem('audioLanguage', this.currentLanguage);
        localStorage.setItem('audioVolume', this.volume.toString());
        localStorage.setItem('audioSpeed', this.speed.toString());
    }
    
    playMonasteryAudio(monastery, language = null) {
        if (language) {
            this.currentLanguage = language;
        }
        
        const audioText = monastery.audioGuide[this.currentLanguage] || 
                         monastery.audioGuide.english;
        
        if (!audioText) {
            this.showError('Audio guide not available for this monastery.');
            return;
        }
        
        // Stop current audio
        this.stop();
        
        // Update player info
        this.updatePlayerInfo(monastery.name, audioText);
        
        // Show player
        this.showPlayer();
        
        // Play audio
        this.playTextToSpeech(audioText);
    }
    
    playTextToSpeech(text) {
        if (!('speechSynthesis' in window)) {
            this.showError('Text-to-speech is not supported in your browser.');
            return;
        }
        
        // Stop any current speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = this.speed;
        utterance.pitch = 1;
        utterance.volume = this.volume;
        utterance.lang = this.getLanguageCode(this.currentLanguage);
        
        // Set up event listeners
        utterance.onstart = () => {
            this.isPlaying = true;
            this.updatePlayPauseButton();
            this.startProgressTracking();
        };
        
        utterance.onend = () => {
            this.isPlaying = false;
            this.updatePlayPauseButton();
            this.stopProgressTracking();
        };
        
        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            this.showError('Error playing audio guide.');
        };
        
        utterance.onpause = () => {
            this.isPlaying = false;
            this.updatePlayPauseButton();
        };
        
        utterance.onresume = () => {
            this.isPlaying = true;
            this.updatePlayPauseButton();
        };
        
        this.currentAudio = utterance;
        window.speechSynthesis.speak(utterance);
    }
    
    getLanguageCode(language) {
        const languageCodes = {
            'english': 'en-US',
            'hindi': 'hi-IN',
            'nepali': 'ne-NP'
        };
        return languageCodes[language] || 'en-US';
    }
    
    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.resume();
        }
    }
    
    pause() {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
        }
    }
    
    resume() {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        } else if (this.currentAudio) {
            this.playTextToSpeech(this.currentAudio.text);
        }
    }
    
    stop() {
        window.speechSynthesis.cancel();
        this.isPlaying = false;
        this.updatePlayPauseButton();
        this.stopProgressTracking();
    }
    
    seek(seconds) {
        // Note: SpeechSynthesis API doesn't support seeking
        // This is a placeholder for future enhancement with audio files
        console.log(`Seek ${seconds} seconds`);
    }
    
    seekTo(event) {
        const progressBar = event.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const percentage = clickX / rect.width;
        
        // Note: SpeechSynthesis API doesn't support seeking
        // This is a placeholder for future enhancement with audio files
        console.log(`Seek to ${percentage * 100}%`);
    }
    
    toggleMute() {
        this.volume = this.volume > 0 ? 0 : 0.8;
        this.updateVolumeButton();
        this.saveAudioSettings();
        
        if (this.currentAudio) {
            this.currentAudio.volume = this.volume;
        }
    }
    
    toggleSpeed() {
        const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
        const currentIndex = speeds.indexOf(this.speed);
        const nextIndex = (currentIndex + 1) % speeds.length;
        
        this.speed = speeds[nextIndex];
        this.updateSpeedDisplay();
        this.saveAudioSettings();
        
        if (this.currentAudio) {
            this.currentAudio.rate = this.speed;
        }
    }
    
    updateSpeedDisplay() {
        const speedBtn = document.getElementById('speedBtn');
        if (speedBtn) {
            speedBtn.textContent = `${this.speed}x`;
        }
    }
    
    updateVolumeButton() {
        const volumeBtn = document.getElementById('volumeBtn');
        if (volumeBtn) {
            volumeBtn.textContent = this.volume > 0 ? '🔊' : '🔇';
        }
    }
    
    updatePlayPauseButton() {
        const playPauseBtn = document.getElementById('playPauseBtn');
        if (playPauseBtn) {
            playPauseBtn.textContent = this.isPlaying ? '⏸' : '▶';
        }
    }
    
    updatePlayerInfo(title, description) {
        const audioTitle = document.getElementById('audioTitle');
        const audioDescription = document.getElementById('audioDescription');
        
        if (audioTitle) {
            audioTitle.textContent = title;
        }
        
        if (audioDescription) {
            audioDescription.textContent = description.substring(0, 100) + '...';
        }
    }
    
    showPlayer() {
        const audioPlayer = document.getElementById('audioPlayer');
        if (audioPlayer) {
            audioPlayer.classList.add('active');
        }
    }
    
    hidePlayer() {
        const audioPlayer = document.getElementById('audioPlayer');
        if (audioPlayer) {
            audioPlayer.classList.remove('active');
        }
    }
    
    startProgressTracking() {
        this.progressInterval = setInterval(() => {
            this.updateProgress();
        }, 100);
    }
    
    stopProgressTracking() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }
    
    updateProgress() {
        // Note: SpeechSynthesis API doesn't provide progress information
        // This is a placeholder for future enhancement with audio files
        const progressFill = document.getElementById('progressFill');
        const currentTime = document.getElementById('currentTime');
        const duration = document.getElementById('duration');
        
        if (progressFill) {
            // Simulate progress for demonstration
            const progress = this.isPlaying ? Math.min(100, (Date.now() - this.startTime) / 10000 * 100) : 0;
            progressFill.style.width = `${progress}%`;
        }
        
        if (currentTime) {
            currentTime.textContent = this.formatTime(this.getCurrentTime());
        }
        
        if (duration) {
            duration.textContent = this.formatTime(this.getDuration());
        }
    }
    
    getCurrentTime() {
        // Placeholder - SpeechSynthesis API doesn't provide this
        return 0;
    }
    
    getDuration() {
        // Placeholder - SpeechSynthesis API doesn't provide this
        return 0;
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    showError(message) {
        // Create error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'audio-error';
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 3000);
    }
    
    // Method to change language
    changeLanguage(language) {
        this.currentLanguage = language;
        this.saveAudioSettings();
        
        // If currently playing, restart with new language
        if (this.isPlaying && this.currentAudio) {
            this.stop();
            // Restart with new language if we have the monastery context
            if (window.app && window.app.currentMonastery) {
                this.playMonasteryAudio(window.app.currentMonastery, language);
            }
        }
    }
    
    // Method to play audio for multiple monasteries (tour)
    playTour(monasteries, language = null) {
        if (language) {
            this.currentLanguage = language;
        }
        
        this.audioQueue = [...monasteries];
        this.isProcessingQueue = true;
        this.processQueue();
    }
    
    processQueue() {
        if (this.audioQueue.length === 0) {
            this.isProcessingQueue = false;
            return;
        }
        
        const monastery = this.audioQueue.shift();
        this.playMonasteryAudio(monastery);
        
        // Wait for current audio to finish, then play next
        const checkInterval = setInterval(() => {
            if (!this.isPlaying) {
                clearInterval(checkInterval);
                setTimeout(() => {
                    this.processQueue();
                }, 1000); // 1 second pause between monasteries
            }
        }, 1000);
    }
    
    // Method to create audio playlist
    createPlaylist(monasteries, name = 'Monastery Tour') {
        const playlist = {
            name: name,
            monasteries: monasteries,
            created: new Date().toISOString()
        };
        
        // Save to localStorage
        const playlists = JSON.parse(localStorage.getItem('audioPlaylists') || '[]');
        playlists.push(playlist);
        localStorage.setItem('audioPlaylists', JSON.stringify(playlists));
        
        return playlist;
    }
    
    // Method to get saved playlists
    getPlaylists() {
        return JSON.parse(localStorage.getItem('audioPlaylists') || '[]');
    }
    
    // Method to play saved playlist
    playPlaylist(playlistId) {
        const playlists = this.getPlaylists();
        const playlist = playlists.find(p => p.id === playlistId);
        
        if (playlist) {
            this.playTour(playlist.monasteries);
        }
    }
}

// Global functions for HTML onclick handlers
function toggleAudio() {
    if (window.audioGuide) {
        window.audioGuide.togglePlayPause();
    }
}

function toggleMute() {
    if (window.audioGuide) {
        window.audioGuide.toggleMute();
    }
}

function playAudioGuide() {
    if (window.app && window.app.currentMonastery && window.audioGuide) {
        window.audioGuide.playMonasteryAudio(window.app.currentMonastery);
    }
}

// Initialize audio guide when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.audioGuide = new AudioGuide();
});

// Add CSS for audio player enhancements
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .audio-error {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        
        .audio-controls button {
            transition: all 0.2s ease;
        }
        
        .audio-controls button:hover {
            transform: scale(1.05);
        }
        
        .progress-bar {
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .progress-bar:hover {
            transform: scaleY(1.5);
        }
        
        .progress-fill {
            transition: width 0.1s ease;
        }
        
        #speedBtn {
            min-width: 40px;
        }
        
        .audio-player.active {
            animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
            from {
                transform: translateY(100%);
            }
            to {
                transform: translateY(0);
            }
        }
        
        /* Responsive audio player */
        @media (max-width: 768px) {
            .audio-controls {
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .audio-progress {
                order: 3;
                width: 100%;
                margin-top: 0.5rem;
            }
            
            .audio-info h4 {
                font-size: 1rem;
            }
            
            .audio-info p {
                font-size: 0.8rem;
            }
        }
    `;
    document.head.appendChild(style);
});