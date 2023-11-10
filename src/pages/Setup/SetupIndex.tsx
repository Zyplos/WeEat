import { Link } from "react-router-dom";
// import { Button } from "../../components/Button";
import MainLayout from "../../components/MainLayout";

// import IntroImage from "../../assets/intro-picture.svg";

export default function SetupIndex() {
  return (
    <>
      <MainLayout>
        <h1>Welcome to WeEat!</h1>
        <p>Looking for something to eat? On a budget? Short on time?</p>
        <p>WeEat has you covered! Find places nearby based on what you are hungry for.</p>
        <p>We will pick places for you or your group to go to within whatever time you have for breakfast, lunch, or dinner.</p>
        <Link to="/preferences/categories">Get Started!</Link>
      </MainLayout>
    </>
  );
}
