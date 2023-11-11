import { useState } from "react";
import { RouterButton, Button } from "../../components/Button";
import FloatingFooter from "../../components/FloatingFooter";
import Header from "../../components/Header";
import MainLayout from "../../components/MainLayout";
import localforage from "localforage";

// import IntroImage from "../../assets/intro-picture.svg";

export default function TimePage() {
  const [current, setCurrent] = useState<string | null>(null);

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

  async function handleClick(arg: string) {
    try {
      await localforage.setItem("preference-time", arg).then(console.log);
      setCurrent(arg);
    } catch (error) {
      console.error("couldn't save setting", error);
    }
  }

  return (
    <>
      <Header>
        <h1>Available Time</h1>
      </Header>
      <MainLayout>
        <p>How much time should it take to get food and come back?</p>
        {Object.entries(options).map(([value, label]) => (
          <Button key={value} onClick={() => handleClick(value)} variant={current == value ? "active" : undefined}>
            {label}
          </Button>
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
