const cards = document.querySelector('.cards');
const notification = document.querySelector('.notification');
let data = [];

fetch('https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json')
  .then(response => response.json())
  .then(json => data = json);

function filter() {
  const driver = document.querySelector('#driver').value.toLowerCase();

  const date = parseInt(document.querySelector('#date').value);
  const passenger = parseInt(document.querySelector('#passenger').value);

  let filteredData = data.filter(car => {
    if (driver && car.available !== false) return false;
    if (date && car.year < date) return false;
    if (passenger && car.capacity < passenger) return false;
    return true;
  });

  if (filteredData.length === 0) {
    notification.textContent = 'Tidak ada mobil yang tersedia';
    cards.innerHTML = '';
    return;
  }




  notification.textContent = '';
  
   cards.innerHTML = filteredData.map(car => `
     <div class="card">
     <div class="col md-4 mt-3">

       <img src="${car.image}" alt="${car.name}">
       <h5 class="card-title">${car.manufacture} / ${car.model}</h5>
          <p class="card-text"><strong>Rp${car.rentPerDay}/hari</strong></p>
          <p class="card-text">${car.description}</p>
          <p class="card-text"><i class="fas fa-user"></i> ${car.capacity} orang</p>
          <p class="card-text"><i class="fas fa-link"></i> ${car.transmission}</p>
          <p class="card-text"> date ${car.year}</p>
          <a href="#" class="btn btn-primary">Pilih Mobil</a>
          </div>
          </div>`).join('');
}
