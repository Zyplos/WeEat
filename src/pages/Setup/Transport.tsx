import { RouterButton, Button } from "../../components/Button";
import FloatingFooter from "../../components/FloatingFooter";
import Header from "../../components/Header";
import MainLayout from "../../components/MainLayout";

// import IntroImage from "../../assets/intro-picture.svg";

export default function TransportPage() {
  return (
    <>
      <Header>
        <h1>Mode of Transport</h1>
      </Header>
      <MainLayout>
        <p>How will you be moving around?</p>
        <Button>Walking</Button>
        <Button>Biking</Button>
        <Button>Driving</Button>
      </MainLayout>
      <FloatingFooter>
        <Button variant="outlined" nospacing>
          Back
        </Button>
        <RouterButton to="/preferences/budget" nospacing>
          Next
        </RouterButton>
      </FloatingFooter>
    </>
  );
}