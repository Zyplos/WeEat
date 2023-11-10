import MainLayout from "../../MainLayout";
import SectionHeader from "../../SectionHeader";
import { ClickableCard, Title } from "../../Card";
import WidthSpaced from "../../WidthSpaced";
import { useEffect, useState } from "react";
import localforage from "localforage";
import styles from "./styles.module.css"
import { Link } from "react-router-dom";

const MILES_CONVERSION = .62137119;

export default function ListView() {

    const [locations, setLocations] = useState([]);



    useEffect(() => {

        const fetchLocations = async () => {
            try {
                const data: any = await localforage.getItem("locations")
                const parsedData = JSON.parse(data);
                
                setLocations(parsedData);
            } catch(err) {

            }
        }
        fetchLocations();
    })



    return  <>
    <SectionHeader center>
        <Link to="/map" className={styles["flip"]}>➤</Link>
        Choose a Place!
    </SectionHeader>
    <MainLayout>
        <Title>
            Chooe the place you'd like to go to.
            Everyone in your group is also choosing!
        </Title>
        {locations ? locations.map((location: any) => {
        return <ClickableCard href="https://google.com" target="_blank">
          <WidthSpaced>
            <Title>{location.name}</Title>
            <span>➤</span>
          </WidthSpaced>

          <p>{location.distance.toFixed(2) + " km"}</p>
          <p>5 minute commute time</p>
        </ClickableCard>
        }) : ""}
    </MainLayout>
    </>
}