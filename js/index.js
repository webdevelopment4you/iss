//Initialize the map
var mymap = L.map('mapid').setView([0, 0], 1); //heresetview([langitude, lattitude],zoomLevel)

let myIss = L.icon({
    iconUrl: './ISS.png',
    iconSize: [100, 64],
    iconAnchor: [50, 32],
});

let marker = L.marker([0, 0], { icon: myIss }).addTo(mymap);


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYmhvbWVzaHdhciIsImEiOiJja2YzZGxyN3cwMjViMnFxZXRpYjh4MHM5In0.0ESI9HfvJsOPB8VTqqE_nQ'
}).addTo(mymap);

const myUrl = "https://api.wheretheiss.at/v1/satellites/25544";

let firstTime = true;

//function to get latest ISS data
async function getIss() {
    const response = await fetch(myUrl);
    const data = await response.json();

    //destructuring: it will save latitude and longitude data in latitude and longitude variables
    const { latitude, longitude } = data;

    let lat = document.getElementById("latitude");
    let long = document.getElementById("longitude");
    lat.innerText = latitude.toFixed(2);
    long.innerText = longitude.toFixed(2);
    // L.marker([latitude, longitude]).addTo(mymap);
    marker.setLatLng([latitude, longitude], { icon: myIss }); //setting up lattitude and longitude
    if (firstTime) {
        mymap.setView([latitude, longitude], 2); //to center the view of ISS on the map
        firstTime = false;
    }
}

setInterval(() => {
    getIss();
}, 1000);


