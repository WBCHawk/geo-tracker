let map, marker;

function updateLocation(position) {
  const { latitude, longitude } = position.coords;
  document.getElementById('coords').textContent =
    `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`;

  const latLng = [latitude, longitude];

  if (!map) {
    map = L.map('map').setView(latLng, 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    marker = L.marker(latLng).addTo(map);
  } else {
    marker.setLatLng(latLng);
    map.setView(latLng);
  }
}

function showError(err) {
  document.getElementById('coords').textContent =
    `Error: ${err.message}`;
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(updateLocation, showError);
}

setInterval(getLocation, 10000); // Update every 10 seconds
getLocation(); // Initial fetch
