import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

// A plain Lit component which can be used in any framework
@customElement('map-component')
export class MapComponent extends LitElement {
  declare name: string;
  declare center: any;
  declare map: any;

  static styles = css`
    p {
      display: inline-block;
      border: solid 1px gray;
      background: white;
      color: black;
      padding: 0 1em;
    }


    #map {
      width: 100vw;
      height: 100vh;
      z-index: 1;
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
      font-size: 16px;
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


    .link {
      color: var(--c-text-color);
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

  `;

  static properties = {name: {type: String}}


  firstUpdated(): void {
    // super.firstUpdated()

    // @ts-ignore
    let mapElement: HTMLElement = this.renderRoot.getElementById("map")

      // Request needed libraries.
   this.map = new google.maps.Map(mapElement, {
    center: this.center,
    zoom: 15,
    mapId: "4504f8b37365c3d0",
  });

  
  // infowindow = new google.maps.InfoWindow();
  
}


async addMarkerElement(div: any, location: any) {
  try {
    // @ts-ignore
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;


    console.log(this.map, div, location)

    const marker = new AdvancedMarkerElement({
      map: this.map,
      position: location,
      content: div,
    });

    console.log(marker)
  } catch(e) {

  }
}

setMarker(name: any, location: any, place: any, rank: any) {

  const RestaurantInfoElement = document.createElement("div");
  RestaurantInfoElement.classList.add("here");
  RestaurantInfoElement.textContent = name;
  
  if (place) {
    RestaurantInfoElement.classList.add("place");
    const p = document.createElement("p");
    // p.innerText = distance(location).toFixed(3) + " km"
    RestaurantInfoElement.appendChild(p);

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

    const link = document.createElement("a");

    link.innerText = "Directions!"
    link.target = "_blank";
    link.href = "https://google.com";
    link.classList.add("link")

    console.log(place)

    RestaurantInfoElement.appendChild(link);

    RestaurantInfoElement.appendChild(span);
  }
     

  this.addMarkerElement(RestaurantInfoElement, this.center);
  

}

constructor() {
  super();
  this.name = "";
  this.center = {lat: 0, lng: 0}
  
  
  navigator.geolocation.getCurrentPosition((e) => {
    
    const crd = e.coords;
    this.center.lng = crd.longitude
    this.center.lat = crd.latitude;
    
    console.log("got current position")
    
    this.map.setCenter(this.center);
    this.setMarker("You are here", this.center, null, null);
  
  this.requestUpdate()
  
  // map.setCenter(myLatLng)
  // setMarker("You are here", myLatLng)
  
  // makeRequest()
  
  
}, () => {
  
})

  }



  render() {

    // return html`as;d][as;]`
    return html`<section id="map" style="
    width: 100vw;
    height: 100vh;
    ">hello</section>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'map-component': MapComponent;
  }
}
