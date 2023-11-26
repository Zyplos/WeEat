import { RouterButton } from "../../components/Button";
import Header from "../../components/Header";
import MainLayout from "../../components/MainLayout";

// import IntroImage from "../../assets/intro-picture.svg";

const PreferencesIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
    <path d="M520-278q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 97q-14 0-26.5-3.5T430-194q-39-23-82-34.5T260-240q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q47-23 96.5-35.5T260-800q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 101.5 12.5T898-752q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-45 0-88 11.5T530-194q-11 6-23.5 9.5T480-181Zm80-428q0-9 6.5-18.5T581-640q29-10 58-15t61-5q20 0 39.5 2.5T778-651q9 2 15.5 10t6.5 18q0 17-11 25t-28 4q-14-3-29.5-4.5T700-600q-26 0-51 5t-48 13q-18 7-29.5-1T560-609Zm0 220q0-9 6.5-18.5T581-420q29-10 58-15t61-5q20 0 39.5 2.5T778-431q9 2 15.5 10t6.5 18q0 17-11 25t-28 4q-14-3-29.5-4.5T700-380q-26 0-51 4.5T601-363q-18 7-29.5-.5T560-389Zm0-110q0-9 6.5-18.5T581-530q29-10 58-15t61-5q20 0 39.5 2.5T778-541q9 2 15.5 10t6.5 18q0 17-11 25t-28 4q-14-3-29.5-4.5T700-490q-26 0-51 5t-48 13q-18 7-29.5-1T560-499Z" />
  </svg>
);

const TransportIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
    <path d="M480-220v20q0 17-11.5 28.5T440-160q-17 0-28.5-11.5T400-200v-200q0-7 1-14t3-13l42-119q8-24 29-39t47-15h236q26 0 47 15t29 39l42 119q2 6 3 13t1 14v200q0 17-11.5 28.5T840-160q-17 0-28.5-11.5T800-200v-20H480Zm0-240h320l-28-80H508l-28 80Zm40 160q17 0 28.5-11.5T560-340q0-17-11.5-28.5T520-380q-17 0-28.5 11.5T480-340q0 17 11.5 28.5T520-300Zm240 0q17 0 28.5-11.5T800-340q0-17-11.5-28.5T760-380q-17 0-28.5 11.5T720-340q0 17 11.5 28.5T760-300ZM168-160q-14 0-19-12t5-22l46-46q-50 0-85-35t-35-85v-320q0-66 59-93t201-27q148 0 204 26t56 94v40h-80v-40H160v240h200v280H168Zm32-160q17 0 28.5-11.5T240-360q0-17-11.5-28.5T200-400q-17 0-28.5 11.5T160-360q0 17 11.5 28.5T200-320Z" />
  </svg>
);

const BudgetIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760H520q-71 0-115.5 44.5T360-600v240q0 71 44.5 115.5T520-200h320q0 33-23.5 56.5T760-120H200Zm320-160q-33 0-56.5-23.5T440-360v-240q0-33 23.5-56.5T520-680h280q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280H520Zm120-140q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Z" />
  </svg>
);
const TimeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
    <path d="M480-520q66 0 113-47t47-113v-120H320v120q0 66 47 113t113 47ZM200-80q-17 0-28.5-11.5T160-120q0-17 11.5-28.5T200-160h40v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-40q-17 0-28.5-11.5T160-840q0-17 11.5-28.5T200-880h560q17 0 28.5 11.5T800-840q0 17-11.5 28.5T760-800h-40v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h40q17 0 28.5 11.5T800-120q0 17-11.5 28.5T760-80H200Z" />
  </svg>
);

export default function PreferencesIndex() {
  return (
    <>
      <Header>
        <h1>Edit Preferences</h1>
      </Header>
      <MainLayout>
        <p>Change your settings here.</p>
        <RouterButton icon={PreferencesIcon} to="/preferences/categories">
          Food Preferences
        </RouterButton>
        <RouterButton icon={TransportIcon} to="/preferences/transport">
          Mode of Transport
        </RouterButton>
        <RouterButton icon={BudgetIcon} to="/preferences/budget">
          Budget
        </RouterButton>
        <RouterButton icon={TimeIcon} to="/preferences/time">
          Available Time
        </RouterButton>
        <RouterButton to="/map" variant="outlined">
          Back to Map
        </RouterButton>
      </MainLayout>
    </>
  );
}
