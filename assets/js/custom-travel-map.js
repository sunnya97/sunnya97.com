/**
 * Custom Travel Map Component
 * Interactive map showing travel locations using MapLibre GL JS
 */
class CustomTravelMap {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.options = {
      center: [0, 20],
      zoom: 0.9,
      ...options
    };
    this.map = null;
    this.locations = [];
  }

  // Load travel data from CSV or provided data
  loadTravelData(csvData = null) {
    if (csvData) {
      this.locations = csvData;
    } else {
      // Default travel locations data from CSV file
      this.locations = [
        { name: 'Paris', coords: [2.3483915, 48.8534951], type: 'visited' },
        { name: 'London', coords: [-0.1276474, 51.5073219], type: 'visited' },
        { name: 'New York', coords: [-74.0060152, 40.7127281], type: 'lived' },
        { name: 'Rome', coords: [12.4829321, 41.8933203], type: 'visited' },
        { name: 'Amsterdam', coords: [4.8936041, 52.3727598], type: 'visited' },
        { name: 'Barcelona', coords: [2.1774322, 41.3828939], type: 'visited' },
        { name: 'Berlin', coords: [13.3888599, 52.5170365], type: 'lived' },
        { name: 'Prague', coords: [14.4212535, 50.0874654], type: 'visited' },
        { name: 'Venice', coords: [12.3345898, 45.4371908], type: 'visited' },
        { name: 'Vienna', coords: [16.3725042, 48.2083537], type: 'visited' },
        { name: 'Philadelphia', coords: [-75.1635262, 39.9527237], type: 'visited' },
        { name: 'Denver', coords: [-104.984862, 39.7392364], type: 'visited' },
        { name: 'Atlanta', coords: [-84.3902644, 33.7489924], type: 'visited' },
        { name: 'Orlando', coords: [-81.3790304, 28.5421109], type: 'visited' },
        { name: 'Miami', coords: [-80.222564388, 25.7820042], type: 'visited' },
        { name: 'San Francisco', coords: [-122.419906, 37.7790262], type: 'lived' },
        { name: 'Los Angeles', coords: [-118.242766, 34.0536909], type: 'visited' },
        { name: 'Iceland', coords: [-21.9422367, 64.145981], type: 'visited' },
        { name: 'Cambridge', coords: [0.1186637, 52.2055314], type: 'visited' },
        { name: 'Nice', coords: [7.2683912, 43.7009358], type: 'visited' },
        { name: 'Monaco', coords: [7.4197576, 43.7311424], type: 'visited' },
        { name: 'Vatican City', coords: [12.4528527, 41.903411], type: 'visited' },
        { name: 'Florence', coords: [11.2555757, 43.7698712], type: 'visited' },
        { name: 'Milan', coords: [9.1896346, 45.4641943], type: 'visited' },
        { name: 'Zurich', coords: [8.5410422, 47.3744489], type: 'visited' },
        { name: 'Geneva', coords: [6.1466014, 46.2017559], type: 'visited' },
        { name: 'Lisbon', coords: [-9.1365919, 38.7077507], type: 'visited' },
        { name: 'Istanbul', coords: [28.9662187, 41.0091982], type: 'visited' },
        { name: 'Cappadocia', coords: [34.95945521, 38.5928119], type: 'visited' },
        { name: 'Athens', coords: [23.7283052, 37.9839412], type: 'visited' },
        { name: 'Paros', coords: [25.192167402, 37.0651048], type: 'visited' },
        { name: 'Mykonos', coords: [25.392337493, 37.4514345], type: 'visited' },
        { name: 'Bordeaux', coords: [-0.5800364, 44.841225], type: 'visited' },
        { name: 'Split', coords: [16.4399659, 43.5116383], type: 'visited' },
        { name: 'New Delhi', coords: [77.2090057, 28.6138954], type: 'lived' },
        { name: 'Amritsar', coords: [74.8736788, 31.6343083], type: 'visited' },
        { name: 'Dalhousie', coords: [75.9797487, 32.5360472], type: 'visited' },
        { name: 'Jaipur', coords: [75.8189817, 26.9154576], type: 'visited' },
        { name: 'Mumbai', coords: [72.8692035, 19.054999], type: 'visited' },
        { name: 'Ladakh', coords: [77.5848133, 34.1642029], type: 'visited' },
        { name: 'Bangkok', coords: [100.4935089, 13.7524938], type: 'visited' },
        { name: 'Chiang Mai', coords: [98.9858802, 18.7882778], type: 'visited' },
        { name: 'Taipei', coords: [121.5636796, 25.0375198], type: 'visited' },
        { name: 'Tainan', coords: [120.184982, 22.9912348], type: 'visited' },
        { name: 'Busan', coords: [129.0752365, 35.1799528], type: 'visited' },
        { name: 'Seoul', coords: [126.9782914, 37.5666791], type: 'visited' },
        { name: 'Shanghai', coords: [121.4691024, 31.2323437], type: 'visited' },
        { name: 'Hainan Island', coords: [109.62889143756746, 19.1602864], type: 'visited' },
        { name: 'Hong Kong', coords: [114.1849161, 22.350627], type: 'visited' },
        { name: 'Hangzhou', coords: [120.2052342, 30.2489634], type: 'visited' },
        { name: 'Tokyo', coords: [139.7594549, 35.6828387], type: 'visited' },
        { name: 'Kyoto', coords: [135.7556075, 35.021041], type: 'visited' },
        { name: 'Osaka', coords: [135.5014539, 34.6937569], type: 'visited' },
        { name: 'Sapporo', coords: [141.3542924, 43.061936], type: 'visited' },
        { name: 'Niseko', coords: [140.6873034, 42.804684], type: 'visited' },
        { name: 'Bali', coords: [115.270385512, -8.4560181], type: 'visited' },
        { name: 'Sydney', coords: [151.2082848, -33.8698439], type: 'visited' },
        { name: 'Melbourne, Australia', coords: [144.9631608, -37.8142176], type: 'visited' },
        { name: 'Melbourne, FL', coords: [-80.6371513, 28.106471], type: 'lived' },
        { name: 'Key West', coords: [-81.7724368, 24.5625566], type: 'visited' },
        { name: 'Oahu', coords: [-158.036483727, 21.48343645], type: 'visited' },
        { name: 'Hawaii', coords: [-155.448698303, 19.58955475], type: 'visited' },
        { name: 'Maui', coords: [-156.310683316, 20.8029568], type: 'visited' },
        { name: 'Medellín', coords: [-75.573553, 6.2443382], type: 'visited' },
        { name: 'San Diego', coords: [-117.1627728, 32.7174202], type: 'visited' },
        { name: 'Dallas', coords: [-96.7968559, 32.7762719], type: 'visited' },
        { name: 'Austin', coords: [-97.7436995, 30.2711286], type: 'visited' },
        { name: 'Raleigh', coords: [-78.6390989, 35.7803977], type: 'visited' },
        { name: 'Washington D.C.', coords: [-77.0365427, 38.8950368], type: 'visited' },
        { name: 'Baltimore', coords: [-76.610759, 39.2908816], type: 'visited' },
        { name: 'Louisville', coords: [-85.759407, 38.2542376], type: 'visited' },
        { name: 'Nassau', coords: [-77.3383331, 25.0783456], type: 'visited' },
        { name: 'Rincón', coords: [-67.2506517, 18.3396565], type: 'visited' },
        { name: 'San Juan', coords: [-66.116666, 18.465299], type: 'lived' },
        { name: 'Aruba', coords: [-69.981864152, 12.51756625], type: 'visited' },
        { name: 'Punta Cana', coords: [-68.3691611, 18.556551], type: 'visited' },
        { name: 'Belize City', coords: [-88.2003115, 17.5000543], type: 'visited' },
        { name: 'San Pedro Town', coords: [-87.9621768, 17.9204087], type: 'visited' },
        { name: 'Cancún', coords: [-86.8514988, 21.1618955], type: 'visited' },
        { name: 'Playa del Carmen', coords: [-87.0779503, 20.6308643], type: 'visited' },
        { name: 'Tulum', coords: [-87.6529306, 20.429647], type: 'visited' },
        { name: 'Cabo San Lucas', coords: [-109.9200604, 22.8938884], type: 'visited' },
        { name: 'Mexico City', coords: [-99.1331785, 19.4326296], type: 'visited' },
        { name: 'Vancouver', coords: [-123.113952, 49.2608724], type: 'visited' },
        { name: 'Victoria', coords: [-123.3649533, 48.4283182], type: 'visited' },
        { name: 'New Haven', coords: [-72.9250518, 41.3082138], type: 'visited' },
        { name: 'Boston', coords: [-71.060511, 42.3554334], type: 'visited' },
        { name: 'Toronto', coords: [-79.3839347, 43.6534817], type: 'lived' },
        { name: 'Niagara Falls', coords: [-79.0639039, 43.1065603], type: 'visited' },
        { name: 'Montreal', coords: [-73.5698065, 45.5031824], type: 'visited' },
        { name: 'Quebec', coords: [-71.2084061, 46.8137431], type: 'visited' },
        { name: 'Calgary', coords: [-114.065465, 51.0460954], type: 'visited' },
        { name: 'Salt Lake City', coords: [-111.8867975, 40.7596198], type: 'visited' },
        { name: 'Lake Tahoe', coords: [-119.9843482, 38.9332411], type: 'visited' },
        { name: 'Sacramento', coords: [-121.493895, 38.5810606], type: 'visited' },
        { name: 'Phoenix', coords: [-112.074141, 33.4484367], type: 'visited' },
        { name: 'Las Vegas', coords: [-115.148516, 36.1672559], type: 'visited' },
        { name: 'Nashville', coords: [-86.7742984, 36.1622767], type: 'visited' },
        { name: 'Pittsburgh', coords: [-79.9900861, 40.4416941], type: 'visited' },
        { name: 'Harrisburg', coords: [-76.8861122, 40.2663107], type: 'visited' },
        { name: 'Copenhagen', coords: [12.5700724, 55.6867243], type: 'visited' },
        { name: 'Oslo', coords: [10.7389701, 59.9133301], type: 'visited' },
        { name: 'Bergen', coords: [5.3259192, 60.3943055], type: 'visited' },
        { name: 'Agra', coords: [78.0098161, 27.1752554], type: 'visited' },
        { name: 'Rovinj', coords: [13.6417282, 45.0807411], type: 'visited' },
        { name: 'Novi Sad', coords: [19.8451756, 45.2551338], type: 'visited' },
        { name: 'Belgrade', coords: [20.4568974, 44.8178131], type: 'visited' },
        { name: 'Mostar', coords: [17.8076584, 43.3435855], type: 'visited' },
        { name: 'Bucharest', coords: [26.1027202, 44.4361414], type: 'visited' },
        { name: 'Graz', coords: [15.4382786, 47.0708678], type: 'visited' },
        { name: 'Brussels', coords: [4.351697, 50.8465573], type: 'visited' },
        { name: 'Montpellier', coords: [3.8767337, 43.6112422], type: 'visited' },
        { name: 'Dubai', coords: [55.2924914, 25.2653471], type: 'visited' },
        { name: 'Singapore', coords: [103.8519072, 1.2899175], type: 'visited' },
        { name: 'Costa Rica', coords: [-84.0795782, 9.9325427], type: 'visited' },
        { name: 'Ljubljana', coords: [14.5069289, 46.0500268], type: 'visited' },
        { name: 'Minneapolis', coords: [-93.2654692, 44.9772995], type: 'lived' },
        { name: 'Santa Cruz', coords: [-122.0294673, 36.9743626], type: 'visited' },
        { name: 'Monterey', coords: [-121.8946388, 36.600256], type: 'visited' },
        { name: 'Santa Barbara', coords: [-119.7026673, 34.4221319], type: 'visited' },
        { name: 'Virgina', coords: [-77.43428, 37.5385087], type: 'visited' },
        { name: 'New Hampshire', coords: [-71.537476, 43.207178], type: 'visited' },
        { name: 'Acadia', coords: [-68.7778138, 44.8011821], type: 'visited' },
        { name: 'Berkeley', coords: [-122.272863, 37.8708393], type: 'lived' },
        { name: 'South Bay', coords: [-121.890591, 37.3361663], type: 'lived' },
        { name: 'New Jersey', coords: [-74.604954, 40.5931225], type: 'lived' },
        { name: 'Poconos', coords: [-75.3235213, 40.8956361], type: 'lived' }
      ];
    }
  }

  // Initialize the map
  init() {
    if (!window.maplibregl) {
      console.error('MapLibre GL JS is required for CustomTravelMap');
      return;
    }

    // Load default travel data if not already loaded
    if (this.locations.length === 0) {
      this.loadTravelData();
    }

    // Create map
    this.map = new maplibregl.Map({
      container: this.containerId,
      style: {
        version: 8,
        sources: {
          'raster-tiles': {
            type: 'raster',
            tiles: [
              'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          }
        },
        layers: [
          {
            id: 'simple-tiles',
            type: 'raster',
            source: 'raster-tiles',
            minzoom: 0,
            maxzoom: 18
          }
        ]
      },
      center: this.options.center,
      zoom: this.options.zoom,
      minZoom: 0.9,
      maxZoom: 18,
      attributionControl: false
    });

    // Add custom attribution
    this.map.addControl(new maplibregl.AttributionControl({
      customAttribution: 'MapLibre GL JS | © OpenStreetMap contributors'
    }), 'bottom-right');

    // Add navigation controls
    this.map.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Add markers when map loads
    this.map.on('load', () => {
      this.addMarkers();
    });

    // Handle map load errors gracefully
    this.map.on('error', (e) => {
      console.log('Map failed to load, falling back to simple attribution');
      document.getElementById(this.containerId).innerHTML = 
        '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-muted); font-style: italic;">Interactive map temporarily unavailable</div>';
    });
  }

  // Add markers to the map
  addMarkers() {
    // Add visited locations first (so they appear below lived locations)
    this.locations.filter(location => location.type === 'visited').forEach(location => {
      this.createMarker(location);
    });
    
    // Add lived locations second (so they appear above visited locations)
    this.locations.filter(location => location.type === 'lived').forEach(location => {
      this.createMarker(location);
    });
  }

  // Create individual marker
  createMarker(location) {
      // Create custom marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.style.cssText = `
        width: 8px;
        height: 8px;
        background-color: ${location.type === 'lived' ? '#4CAF50' : '#DC2626'};
        border: 1px solid white;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0,0,0,0.3);
      `;

      // Create popup
      const popup = new maplibregl.Popup({
        offset: 15,
        closeButton: false,
        closeOnClick: false
      }).setHTML(`
        <div style="
          font-family: var(--font-family, system-ui);
          color: #333;
          font-size: 14px;
          font-weight: 500;
          padding: 2px 0;
        ">
          ${location.name}
          ${location.type === 'lived' ? '<br><span style="font-size: 12px; color: #4CAF50;">🏠 Lived</span>' : ''}
        </div>
      `);

      // Create marker and add popup
      const marker = new maplibregl.Marker({
        element: markerElement,
        anchor: 'center'
      })
        .setLngLat(location.coords)
        .setPopup(popup)
        .addTo(this.map);

      // Show popup on hover
      markerElement.addEventListener('mouseenter', () => {
        marker.getPopup().addTo(this.map);
      });
      
      markerElement.addEventListener('mouseleave', () => {
        marker.getPopup().remove();
      });
  }

  // Destroy the map
  destroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  // Static method for easy initialization
  static create(containerId, options = {}) {
    const map = new CustomTravelMap(containerId, options);
    map.init();
    return map;
  }
}

// Add CSS for markers if not already present
if (!document.getElementById('custom-travel-map-styles')) {
  const style = document.createElement('style');
  style.id = 'custom-travel-map-styles';
  style.textContent = `
    .custom-marker {
      pointer-events: auto;
    }
  `;
  document.head.appendChild(style);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CustomTravelMap;
}