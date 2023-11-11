import MainLayout from "../../MainLayout";
import SectionHeader from "../../SectionHeader";
import { ClickableCard, Title } from "../../Card";
import WidthSpaced from "../../WidthSpaced";
import { useEffect, useState } from "react";
import localforage from "localforage";
import styles from "./styles.module.css"
import { Link } from "react-router-dom";

const MILES_CONVERSION = .62137119;


const Place = (number: any) => {

    return <span>{number}</span>
}

export default function ListView() {

    const [locations, setLocations] = useState([]);
    const [center, setCenter] = useState({lat: 0, lng: 0});




    useEffect(() => {

        const fetchCenter = async () => {
            try {    
                const geolocation: any = await localforage.getItem("geolocation")

                setCenter(geolocation);

            } catch(err) {
                
            }
        }

        if (center.lat === 0) {
            console.log("fetch")
            fetchCenter();

        }
    }, [center])

    useEffect(() => {

        const fetchLocations = async () => {
            try {
                const data: any = await localforage.getItem("locations")
                const parsedData = JSON.parse(data);
                
                setLocations(parsedData);
            } catch(err) {
                
            }
        }

        if (locations.length === 0) {
            fetchLocations();

        }
    }, [locations])



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
        {locations ? locations.map((location: any, i: number) => {
            const url = `https://www.google.com/maps/search/${location.name}/@${center.lat},${center.lng}`;
            let rank = "";
        // console.log(url);   

        if (i === 0) {
            rank = "gold"
        } else if (i === 1) {
            rank = "silver"
        } else if (i === 2) {
            rank = "bronze"
        }

        
        return <ClickableCard href={url} target="_blank" key={i}>
            {i <= 2 ? <span className={styles["place"] + " " + styles[rank]}>{i+1}</span> : <></>}
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