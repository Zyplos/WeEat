let myLatLng = { lng: 0, lat: 0}
let map;
let service;
let infowindow;


function initMap() {
  // Request needed libraries.
  map = new google.maps.Map(document.getElementById("map"), {
    center: myLatLng,
    zoom: 15,
    mapId: "4504f8b37365c3d0",
  });
  
  infowindow = new google.maps.InfoWindow();
}  

// taken from code found online lol
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function distance(rest) {
 const d =  getDistanceFromLatLonInKm(rest.lat(), rest.lng(), myLatLng.lat, myLatLng.lng);

 return d;
}


function byDistance(a, b) {
  return b.distance - a.distance
}

function calcDistances(results) {

let newResults = [];

  for (let i = 0; i < results.length; i++) {
    const newResult = {
      ...results[i],
      distance: distance(results[i].geometry.location)
    }

    newResults.push(newResult);
  }

  return newResults.sort(byDistance);
}

function makeRequest(newRequest) {
  let request = {
    keyword: "pizza",
    type: "restaurant",
    openNow: true,
    fields: ["ALL"],
    location: myLatLng,
    radius: 1000,
  };

  if (newRequest) {
    request = newRequest
  }

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      const newResults = calcDistances(results)

      for (let i = 0; i < newResults.length; i++) {
        createMarker(newResults[i], 2-i);
      }
      // map.setCenter(results[0].geometry.location);
    }
  });
} 

async function createMarker(place, rank) {
  if (!place.geometry || !place.geometry.location) return;
  let marker;

try {
  marker = await setMarker(place.name, place.geometry.location, place, rank)
} catch (e) {

} finally {

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name);
    infowindow.open(map);
  });  
}
}

window.initMap = initMap;


async function setMarker(name, location, place, rank) {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  const RestaurantInfoElement = document.createElement("div");
  RestaurantInfoElement.classList.add("here");
  RestaurantInfoElement.textContent = name;
  
  if (place) {
    RestaurantInfoElement.classList.add("place");
    const p = document.createElement("p");
    p.innerText = distance(location).toFixed(3) + " km"
    RestaurantInfoElement.appendChild(p);

    rank = rank+1;
    const span = document.createElement("span");
    span.innerText = rank;
    span.classList.add("rank")
    if (rank === 1) {
      span.classList.add("gold");
    } else if (rank === 2) {
      span.classList.add("silver"); 
    } else if (rank === 3) {
      span.classList.add("bronze");
    }

    RestaurantInfoElement.appendChild(span);
  }
  
  const marker = new AdvancedMarkerElement({
    map,
    position: location,
    content: RestaurantInfoElement,
  });
  

  return marker
}

navigator.geolocation.getCurrentPosition((e) => {
  
  const crd = e.coords;
  myLatLng.lng = crd.longitude
  myLatLng.lat = crd.latitude;
  
  console.log("got current position")
  
  
  
  map.setCenter(myLatLng)
  setMarker("You are here", myLatLng)
  
  makeRequest()
  
  
}, () => {
  
})

window.initMap = initMap;
