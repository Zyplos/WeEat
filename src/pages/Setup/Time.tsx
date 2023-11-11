import { RouterButton, Button } from "../../components/Button";
import FloatingFooter from "../../components/FloatingFooter";
import Header from "../../components/Header";
import MainLayout from "../../components/MainLayout";

// import IntroImage from "../../assets/intro-picture.svg";

export default function TimePage() {
  const options = {
    "5": "5 minutes",
    "10": "10 minutes",
    "15": "15 minutes",
    "20": "20 minutes",
    "25": "25 minutes",
    "30": "30 minutes",
    "35": "35 minutes",
    "40": "40 minutes",
    "45": "45 minutes",
    "50": "50 minutes",
    "55": "55 minutes",
    "1hour": "1 hour or more",
  };

  return (
    <>
      <Header>
        <h1>Food Preferences</h1>
      </Header>
      <MainLayout>
        <p>How much time should it take to get food and come back?</p>
        {Object.entries(options).map(([value, label]) => (
          <div key={value}>
            <input type="radio" id={value} name="budget" value={value} />
            <label htmlFor={value}>{label}</label>
          </div>
        ))}
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
