import React, { useEffect, useState } from "react";
import { createComponent } from "@lit/react";
import { MapComponent as MapComponentWC } from "./Map-component";
import styles from "./styles.module.css";
import { RouterButton } from "../../components/Button";
import { Member } from "../../model/model";
import image1 from "../../assets/images/people/image1.png";
import image2 from "../../assets/images/people/image2.png";
import image3 from "../../assets/images/people/image3.png";
import image4 from "../../assets/images/people/image4.png";
import image5 from "../../assets/images/people/image5.png";
import image6 from "../../assets/images/people/image6.png";

export default function Map() {
  const MapComponent = createComponent({
    tagName: "map-component",
    elementClass: MapComponentWC,
    react: React,
  });

  // members
  const [members, setMembers] = useState();

  useEffect(() => {
    const storedMembers = localStorage.getItem("members")!;

    if (storedMembers) {
      setMembers(JSON.parse(storedMembers));
    }
  }, []);

  console.log(members);

  const getImg = (imgName: string, key: number) => {
    if (imgName === "image1") {
      return <img src={image1} key={String(key)} />;
    } else if (imgName === "image2") {
      return <img src={image2} key={String(key)} />;
    } else if (imgName === "image3") {
      return <img src={image3} key={String(key)} />;
    } else if (imgName === "image4") {
      return <img src={image4} key={String(key)} />;
    } else if (imgName === "image5") {
      return <img src={image5} key={String(key)} />;
    } else if (imgName === "image6") {
      return <img src={image6} key={String(key)} />;
    }
  };

  return (
    <div className={styles["relative"]}>
      <MapComponent></MapComponent>
      <div id={styles["group-members"]} className={styles[!members ? "remove" : ""]}>
        {members?.map((member: Member, i: number) => {
          return getImg(member.img, i);
        })}
      </div>
      <div id={styles["map-group-button"]}>
        <RouterButton to="/groups/create/profile" variant="acrylic" nospacing>
          Groups
        </RouterButton>
      </div>
      <div id={styles["map-button-edit-preferences"]}>
        <RouterButton to="/preferences" variant="acrylic" nospacing>
          Preferences
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
