function mapInit() {
  const mymap = L.map('mapid').setView([51.505, -0.09], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicGFubWFuMzMyMiIsImEiOiJja3VxMmY3eGcwOGYyMm5wamVuZDdpZ2kwIn0.CGgccgepZiCQocY0jt8OOg'
  }).addTo(mymap);
  return mymap;
}

async function dataHandler(map) {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const zip = [];

  const request = await fetch(endpoint);
  const zipJson = await request.json();
  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  function findMatches(wordToMatch, zip) {
    return zip.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.zip.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, zipJson);
    //const marker = L.marker([51.5, -0.09]).addTo(mymap);
    //array for coordinate of matches geocoded_column_1.coordinates
    //when resetting, must get rid of previous 5 markers 
    //const coordArray
    const html = matchArray.map((place) => {
      const regex = new RegExp(event.target.value, 'gi');
      const zipName = place.zip.replace(regex, `<span class = "h1">${this.value}</span>`);
      return `
                  <li>
                      <span class = "name">${place.name}</span>
                      <br>
                      <span class = "name">${place.type}</span>
                      <br>
                      <span class = "name">${place.address_line_1}</span>
                      <br>
                      <span class = "name">${place.city}</span>
                      <br>
                      <span class = "name">${place.zip}</span>      
                  </li> 
                  `;
    }).join('');
    console.log(matchArray);

    suggestions.innerHTML = html;
  }

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}

async function windowActions() {
  const map = mapInit();
  dataHandler(map);
}

window.onload = windowActions;
