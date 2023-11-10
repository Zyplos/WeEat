import { html, css, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import mapComponentCss from "./map-component.css";
import localforage from "localforage";

// A plain Lit component which can be used in any framework
@customElement("map-component")
export class MapComponent extends LitElement {
  declare name: string;
  declare center: any;
  declare map: any;
  declare locations: any;
  declare openListView: any;
  declare isOpened: boolean;

  static styles = mapComponentCss;
  static properties = { name: { type: String } };

  // taken from code found online lol
  getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg: any) {
    return deg * (Math.PI / 180);
  }

  distance(rest: any) {
    const d = this.getDistanceFromLatLonInKm(rest.lat(), rest.lng(), this.center.lat, this.center.lng);

    return d;
  }

  byDistance(a: any, b: any) {
    return a.distance - b.distance;
  }

  calcDistances(results: any) {
    const newResults = [];

    for (let i = 0; i < results.length; i++) {
      const newResult = {
        ...results[i],
        distance: this.distance(results[i].geometry.location),
      };

      newResults.push(newResult);
    }

    return newResults.sort(this.byDistance.bind(this));
  }

  async addMarkerElement(div: any, location: any) {
    try {
      // @ts-ignore
      const { AdvancedMarkerElement } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;

      const marker = new AdvancedMarkerElement({
        map: this.map,
        position: location,
        content: div,
      });
    } catch (e) {}
  }

  async setMarker(name: any, location: any, place: any, rank: any) {
    const RestaurantInfoElement = document.createElement("div");
    RestaurantInfoElement.classList.add("here");
    const link = document.createElement("a");

    link.target = "_blank";
    link.href = "https://google.com";
    link.classList.add("link");

    RestaurantInfoElement.appendChild(link);

    const nameElement = document.createElement("p");
    nameElement.classList.add("name-element");
    nameElement.textContent = name;
    link.appendChild(nameElement);

    if (place) {
      RestaurantInfoElement.classList.add("place");
      const p = document.createElement("p");
      p.textContent = place.distance.toFixed(2) + " km ";
      link.appendChild(p);

      rank = rank + 1;
      const span = document.createElement("span");
      span.innerText = rank;
      span.classList.add("rank");
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
      marker = await this.setMarker(place.name, place.geometry.location, place, rank);
    } catch (e) {
    } finally {
      google.maps.event.addListener(marker!, "click", () => {
        // infowindow.setContent(place.name);
        // infowindow.open(map);
      });
    }
  }

  async insert() {
    try {
      await localforage.setItem("locations", JSON.stringify(this.locations));

      console.log("success");
    } catch (err) {
      console.log(err);
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
      request = newRequest;
    }

    const service = new google.maps.places.PlacesService(this.map);
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        this.locations = this.calcDistances(results);

        this.insert();

        for (let i = 0; i < this.locations.length; i++) {
          this.checkIfLocExists(this.locations[i], i);
        }
      }
    });
  }

  startApp() {
    this.map.setCenter(this.center);
    this.setMarker("You are here", this.center, null, null);

    this.makeRequest(null);
    this.requestUpdate();
  }

  async getGeolocation(mapElement: HTMLElement) {
    let geolocation;
    try {
      geolocation = await localforage.getItem("geolocation");
    } finally {
      if (geolocation) {
        this.center = geolocation;
        this.startApp();
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (e) => {
          const crd = e.coords;
          this.center.lng = crd.longitude;
          this.center.lat = crd.latitude;
          localforage.setItem("geolocation", this.center);

          this.startApp();
        },
        () => {
          console.log("got current position");
        }
      );
    }
  }

  firstUpdated(): void {
    // @ts-ignore
    const mapElement: HTMLElement = this.renderRoot.getElementById("map");
    this.getGeolocation(mapElement);
    this.map = new google.maps.Map(mapElement, {
      center: { lat: 41, lng: -87 },
      zoom: 15,
      mapId: "4504f8b37365c3d0",
    });
  }

  constructor() {
    super();
    this.name = "";
    this.center = { lat: 0, lng: 0 };
  }

  openDrawer() {
    this.isOpened = !this.isOpened;
    this.requestUpdate();
  }

  render() {
    return html`
    
  
    <a
    href="/map/list-view"
    class="list-view">view</a>
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
    "map-component": MapComponent;
  }
}
