// Interactive Map Functionality
class MonasteryMap {
    constructor() {
        this.map = null;
        this.markers = [];
        this.monasteries = window.monasteriesData || [];
        this.currentMonastery = null;
        
        this.init();
    }
    
    init() {
        this.createMap();
        this.addMonasteryMarkers();
        this.setupMapEvents();
    }
    
    createMap() {
        // Initialize Leaflet map centered on Sikkim
        this.map = L.map('monasteryMap').setView([27.3333, 88.6167], 9);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(this.map);
        
        // Add custom map controls
        this.addMapControls();
    }
    
    addMapControls() {
        // Add custom control for monastery list
        const monasteryListControl = L.control({position: 'topright'});
        
        monasteryListControl.onAdd = function(map) {
            const div = L.DomUtil.create('div', 'monastery-list-control');
            div.innerHTML = `
                <button class="map-control-btn" onclick="monasteryMap.showMonasteryList()">
                    📋 List
                </button>
            `;
            return div;
        };
        
        monasteryListControl.addTo(this.map);
        
        // Add custom control for clustering
        const clusterControl = L.control({position: 'topright'});
        
        clusterControl.onAdd = function(map) {
            const div = L.DomUtil.create('div', 'cluster-control');
            div.innerHTML = `
                <button class="map-control-btn" onclick="monasteryMap.toggleClustering()">
                    🔗 Cluster
                </button>
            `;
            return div;
        };
        
        clusterControl.addTo(this.map);
    }
    
    addMonasteryMarkers() {
        // Clear existing markers
        this.markers.forEach(marker => {
            this.map.removeLayer(marker);
        });
        this.markers = [];
        
        // Create marker cluster group
        this.markerClusterGroup = L.markerClusterGroup({
            chunkedLoading: true,
            maxClusterRadius: 50,
            iconCreateFunction: function(cluster) {
                const count = cluster.getChildCount();
                let size = 'small';
                if (count > 10) size = 'large';
                else if (count > 5) size = 'medium';
                
                return L.divIcon({
                    html: `<div class="cluster-marker ${size}">${count}</div>`,
                    className: 'custom-cluster-icon',
                    iconSize: L.point(40, 40)
                });
            }
        });
        
        // Add markers for each monastery
        this.monasteries.forEach(monastery => {
            const marker = this.createMonasteryMarker(monastery);
            this.markers.push(marker);
            this.markerClusterGroup.addLayer(marker);
        });
        
        // Add cluster group to map
        this.map.addLayer(this.markerClusterGroup);
    }
    
    createMonasteryMarker(monastery) {
        // Create custom icon based on sect
        const sectColors = {
            'Nyingma': '#8B4513',
            'Kagyu': '#D2691E',
            'Sakya': '#CD853F',
            'Gelug': '#A0522D',
            'Bon': '#D2B48C'
        };
        
        const color = sectColors[monastery.sect] || '#8B4513';
        
        const customIcon = L.divIcon({
            html: `
                <div class="monastery-marker" style="background-color: ${color}">
                    <div class="marker-icon">🏛️</div>
                    <div class="marker-sect">${monastery.sect.charAt(0)}</div>
                </div>
            `,
            className: 'custom-monastery-icon',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        
        const marker = L.marker([monastery.coordinates.latitude, monastery.coordinates.longitude], {
            icon: customIcon
        });
        
        // Create popup content
        const popupContent = this.createPopupContent(monastery);
        marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'monastery-popup'
        });
        
        // Add click event
        marker.on('click', () => {
            this.onMonasteryClick(monastery);
        });
        
        return marker;
    }
    
    createPopupContent(monastery) {
        return `
            <div class="monastery-popup-content">
                <div class="popup-header">
                    <h3>${monastery.name}</h3>
                    <span class="popup-sect">${monastery.sect}</span>
                </div>
                <div class="popup-body">
                    <p class="popup-description">${monastery.description.substring(0, 100)}...</p>
                    <div class="popup-meta">
                        <span class="popup-location">📍 ${monastery.district}</span>
                        <span class="popup-year">📅 Est. ${monastery.established}</span>
                    </div>
                    <div class="popup-actions">
                        <button class="popup-btn" onclick="monasteryMap.showMonasteryDetail('${monastery.id}')">
                            View Details
                        </button>
                        <button class="popup-btn" onclick="monasteryMap.playAudioGuide('${monastery.id}')">
                            🎧 Audio
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    onMonasteryClick(monastery) {
        this.currentMonastery = monastery;
        
        // Update map view to focus on monastery
        this.map.setView([monastery.coordinates.latitude, monastery.coordinates.longitude], 15);
        
        // Show monastery detail in sidebar or modal
        this.showMonasteryDetail(monastery.id);
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
    
    centerOnMonastery(monastery) {
        if (monastery && this.map) {
            this.map.setView([monastery.coordinates.latitude, monastery.coordinates.longitude], 15);
            
            // Find and open the marker popup
            const marker = this.markers.find(m => 
                m.getLatLng().lat === monastery.coordinates.latitude && 
                m.getLatLng().lng === monastery.coordinates.longitude
            );
            
            if (marker) {
                marker.openPopup();
            }
        }
    }
    
    showMonasteryList() {
        // Create a sidebar with monastery list
        if (!document.getElementById('monasteryListSidebar')) {
            this.createMonasteryListSidebar();
        } else {
            this.toggleMonasteryListSidebar();
        }
    }
    
    createMonasteryListSidebar() {
        const sidebar = document.createElement('div');
        sidebar.id = 'monasteryListSidebar';
        sidebar.className = 'monastery-list-sidebar';
        
        sidebar.innerHTML = `
            <div class="sidebar-header">
                <h3>Monasteries (${this.monasteries.length})</h3>
                <button class="sidebar-close" onclick="monasteryMap.toggleMonasteryListSidebar()">×</button>
            </div>
            <div class="sidebar-content">
                <div class="sidebar-search">
                    <input type="text" id="sidebarSearch" placeholder="Search monasteries..." 
                           onkeyup="monasteryMap.filterSidebarList(this.value)">
                </div>
                <div class="sidebar-list" id="sidebarMonasteryList">
                    ${this.createSidebarMonasteryList()}
                </div>
            </div>
        `;
        
        document.body.appendChild(sidebar);
        
        // Add CSS for sidebar
        this.addSidebarStyles();
    }
    
    createSidebarMonasteryList() {
        return this.monasteries.map(monastery => `
            <div class="sidebar-monastery-item" onclick="monasteryMap.centerOnMonastery(${JSON.stringify(monastery).replace(/"/g, '&quot;')})">
                <div class="sidebar-monastery-info">
                    <h4>${monastery.name}</h4>
                    <p>${monastery.sect} • ${monastery.district}</p>
                </div>
                <div class="sidebar-monastery-actions">
                    <button onclick="event.stopPropagation(); monasteryMap.showMonasteryDetail('${monastery.id}')">
                        View
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    filterSidebarList(query) {
        const list = document.getElementById('sidebarMonasteryList');
        if (!list) return;
        
        const items = list.querySelectorAll('.sidebar-monastery-item');
        const searchTerm = query.toLowerCase();
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    toggleMonasteryListSidebar() {
        const sidebar = document.getElementById('monasteryListSidebar');
        if (sidebar) {
            sidebar.classList.toggle('active');
        }
    }
    
    toggleClustering() {
        if (this.markerClusterGroup) {
            if (this.map.hasLayer(this.markerClusterGroup)) {
                this.map.removeLayer(this.markerClusterGroup);
                // Add individual markers
                this.markers.forEach(marker => {
                    this.map.addLayer(marker);
                });
            } else {
                // Remove individual markers
                this.markers.forEach(marker => {
                    this.map.removeLayer(marker);
                });
                // Add cluster group
                this.map.addLayer(this.markerClusterGroup);
            }
        }
    }
    
    addSidebarStyles() {
        if (!document.getElementById('sidebarStyles')) {
            const style = document.createElement('style');
            style.id = 'sidebarStyles';
            style.textContent = `
                .monastery-list-sidebar {
                    position: fixed;
                    top: 0;
                    right: -400px;
                    width: 400px;
                    height: 100vh;
                    background: white;
                    box-shadow: -2px 0 10px rgba(0,0,0,0.1);
                    z-index: 1000;
                    transition: right 0.3s ease;
                    overflow-y: auto;
                }
                
                .monastery-list-sidebar.active {
                    right: 0;
                }
                
                .sidebar-header {
                    padding: 1rem;
                    border-bottom: 1px solid #eee;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: #8B4513;
                    color: white;
                }
                
                .sidebar-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                }
                
                .sidebar-content {
                    padding: 1rem;
                }
                
                .sidebar-search input {
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    margin-bottom: 1rem;
                }
                
                .sidebar-monastery-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.75rem;
                    border: 1px solid #eee;
                    border-radius: 4px;
                    margin-bottom: 0.5rem;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                }
                
                .sidebar-monastery-item:hover {
                    background-color: #f5f5f5;
                }
                
                .sidebar-monastery-info h4 {
                    margin: 0 0 0.25rem 0;
                    font-size: 0.9rem;
                }
                
                .sidebar-monastery-info p {
                    margin: 0;
                    font-size: 0.8rem;
                    color: #666;
                }
                
                .sidebar-monastery-actions button {
                    padding: 0.25rem 0.5rem;
                    background: #8B4513;
                    color: white;
                    border: none;
                    border-radius: 3px;
                    font-size: 0.8rem;
                    cursor: pointer;
                }
                
                .map-control-btn {
                    background: white;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    padding: 0.5rem;
                    margin: 0.25rem;
                    cursor: pointer;
                    font-size: 0.8rem;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                
                .map-control-btn:hover {
                    background: #f5f5f5;
                }
                
                .monastery-marker {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 12px;
                    position: relative;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                }
                
                .marker-icon {
                    font-size: 14px;
                }
                
                .marker-sect {
                    position: absolute;
                    bottom: -2px;
                    right: -2px;
                    background: white;
                    color: #333;
                    border-radius: 50%;
                    width: 12px;
                    height: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 8px;
                    font-weight: bold;
                }
                
                .cluster-marker {
                    background: #8B4513;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                }
                
                .cluster-marker.small {
                    width: 30px;
                    height: 30px;
                    font-size: 12px;
                }
                
                .cluster-marker.medium {
                    width: 40px;
                    height: 40px;
                    font-size: 14px;
                }
                
                .cluster-marker.large {
                    width: 50px;
                    height: 50px;
                    font-size: 16px;
                }
                
                .monastery-popup-content {
                    max-width: 300px;
                }
                
                .popup-header {
                    margin-bottom: 0.5rem;
                }
                
                .popup-header h3 {
                    margin: 0 0 0.25rem 0;
                    font-size: 1rem;
                    color: #333;
                }
                
                .popup-sect {
                    background: #8B4513;
                    color: white;
                    padding: 0.125rem 0.5rem;
                    border-radius: 12px;
                    font-size: 0.7rem;
                }
                
                .popup-description {
                    margin: 0.5rem 0;
                    font-size: 0.85rem;
                    color: #666;
                }
                
                .popup-meta {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                    margin: 0.5rem 0;
                    font-size: 0.8rem;
                    color: #888;
                }
                
                .popup-actions {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 0.5rem;
                }
                
                .popup-btn {
                    flex: 1;
                    padding: 0.375rem 0.75rem;
                    background: #8B4513;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    cursor: pointer;
                }
                
                .popup-btn:hover {
                    background: #A0522D;
                }
                
                @media (max-width: 768px) {
                    .monastery-list-sidebar {
                        width: 100vw;
                        right: -100vw;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Method to filter monasteries on map
    filterMonasteriesOnMap(filteredMonasteries) {
        // Remove all markers
        this.markers.forEach(marker => {
            this.map.removeLayer(marker);
        });
        this.markers = [];
        
        // Clear cluster group
        this.map.removeLayer(this.markerClusterGroup);
        this.markerClusterGroup = L.markerClusterGroup({
            chunkedLoading: true,
            maxClusterRadius: 50
        });
        
        // Add markers for filtered monasteries
        filteredMonasteries.forEach(monastery => {
            const marker = this.createMonasteryMarker(monastery);
            this.markers.push(marker);
            this.markerClusterGroup.addLayer(marker);
        });
        
        // Add cluster group to map
        this.map.addLayer(this.markerClusterGroup);
    }
}

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for the map container to be available
    setTimeout(() => {
        if (document.getElementById('monasteryMap')) {
            window.monasteryMap = new MonasteryMap();
        }
    }, 1000);
});