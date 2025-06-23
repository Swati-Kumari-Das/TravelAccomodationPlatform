

    // // Create the map and set the view to a specific location and zoom
    // const map = L.map('map').setView([28.6139, 77.2088], 9); // [lat, lng]

    // // Add OpenStreetMap tile layer
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     attribution: '&copy; OpenStreetMap contributors'
    // }).addTo(map);

    // // Optional: Add a marker
    // L.marker([28.6139, 77.2088]).addTo(map)
    //     .bindPopup('Hello from Leaflet + OSM!')
    //     .openPopup();

  
    document.addEventListener("DOMContentLoaded", function () {
        const mapDiv = document.getElementById("map");
        if (!mapDiv) return;
      
        const location = mapDiv.dataset.location;
      
        // Use Nominatim for forward geocoding
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
          .then(res => res.json())
          .then(data => {
            if (data.length === 0) {
              console.error("Location not found");
              return;
            }
      
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
      
            const map = L.map("map").setView([lat, lon], 13);
      
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution: "&copy; OpenStreetMap contributors",
            }).addTo(map);
             

              // ✅ Define custom red icon
      const redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
            L.marker([lat, lon], { icon: redIcon }).addTo(map)
              .bindPopup(`Exact location will be provided after booking: ${location}`)
              .openPopup();
          })
          .catch(err => {
            console.error("Geocoding error:", err);
          });
      });
      