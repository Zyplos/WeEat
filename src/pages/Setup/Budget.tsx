import { RouterButton, Button } from "../../components/Button";
import FloatingFooter from "../../components/FloatingFooter";
import { TextInput } from "../../components/Forms";
import Header from "../../components/Header";
import MainLayout from "../../components/MainLayout";

// import IntroImage from "../../assets/intro-picture.svg";

export default function BudgetPage() {
  return (
    <>
      <Header>
        <h1>Budget</h1>
      </Header>
      <MainLayout>
        <p>How much do you want to spend?</p>
        <TextInput placeholder="Search..." />
        <Button>Walking</Button>
        <Button>Biking</Button>
        <Button>Driving</Button>
      </MainLayout>
      <FloatingFooter>
        <Button variant="outlined" nospacing>
          Back
        </Button>
        <RouterButton to="/preferences/transport" nospacing>
          Next
        </RouterButton>
      </FloatingFooter>
    </>
  );
}
