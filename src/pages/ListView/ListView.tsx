import MainLayout from "../../components/MainLayout";
import { ClickableCard, Title } from "../../components/Card";
import WidthSpaced from "../../components/WidthSpaced";
import { useEffect, useState } from "react";
import localforage from "localforage";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { RouterButton } from "../../components/Button";

// const MILES_CONVERSION = 0.62137119;

export default function ListView() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data: any = await localforage.getItem("locations");
        const parsedData = JSON.parse(data);

        setLocations(parsedData);
      } catch (err) {}
    };
    fetchLocations();
  }, []);

  console.log("!!!locations ", locations);

  return (
    <>
      <Header>
        <Link to="/map" className={styles["back-button"]}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </Link>
        <h1>Choose a Place!</h1>
      </Header>
      <MainLayout>
        {locations.length > 0 && <p>Choose the place you'd like to go to.</p>}
        {locations
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            locations.map((location: any) => {
              return (
                <ClickableCard href="https://google.com" target="_blank" key={location.vicinity}>
                  <WidthSpaced>
                    <Title>{location.name}</Title>
                    <span>➤</span>
                  </WidthSpaced>

                  <p>{location.distance.toFixed(2) + " km"}</p>
                  <p>5 minute commute time</p>
                </ClickableCard>
              );
            })
          : ""}

        {locations.length == 0 && (
          <>
            <h2>No places found.</h2>
            <p>Looks like your specific preferences did not turn up any places. Try changing your preferences to be more lax to find some places.</p>
            <RouterButton to="/preferences">Change Preferences</RouterButton>
          </>
        )}
      </MainLayout>
    </>
  );
}
