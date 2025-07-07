let map, marker, watchId;

function updateLocation(position) {
  const { latitude, longitude, accuracy } = position.coords;

  const latLng = [latitude, longitude];
  document.getElementById('coords').textContent =
    `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)} (±${Math.round(accuracy)} meters)`;

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

function showError(error) {
  const errors = {
    1: "Permission denied",
    2: "Position unavailable",
    3: "Timeout"
  };
  document.getElementById('coords').textContent = 
    `Error: ${errors[error.code] || error.message}`;
}

function startTracking() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
  }

  watchId = navigator.geolocation.watchPosition(
    updateLocation,
    showError,
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000
    }
  );
}
