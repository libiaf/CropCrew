const indicators = {
  NVDI: 40,        // Vegetation Status (se usa la clase vstatus)
  heatStress: 40,  // Heat
  humidity: 40,    // Water
  surfTemp: 40,    // Land Surface Temp
  grndTemp: 40     // Ground Temp
};

function loadIndicators() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      Object.assign(indicators, data.indicators); 
      updateIndicators(indicators);
    })
    .catch(error => console.error('Error al cargar los indicadores:', error));
}

function updateIndicators(indicators) {

  const vstatusBar = document.querySelector('.vstatus_bar .vstatus');
  const vstatusLabel = document.querySelector('.vstatus_bar .vs_text');
  
  vstatusBar.style.width = `${indicators.NVDI}%`;
  vstatusLabel.textContent = `${indicators.NVDI}%`;

  document.querySelectorAll('.progress-bar').forEach((progressBar, index) => {
    const value = Object.values(indicators)[index + 1]; 
    const progress = progressBar.querySelector('.progress');
    const percentageLabel = progressBar.querySelector('span');
    
    progress.style.width = `${value}%`;
    percentageLabel.textContent = `${value}%`;

  });
  
  updatePlantCondition(indicators.NVDI);
}

loadIndicators();
setInterval(loadIndicators, 5000);

function updatePlantCondition() {
  const conditionText = document.querySelector('.condition h1');
  const plantImage = document.querySelector('.wheat-icon');

  if (indicators.NVDI >= 70) {
    conditionText.textContent = 'THIRVING';
    plantImage.src = 'healthy.webp'; 
  } else if (indicators.NVDI >= 40 && indicators.NVDI < 70) {
    conditionText.textContent = 'STRUGGLING';
    plantImage.src = 'progress.webp';  
  } else {
    conditionText.textContent = 'PERISHING';
    plantImage.src = 'dying.webp';  
  }
}
document.addEventListener("DOMContentLoaded", function() {
  var map = L.map('map').setView([51.505, -0.09], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
});
