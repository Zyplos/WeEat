import MainLayout from "../../components/MainLayout";
import { Card, ClickableCard, Title } from "../../components/Card";
import WidthSpaced from "../../components/WidthSpaced";
import { useEffect, useState } from "react";
import localforage from "localforage";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { Button, RouterButton } from "../../components/Button";
import { Member } from "../../model/model";
import image1 from "../../assets/images/people/image1.png";
import image2 from "../../assets/images/people/image2.png";
import image3 from "../../assets/images/people/image3.png";
import image4 from "../../assets/images/people/image4.png";
import image5 from "../../assets/images/people/image5.png";
import image6 from "../../assets/images/people/image6.png";
import FloatingFooter from "../../components/FloatingFooter";
import { Coordinates } from "../Map/Map-component";

// const MILES_CONVERSION = 0.62137119;

interface GroupsData {
  infoParagraph: string;
  voteButton: boolean;
  members: Member[];
}

const CompassSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
    <path d="M400-480h140v52q0 14 12 19t22-5l78-78q12-12 12-28t-12-28l-78-78q-10-10-22-5t-12 19v52H360q-17 0-28.5 11.5T320-520v120q0 17 11.5 28.5T360-360q17 0 28.5-11.5T400-400v-80Zm80 400q-15 0-29.5-6T424-104L104-424q-12-12-18-26.5T80-480q0-15 6-29.5t18-26.5l320-320q12-12 26.5-18t29.5-6q15 0 29.5 6t26.5 18l320 320q12 12 18 26.5t6 29.5q0 15-6 29.5T856-424L536-104q-12 12-26.5 18T480-80Z" />
  </svg>
);

const VoteSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
    <path d="M200-80q-33 0-56.5-23.5T120-160v-182l110-125 57 57-80 90h546l-78-88 57-57 108 123v182q0 33-23.5 56.5T760-80H200Zm224-304L285-525q-23-23-23-57t23-57l196-196q23-23 57-23t57 23l141 139q23 23 23.5 56.5T737-583L537-383q-23 23-56.5 22.5T424-384Zm256-256L538-780 340-582l142 140 198-198Z" />
  </svg>
);

const settingsIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
    <path d="M480-120q-17 0-28.5-11.5T440-160v-160q0-17 11.5-28.5T480-360q17 0 28.5 11.5T520-320v40h280q17 0 28.5 11.5T840-240q0 17-11.5 28.5T800-200H520v40q0 17-11.5 28.5T480-120Zm-320-80q-17 0-28.5-11.5T120-240q0-17 11.5-28.5T160-280h160q17 0 28.5 11.5T360-240q0 17-11.5 28.5T320-200H160Zm160-160q-17 0-28.5-11.5T280-400v-40H160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h120v-40q0-17 11.5-28.5T320-600q17 0 28.5 11.5T360-560v160q0 17-11.5 28.5T320-360Zm160-80q-17 0-28.5-11.5T440-480q0-17 11.5-28.5T480-520h320q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H480Zm160-160q-17 0-28.5-11.5T600-640v-160q0-17 11.5-28.5T640-840q17 0 28.5 11.5T680-800v40h120q17 0 28.5 11.5T840-720q0 17-11.5 28.5T800-680H680v40q0 17-11.5 28.5T640-600Zm-480-80q-17 0-28.5-11.5T120-720q0-17 11.5-28.5T160-760h320q17 0 28.5 11.5T520-720q0 17-11.5 28.5T480-680H160Z" />
  </svg>
);

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

function sortMe(a: any, b: any) {
  return b.voteCount - a.voteCount;
}

export default function ListView() {
  const [locations, setLocations] = useState([]);
  const [groupsData, setGroupsData] = useState<GroupsData>();
  const [locationReorder, setLocationsReorder] = useState<Boolean>(false);
  const [onMount, setOnMount] = useState<Boolean>(false);
  const [center, setCenter] = useState({lat: 0, lng: 0})


  useEffect(() => {
    if (onMount) return;
  }, [locations]);
  
  // once you make vote, reorder locations based on vote
  useEffect(() => {
    if (!locationReorder) return;
    
    locations.forEach((location: any) => location.voteCount = 0);
    
    locations.forEach((location: any) => {
      groupsData?.members.forEach((member: Member) => {
        if (member.vote?.vicinity === location.vicinity) {
          location.voteCount+=1;
        }
      }) 
    });
    locations.sort(sortMe)
    
    localforage.setItem("locations", JSON.stringify(locations));
    setLocations([...locations])
    setLocationsReorder(false)
    
  }, [groupsData])
  
  useEffect(() => {
    const fetchLocations = async () => {
      let locationParsedData: any;
      try {
        const data: any = await localforage.getItem("locations");
         locationParsedData = JSON.parse(data || []);
        
        setLocations(locationParsedData);
      } catch (err) {} finally {
        const localmembers = localStorage.getItem("members");
        if (!localmembers) return;
    
    
        const members = JSON.parse(localmembers);
    
        const dirty = localStorage.getItem("dirty");
        if (dirty !== "true") {
          // we must map the location vote to the actual location
          members.forEach((member: Member) => {
            member.vote = locationParsedData[member.vote - 1];
          });
        }
    
        if (members) {
          setGroupsData({
            infoParagraph: "Everyone else is also choosing",
            voteButton: true,
            members: members,
          });
        }
      }

      
      
    };
    fetchLocations();
    
    
    
  }, []);
  
  useEffect(() => {
    const fetchGeolocation = async () => {
      const geolocation: Coordinates = (await localforage.getItem("geolocation") as Coordinates)
      setCenter(geolocation)
    }
    fetchGeolocation()
  },[])
  
  const getPlace = (place: number): string => {
    if (place === 1) {
      return "gold";
    } else if (place === 2) {
      return "silver";
    } else if (place === 3) {
      return "bronze";
    }

    return "";
  };

  const hasYourVote = (location: any) => {
    const name = localStorage.getItem("name")!;

    let yourVote = false;
    groupsData?.members.forEach((member: Member) => {
      if (name === member.name && 
      member.vote?.vicinity === location.vicinity) {
        yourVote = true;
      } 
    });

    return yourVote;
  }
  return (
    <>
      <Header>
        <h1>Choose a Place!</h1>
      </Header>
      <MainLayout>
        {locations.length > 0 && <p>Choose the place you'd like to go to.</p>}
        {localStorage.getItem("members") && <p>Everyone in your group is also choosing!</p>}
        {locations.length > 0 && (
          <>
            <p>You can also edit your preferences if you'd like.</p>
            <RouterButton to="/preferences">Edit Preferences</RouterButton>
          </>
        )}

        {locations
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            locations.map((location: any, place: number) => {
              place += 1;
              return (
                <>
                  <Card key={location.vicinity}>
                    {place <= 3 ? <span className={styles["place"] + " " + styles[getPlace(place)]}>{place}</span> : ""}
                    <WidthSpaced>
                      <Title>{location.name}</Title>
                    </WidthSpaced>
                    <p>{location.distance.toFixed(2) + " km"}</p>
                    <p>5 minute commute time</p>
                    {groupsData ? (
                      <div className={styles["mb-m"]}>
                        {groupsData.members.map((member: Member, i: number) => {
                          return member.vote?.vicinity === location.vicinity ? getImg(member.img, i) : <></>;
                        })}
                      </div>
                    ) : (
                      <></>
                    )}
                    <div style={{ marginTop: "var(--space-l)" }}>
                      <WidthSpaced>
                        {groupsData?.voteButton ? (
                          <Button
                            variant={hasYourVote(location) ? "disabled" : "dark"}
                            onClick={() => {
                              const name = localStorage.getItem("name")!;

                              groupsData.members.forEach((member: Member) => {
                                if (member.name === name) {
                                  member.vote = location;
                                  location.voteCount = 1;
                                }

                              });
                              localStorage.setItem("dirty", "true");
                              localStorage.setItem("members", JSON.stringify(groupsData.members))

                              setGroupsData(structuredClone(groupsData));
                              setLocationsReorder(true);
                            }}
                            nospacing
                            icon={VoteSvg}
                          >
                            Vote
                          </Button>
                        ) : (
                          ""
                        )}
                        <Button
                          variant="dark"
                          onClick={() => {
                            console.log(center)
                            const link = `https://www.google.com/maps/dir/${center.lat},${center.lng}/${location.name},${location.vicinity}`;

                            window.open(link, "_blank");
                          }}
                          nospacing
                          icon={CompassSvg}
                        >
                          Directions
                        </Button>
                      </WidthSpaced>
                    </div>
                  </Card>

                  {place === 3 ? <p className={styles["other"]}>Other Options</p> : <></>}
                </>
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
      <FloatingFooter>
        <RouterButton to="/map" variant="outlined">
          Back to Map
        </RouterButton>
      </FloatingFooter>
    </>
  );
}
