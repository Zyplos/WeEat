import React, { useCallback, useEffect, useState } from "react";
import { createComponent } from "@lit/react";
import {MapComponent as MapComponentWC} from "./Map-component"
import styles from "./styles.module.css"

export default function Map() {
    const MapComponent = createComponent({
       tagName: 'map-component',
       elementClass: MapComponentWC,
       react: React,
     });

    return <div className={styles["relative"]}>
  <MapComponent>
    </MapComponent>
    </div>
}

