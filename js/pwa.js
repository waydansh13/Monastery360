// Progressive Web App (PWA) functionality
class PWA {
    constructor() {
        this.isInstalled = false;
        this.deferredPrompt = null;
        this.swRegistration = null;
        
        this.init();
    }
    
    init() {
        this.registerServiceWorker();
        this.setupInstallPrompt();
        this.setupUpdateNotification();
        this.setupOfflineDetection();
        this.setupBackgroundSync();
    }
    
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                this.swRegistration = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registered successfully:', this.swRegistration);
                
                // Listen for updates
                this.swRegistration.addEventListener('updatefound', () => {
                    this.handleServiceWorkerUpdate();
                });
                
            } catch (error) {
                console.error('Service Worker registration failed:', error);
            }
        }
    }
    
    setupInstallPrompt() {
        // Listen for the beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('PWA install prompt triggered');
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallButton();
        });
        
        // Listen for the appinstalled event
        window.addEventListener('appinstalled', () => {
            console.log('PWA was installed');
            this.isInstalled = true;
            this.hideInstallButton();
            this.showInstallSuccessMessage();
        });
        
        // Check if app is already installed
        this.checkIfInstalled();
    }
    
    checkIfInstalled() {
        // Check if running as PWA
        if (window.matchMedia('(display-mode: standalone)').matches || 
            window.navigator.standalone === true) {
            this.isInstalled = true;
            console.log('App is running as PWA');
        }
    }
    
    showInstallButton() {
        // Create install button if it doesn't exist
        if (!document.getElementById('installButton')) {
            const installButton = document.createElement('button');
            installButton.id = 'installButton';
            installButton.className = 'install-button';
            installButton.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7,10 12,15 17,10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Install App
            `;
            installButton.onclick = () => this.installApp();
            
            // Add to navigation
            const navContainer = document.querySelector('.nav-container');
            if (navContainer) {
                navContainer.appendChild(installButton);
            }
        }
    }
    
    hideInstallButton() {
        const installButton = document.getElementById('installButton');
        if (installButton) {
            installButton.remove();
        }
    }
    
    async installApp() {
        if (!this.deferredPrompt) {
            console.log('Install prompt not available');
            return;
        }
        
        try {
            // Show the install prompt
            this.deferredPrompt.prompt();
            
            // Wait for the user to respond to the prompt
            const { outcome } = await this.deferredPrompt.userChoice;
            
            console.log(`User response to install prompt: ${outcome}`);
            
            // Clear the deferred prompt
            this.deferredPrompt = null;
            
            if (outcome === 'accepted') {
                this.showInstallSuccessMessage();
            }
            
        } catch (error) {
            console.error('Error during app installation:', error);
        }
    }
    
    showInstallSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'install-success-message';
        message.innerHTML = `
            <div class="message-content">
                <h3>🎉 Monastery360 Installed!</h3>
                <p>You can now access Monastery360 from your home screen and enjoy an app-like experience.</p>
                <button onclick="this.parentElement.parentElement.remove()">Got it!</button>
            </div>
        `;
        
        document.body.appendChild(message);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 5000);
    }
    
    setupUpdateNotification() {
        if (this.swRegistration) {
            this.swRegistration.addEventListener('updatefound', () => {
                const newWorker = this.swRegistration.installing;
                
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        this.showUpdateNotification();
                    }
                });
            });
        }
    }
    
    showUpdateNotification() {
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <h4>🔄 Update Available</h4>
                <p>A new version of Monastery360 is available. Refresh to get the latest features!</p>
                <div class="notification-actions">
                    <button onclick="pwa.updateApp()" class="btn btn-primary">Update Now</button>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" class="btn btn-secondary">Later</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
    }
    
    updateApp() {
        if (this.swRegistration && this.swRegistration.waiting) {
            // Tell the waiting service worker to skip waiting
            this.swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
            
            // Reload the page
            window.location.reload();
        }
    }
    
    setupOfflineDetection() {
        // Listen for online/offline events
        window.addEventListener('online', () => {
            this.showOnlineStatus('You are back online!');
            this.hideOfflineIndicator();
        });
        
        window.addEventListener('offline', () => {
            this.showOfflineStatus('You are offline. Some features may be limited.');
            this.showOfflineIndicator();
        });
        
        // Check initial status
        if (!navigator.onLine) {
            this.showOfflineIndicator();
        }
    }
    
    showOfflineIndicator() {
        if (!document.getElementById('offlineIndicator')) {
            const indicator = document.createElement('div');
            indicator.id = 'offlineIndicator';
            indicator.className = 'offline-indicator';
            indicator.innerHTML = `
                <div class="indicator-content">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    Offline
                </div>
            `;
            
            document.body.appendChild(indicator);
        }
    }
    
    hideOfflineIndicator() {
        const indicator = document.getElementById('offlineIndicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    showOnlineStatus(message) {
        this.showStatusMessage(message, 'success');
    }
    
    showOfflineStatus(message) {
        this.showStatusMessage(message, 'warning');
    }
    
    showStatusMessage(message, type) {
        const statusMessage = document.createElement('div');
        statusMessage.className = `status-message ${type}`;
        statusMessage.textContent = message;
        
        document.body.appendChild(statusMessage);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (statusMessage.parentNode) {
                statusMessage.remove();
            }
        }, 3000);
    }
    
    setupBackgroundSync() {
        if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
            // Register for background sync
            navigator.serviceWorker.ready.then(registration => {
                return registration.sync.register('monastery-data-sync');
            }).catch(error => {
                console.log('Background sync registration failed:', error);
            });
        }
    }
    
    handleServiceWorkerUpdate() {
        const newWorker = this.swRegistration.installing;
        
        newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                    // New content is available, show update notification
                    this.showUpdateNotification();
                } else {
                    // Content is cached for the first time
                    console.log('Content is cached for offline use');
                }
            }
        });
    }
    
    // Method to share content
    async shareContent(data) {
        if (navigator.share) {
            try {
                await navigator.share(data);
                console.log('Content shared successfully');
            } catch (error) {
                console.log('Error sharing content:', error);
                this.fallbackShare(data);
            }
        } else {
            this.fallbackShare(data);
        }
    }
    
    fallbackShare(data) {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = `${window.location.origin}${data.url || ''}`;
        const shareText = `${data.title || 'Monastery360'}\n\n${data.text || ''}\n\n${shareUrl}`;
        
        // Copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText).then(() => {
                this.showStatusMessage('Link copied to clipboard!', 'success');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = shareText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showStatusMessage('Link copied to clipboard!', 'success');
        }
    }
    
    // Method to add to home screen (iOS)
    showAddToHomeScreen() {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
        
        if (isIOS && !isInStandaloneMode) {
            const message = document.createElement('div');
            message.className = 'ios-install-message';
            message.innerHTML = `
                <div class="message-content">
                    <h4>📱 Add to Home Screen</h4>
                    <p>Tap the share button and select "Add to Home Screen" to install Monastery360.</p>
                    <button onclick="this.parentElement.parentElement.remove()">Got it!</button>
                </div>
            `;
            
            document.body.appendChild(message);
            
            // Auto-remove after 10 seconds
            setTimeout(() => {
                if (message.parentNode) {
                    message.remove();
                }
            }, 10000);
        }
    }
    
    // Method to get app info
    getAppInfo() {
        return {
            name: 'Monastery360',
            version: '1.0.0',
            installed: this.isInstalled,
            online: navigator.onLine,
            serviceWorker: !!this.swRegistration,
            features: {
                installable: !!this.deferredPrompt,
                shareable: !!navigator.share,
                offline: !!this.swRegistration
            }
        };
    }
}

// Initialize PWA when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pwa = new PWA();
    
    // Show iOS install message if applicable
    setTimeout(() => {
        window.pwa.showAddToHomeScreen();
    }, 3000);
});

// Add CSS for PWA elements
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .install-button {
            background: linear-gradient(135deg, #8B4513, #D2691E);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
            margin-left: 1rem;
        }
        
        .install-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3);
        }
        
        .install-success-message {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 400px;
            width: 90%;
        }
        
        .message-content {
            padding: 2rem;
            text-align: center;
        }
        
        .message-content h3 {
            color: #8B4513;
            margin-bottom: 1rem;
        }
        
        .message-content button {
            background: #8B4513;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            margin-top: 1rem;
        }
        
        .update-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 350px;
            border-left: 4px solid #8B4513;
        }
        
        .notification-content {
            padding: 1.5rem;
        }
        
        .notification-content h4 {
            color: #8B4513;
            margin-bottom: 0.5rem;
        }
        
        .notification-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
        }
        
        .notification-actions .btn {
            flex: 1;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
        }
        
        .offline-indicator {
            position: fixed;
            top: 20px;
            left: 20px;
            background: #ff4444;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            z-index: 10000;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .status-message {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 1rem 2rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideDown 0.3s ease;
        }
        
        .status-message.success {
            background: #4CAF50;
        }
        
        .status-message.warning {
            background: #FF9800;
        }
        
        .ios-install-message {
            position: fixed;
            bottom: 20px;
            left: 20px;
            right: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 10000;
            border: 2px solid #8B4513;
        }
        
        @keyframes slideDown {
            from {
                transform: translateX(-50%) translateY(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 768px) {
            .install-button {
                margin-left: 0.5rem;
                padding: 0.4rem 0.8rem;
                font-size: 0.8rem;
            }
            
            .update-notification {
                left: 20px;
                right: 20px;
                max-width: none;
            }
            
            .ios-install-message {
                bottom: 10px;
                left: 10px;
                right: 10px;
            }
        }
    `;
    document.head.appendChild(style);
});