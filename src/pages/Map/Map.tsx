import React from "react";
import { createComponent } from "@lit/react";
import { MapComponent as MapComponentWC } from "./Map-component";
import styles from "./styles.module.css";
import { RouterButton } from "../../components/Button";

export default function Map() {
  const MapComponent = createComponent({
    tagName: "map-component",
    elementClass: MapComponentWC,
    react: React,
  });

  return (
    <div className={styles["relative"]}>
      <MapComponent></MapComponent>
      <div id={styles["map-group-button"]}>
        <RouterButton to="/groups/create/profile" variant="acrylic" nospacing>
          Groups
        </RouterButton>
      </div>
      <div id={styles["map-button-edit-preferences"]}>
        <RouterButton to="/preferences" variant="acrylic" nospacing>
          Edit Preferences
        </RouterButton>
      </div>
      <div id={styles["map-button-list-view"]}>
        <RouterButton to="/map/list-view" variant="acrylic" nospacing>
          View as List
        </RouterButton>
      </div>
    </div>
  );
}
