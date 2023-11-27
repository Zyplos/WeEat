import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import mapComponentCss from "./map-component.css";
import localforage from "localforage";

interface Coordinates {
  lat: number;
  lng: number;
}
// A plain Lit component which can be used in any framework
@customElement("map-component")
export class MapComponent extends LitElement {
  declare name: string;
  declare center: Coordinates;
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

  deg2rad(deg: number) {
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

  async addMarkerElement(div: HTMLDivElement, location: Coordinates) {
    try {
      // @ts-ignore
      const { AdvancedMarkerElement } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;

      return new AdvancedMarkerElement({
        map: this.map,
        position: location,
        content: div,
      });
    } catch (e) {}
  }

  // place is the object
  // name is string
  async setMarker(name: string, location: Coordinates, place: any, rank: number) {
    console.log("!!!SETMARKER", name, location, place, rank);
    const RestaurantInfoElement = document.createElement("div");
    RestaurantInfoElement.classList.add("here");
    const link = document.createElement("a");

    console.log(place);
    link.target = "_blank";
    if (place) {
      console.log(this.center);
      link.href = `https://www.google.com/maps/dir/${this.center.lat},${this.center.lng}/${name},${place.vicinity}`;
    }
    link.textContent = "Directions";

    link.classList.add("link");

    const nameElement = document.createElement("p");
    nameElement.classList.add("name-element");
    nameElement.textContent = name;
    RestaurantInfoElement.appendChild(nameElement);

    if (place) {
      RestaurantInfoElement.classList.add("place");
      const p = document.createElement("p");
      p.textContent = place.distance.toFixed(2) + " km ";
      RestaurantInfoElement.appendChild(p);

      rank = rank + 1;
      const span = document.createElement("span");
      span.innerText = "" + rank;
      span.classList.add("rank");
      if (rank === 1) {
        RestaurantInfoElement.classList.add("gold");
      } else if (rank === 2) {
        RestaurantInfoElement.classList.add("silver");
      } else if (rank === 3) {
        RestaurantInfoElement.classList.add("bronze");
      }

      RestaurantInfoElement.appendChild(span);
    }

    if (place) {
      RestaurantInfoElement.appendChild(link);
    }

    return this.addMarkerElement(RestaurantInfoElement, location);
  }

  async checkIfLocExists(place: any, rank: any) {
    if (!place.geometry || !place.geometry.location) return;
    let marker;

    try {
      marker = await this.setMarker(place.name, place.geometry.location, place, rank);
    } catch (e) {
    } finally {
      google.maps.event.addListener(marker!, "click", () => {});
    }
  }

  async insertLocationsIntoLF() {
    try {
      console.log("!!TRYING TO SET LOCATIONS LOCAL", this.locations);
      await localforage.setItem("locations", JSON.stringify(this.locations));

      console.log("success");
    } catch (err) {
      console.log(err);
    }
  }

  makeRequest(newRequest: any) {
    console.log("newRequest", newRequest);

    const service = new google.maps.places.PlacesService(this.map);
    service.nearbySearch(newRequest, (results, status) => {
      console.log("!!!RESULTS", results, status);
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        this.locations = this.calcDistances(results);

        this.insertLocationsIntoLF();

        for (let i = 0; i < this.locations.length; i++) {
          this.checkIfLocExists(this.locations[i], i);
        }

        (this.renderRoot as DocumentFragment).getElementById("map-loading-ui")!.style.display = "none";
      } else {
        (this.renderRoot as DocumentFragment).getElementById("map-loading-ui")!.style.display = "none";
        (this.renderRoot as DocumentFragment).getElementById("map-nonefound-ui")!.style.display = "block";
        this.locations = [];
        this.insertLocationsIntoLF();
      }
    });
  }

  // with chosen transport method, we need to create a radius that will be reachable within that time
  createRadius(time: string, transport: string) {
    if (time === "1hour") {
      // 1hour or above case, it doesnt fucking matter where
      return 9999999;
    }

    let multiplier = 0;

    const AVERAGE_WALK_SPEED = 5.0 * 1000; // m/h
    const AVERAGE_BIKE_SPEED = ((12.8 + 19.3) / 2) * 1000; // m/h
    const AVREAGE_DRIVE_SPEED = 20 * 1000; // m/h

    if (transport === "walking") {
      multiplier = AVERAGE_WALK_SPEED;
    } else if (transport === "biking") {
      multiplier = AVERAGE_BIKE_SPEED;
    } else if (transport === "driving") {
      multiplier = AVREAGE_DRIVE_SPEED;
    }

    const timeByHour = Number(time) / 60;

    return (multiplier * timeByHour) / 2; // Divide by 2 is there AND back
  }

  // 0, 1, 2, 3, 4
  createPriceRange(budget: number): { maxprice: number; minprice: number } {
    if (budget === 1) {
      return {
        maxprice: 0,
        minprice: 0,
      };
    } else if (budget === 2) {
      return {
        maxprice: 1,
        minprice: 0,
      };
    } else if (budget === 3) {
      return {
        maxprice: 2,
        minprice: 0,
      };
    } else if (budget === 4) {
      return {
        maxprice: 3,
        minprice: 0,
      };
    } else {
      return {
        maxprice: 4,
        minprice: 0,
      };
    }
  }

  async gatherPreferences() {
    let request = {};

    try {
      const time: string | null = await localforage.getItem("preference-time");
      const transport = await localforage.getItem("preference-transport");
      request = {
        radius: this.createRadius(time as string, transport as string),
      };

      const categories: string[] | null = await localforage.getItem("preference-categories");
      request = {
        ...request,
        keyword: ((categories as string[]) || []).join(" "),
      };

      const budget: string | null = await localforage.getItem("preference-budget");
      const range = this.createPriceRange(Number(budget as string));
      request = {
        ...request,
        maxprice: range.maxprice,
        minprice: range.minprice,
      };

      // redirect user to /preferences/setup if any of these are null
      if (!time || !transport || !categories || !budget) {
        window.location.href = "/preferences/setup";
        return;
      }

      request = {
        ...request,
        type: "restaurant",
        openNow: true,
        fields: ["ALL"],
        location: this.center,
      };
    } finally {
      this.makeRequest(request);
      this.requestUpdate();
    }
  }

  startApp() {
    this.map.setCenter(this.center);
    this.setMarker("You are here", this.center, null, 0);
    this.gatherPreferences();
  }

  getCurrentPosition() {
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

  async getGeolocation() {
    let geolocation;
    try {
      geolocation = await localforage.getItem("geolocation");
    } finally {
      if (geolocation) {
        this.center = geolocation as Coordinates;
        this.startApp();
        return;
      }

      this.getCurrentPosition();
    }
  }

  firstUpdated(): void {
    // @ts-ignore
    const mapElement: HTMLElement = this.renderRoot.getElementById("map");
    this.map = new google.maps.Map(mapElement, {
      center: { lat: 41, lng: -87 },
      zoom: 15,
      mapId: "4504f8b37365c3d0",
    });
    this.getGeolocation();
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
    // <button class="refresh-button" style="display:none;" @click=${this.getCurrentPosition}>Refresh</button>
    return html`
    <a
    href="/map/list-view"
    class="list-view" style="display:none;">view</a>
    <button class="refresh-button" style="display:none;" @click=${this.getCurrentPosition}>Refresh</button>
    <div style="
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    ">

    <section class="floating-state-ui" id="map-loading-ui">
      <div>
      <h1>Loading...</h1>
      </div>
    </section>

    <section class="floating-state-ui" id="map-nonefound-ui" style="display:none;">
      <div>
      <h1>No places found!</h1>
      <p>Try changing your preferences to be more flexible.</p>
      </div>
    </section>
    
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
