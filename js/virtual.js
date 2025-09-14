// Virtual Tours: Google Street View integration
(function() {
	const VirtualTours = {
		googleMapsReady: false,
		loading: false,
		apiKey: (window.MONASTERY360_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY'),

		loadGoogleMapsIfNeeded() {
			if (this.googleMapsReady || this.loading) return;
			this.loading = true;
			const script = document.createElement('script');
			script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(this.apiKey)}&v=quarterly&libraries=places`;
			script.async = true;
			script.defer = true;
			script.onload = () => {
				this.googleMapsReady = true;
				this.loading = false;
				console.log('Google Maps JS API loaded for virtual tours');
				if (this._pendingOpen) {
					const { lat, lng, heading, pitch, zoom } = this._pendingOpen;
					this._pendingOpen = null;
					this.openStreetView(lat, lng, heading, pitch, zoom);
				}
			};
			script.onerror = () => {
				this.loading = false;
				console.error('Failed to load Google Maps JS API.');
			};
			document.head.appendChild(script);
		},

		openStreetView(lat, lng, heading = 0, pitch = 0, zoom = 1) {
			const container = document.getElementById('streetViewContainer');
			if (!container) return;

			// Show container
			container.style.display = 'block';

			// Ensure API is ready
			if (!this.googleMapsReady) {
				this._pendingOpen = { lat, lng, heading, pitch, zoom };
				this.loadGoogleMapsIfNeeded();
				return;
			}

			// Initialize Street View
			try {
				const location = { lat: Number(lat), lng: Number(lng) };
				const sv = new google.maps.StreetViewService();
				const panorama = new google.maps.StreetViewPanorama(container, {
					position: location,
					pov: { heading, pitch },
					zoom,
					addressControl: false,
					linksControl: true,
					motionTracking: true,
					fullscreenControl: true
				});

				// Check for nearest panorama within 250 meters
				sv.getPanorama({ location, radius: 250 }, (data, status) => {
					if (status === 'OK' && data && data.location && data.location.latLng) {
						panorama.setPosition(data.location.latLng);
						panorama.setPov({ heading, pitch });
						console.log('Street View panorama found');
					} else {
						console.warn('No Street View available near this monastery.');
						// Graceful fallback: hide container and show a note
						container.style.display = 'none';
						if (window.app) {
							alert('3D Street View is not available at this location.');
						}
					}
				});
			} catch (e) {
				console.error('Error initializing Street View:', e);
				container.style.display = 'none';
			}
		}
	};

	// Expose to global
	window.VirtualTours = VirtualTours;
})();