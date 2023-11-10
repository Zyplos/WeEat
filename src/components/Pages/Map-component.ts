import {html, css, LitElement, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';

// A plain Lit component which can be used in any framework
@customElement('map-component')
export class MapComponent extends LitElement {
  declare name: string;
  declare center: any;
  declare map: any;
  declare locations: any;
  declare openListView: any;
  declare isOpened: boolean;

  static styles = css`
  :host {
    position: relative;
    z-index: 0;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
    p {
      display: block;
      // background-color: black;
      color: var(--c-text-color);
    }


    #map {
      width: 100vw;
      height: 100vh;
      z-index: 1;
      overflow: hidden;
      position: relative;
  }

  .list-view {
    position: absolute;
    right: 0;
    top: 50%;
    font-size: var(--text-m);
    background-color: green;
    z-index: 9999;
    cursor: pointer;
  }


  .place {
      text-align: left;
      font-size: 12px !important;
  }

    
    .here {
      padding: var(--space-m) var(--space-l);
      background-color: rgba(0,0,0,.5);
      color: var(--c-text-color);
      position: relative;
      font-size: var(--text-xs);
      border-radius: 10px;
      backdrop-filter: blur(10px);
      transform: translateY(-10px);
      
  }
  .here::after {
      content: "";
      position: absolute;
      bottom: 0;
      background-color: rgba(0,0,0,.5);
      width: 20px;
      height: 10px;
      left: 50%;
      transform: translate(-50%, 100%);
      -webkit-clip-path: polygon(100% 0, 0 0, 50% 100%);
      clip-path: polygon(100% 0, 0 0, 50% 100%);
  }

  .rank {
      position: absolute;
      right: 0;
      top: 0;
      width: 30px;
      height: 30px;
      transform: translate(30%, -30%);
      background-color: rgba(0,0,0,.5);
      display: flex;
      align-items: center;
      justify-content: center;
      -webkit-clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  }



  .name-element {
    margin-bottom: var(--space-s);
    font-size: var(--text-s) !important;
  }

    .link {
      color: var(--c-text-color);
      text-decoration: none;
  }

  .gold span {
      background-color: var(--c-gold);
      z-index: 9999999;
  }
  
  .silver span {
      background-color: var(--c-silver);
      color: var(--c-text-dark-color);
      z-index: 9999998;
  }
  
  .bronze span {
      background-color: var(--c-bronze);
      /* z-index: 97; */
      z-index: 9999997;
  }

  .gold  {
      z-index: 9999999;
  }
  
  .silver {
      z-index: 9999998;
  }
  
  .bronze {
      z-index: 9999997;
  }

  .drawer {
    position: fixed;
    height: 100%;
    width: 100vw;
    background-color: rgba(0,0,0,.5);
    z-index: 9999999;
    transform: translate(100%);
    transition: all .2s;
  }

  .drawer.opened {

    transform: translate(0%);
  }


  `;

  static properties = {name: {type: String}}


// taken from code found online lol
getDistanceFromLatLonInKm(lat1: number,lon1: number,lat2: number,lon2: number) {
  var R = 6371; // Radius of the earth in km
  var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
  var dLon = this.deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

deg2rad(deg: any) {
  return deg * (Math.PI/180)
}

distance(rest: any) {
 const d =  this.getDistanceFromLatLonInKm(rest.lat(), rest.lng(), this.center.lat, this.center.lng);

 return d;
}

  byDistance(a: any, b: any) {
    return a.distance - b.distance
  }
  
  calcDistances(results: any) {
  let newResults = [];

    for (let i = 0; i < results.length; i++) {
      const newResult = {
        ...results[i],
        distance: this.distance(results[i].geometry.location)
      }
  
      newResults.push(newResult);
    }

    return newResults.sort(this.byDistance.bind(this));
  }

  async addMarkerElement(div: any, location: any) {
    try {
      // @ts-ignore
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
  
      const marker = new AdvancedMarkerElement({
        map: this.map,
        position: location,
        content: div,
      });
    } catch(e) {
      
    }
  }
  
  async setMarker(name: any, location: any, place: any, rank: any) {
    const RestaurantInfoElement = document.createElement("div");
    RestaurantInfoElement.classList.add("here");
    const link = document.createElement("a");
  
    link.target = "_blank";
    link.href = "https://google.com";
    link.classList.add("link")
  
  
    RestaurantInfoElement.appendChild(link);

    const nameElement = document.createElement("p");
  nameElement.classList.add("name-element")
  nameElement.textContent = name;
  link.appendChild(nameElement);
  
  if (place) {
    RestaurantInfoElement.classList.add("place");
    const p = document.createElement("p");
    p.textContent = place.distance.toFixed(2) + " km ";
    link.appendChild(p);

    rank = rank+1;
    const span = document.createElement("span");
    span.innerText = rank;
    span.classList.add("rank")
    if (rank === 1) {
      RestaurantInfoElement.classList.add("gold");
    } else if (rank === 2) {
      RestaurantInfoElement.classList.add("silver"); 
    } else if (rank === 3) {
      RestaurantInfoElement.classList.add("bronze");
    }


    link.appendChild(span);
  }
     
  this.addMarkerElement(RestaurantInfoElement, location);
}
  
  async checkIfLocExists(place: any, rank: any) {
   if (!place.geometry || !place.geometry.location) return;
   let marker;
 
 try {
   marker = await this.setMarker(place.name, place.geometry.location, place, rank)
 } catch (e) {
 
 } finally {
 
   google.maps.event.addListener(marker!, "click", () => {
     // infowindow.setContent(place.name);
     // infowindow.open(map);
   });  
 }
 }

  makeRequest(newRequest: any) {
    let request = {
      keyword: "pizza",
      type: "restaurant",
      openNow: true,
      fields: ["ALL"],
      location: this.center,
      radius: 1000,
    };
  
    if (newRequest) {
      request = newRequest
    }
  
    let service = new google.maps.places.PlacesService(this.map);
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        this.locations = this.calcDistances(results)
        for (let i = 0; i < this.locations.length; i++) {
          this.checkIfLocExists(this.locations[i], i);
        }
      }
    });
  } 


  firstUpdated(): void {
    // @ts-ignore
    let mapElement: HTMLElement = this.renderRoot.getElementById("map")

    // Request needed libraries.
    navigator.geolocation.getCurrentPosition((e) => {
      
      const crd = e.coords;
      this.center.lng = crd.longitude
      this.center.lat = crd.latitude;
      
      console.log("got current position")
      
      this.map.setCenter(this.center);
      this.setMarker("You are here", this.center, null, null);
    
    this.requestUpdate()
    
    this.makeRequest(null);
    
    }, () => {
    
    })

   this.map = new google.maps.Map(mapElement, {
    center: this.center,
    zoom: 15,
    mapId: "4504f8b37365c3d0",
  });
}

constructor() {
  super();
  this.name = "";
  this.center = {lat: 0, lng: 0}
  }

  openDrawer() {
    this.isOpened = !this.isOpened;
    this.requestUpdate()
  }

  getAside(): TemplateResult {
    
    console.log(this.locations)
    if (!this.locations) {
      return html``;
    }


    return html`<aside class="drawer ${this.isOpened ? "opened" : ""}">
    
    <div class="padding">
    <ol>
    ${this.locations.map((location: any) => {
      
      
      return html`
      <li><h3>${location.name}</h3>
        <p>hello</p>
      </li>
      ` 
    })}
    </ol>
    </div>
    </aside>`

  }


  render() {

    return html`

    ${this.getAside()}

    <button
    @click=${this.openDrawer}
    class="list-view">view</button>
    <div style="
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    ">

    <section id="map"
    width: 100vw;
    height: 100vh;
    ">
    </section>
    </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'map-component': MapComponent;
  }
}
