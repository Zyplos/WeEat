import { RouterButton } from "../../components/Button";
import Header from "../../components/Header";
import MainLayout from "../../components/MainLayout";

// import IntroImage from "../../assets/intro-picture.svg";

export default function PreferencesIndex() {
  return (
    <>
      <Header>
        <h1>Edit Preferences</h1>
      </Header>
      <MainLayout>
        <p>Change your settings here.</p>
        <RouterButton to="/preferences/categories">Food Preferences</RouterButton>
        <RouterButton to="/preferences/transport">Mode of Transport</RouterButton>
        <RouterButton to="/preferences/categories">Budget</RouterButton>
        <RouterButton to="/preferences/time">Available Time</RouterButton>
        <RouterButton to="/map" variant="outlined">
          Back to Map
        </RouterButton>
      </MainLayout>
    </>
  );
}
