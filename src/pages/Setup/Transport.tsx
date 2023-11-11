import { useState } from "react";
import { RouterButton, Button } from "../../components/Button";
import FloatingFooter from "../../components/FloatingFooter";
import Header from "../../components/Header";
import MainLayout from "../../components/MainLayout";
import localforage from "localforage";
import { useNavigate } from "react-router-dom";

export default function TransportPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState<string | null>(null);
  const isSetupDone = localStorage.getItem("setup-done") == "true";

  async function handleClick(arg: string) {
    try {
      await localforage.setItem("preference-transport", arg);
      setCurrent(arg);
    } catch (error) {
      console.error("couldn't save setting", error);
    }
  }

  const options = {
    walking: "Walking",
    biking: "Biking",
    driving: "Driving",
  };

  return (
    <>
      <Header>
        <h1>Mode of Transport</h1>
      </Header>
      <MainLayout>
        <p>How will you be moving around?</p>
        {Object.entries(options).map(([value, label]) => (
          <Button key={value} onClick={() => handleClick(value)} variant={current == value ? "active" : undefined}>
            {label}
          </Button>
        ))}
      </MainLayout>
      <FloatingFooter>
        {!isSetupDone && (
          <>
            <Button onClick={() => navigate(-1)} variant="outlined" nospacing>
              Back
            </Button>
            <RouterButton to="/preferences/budget" nospacing>
              Next
            </RouterButton>
          </>
        )}
        {isSetupDone && (
          <RouterButton to="/preferences" variant="outlined" nospacing>
            Back
          </RouterButton>
        )}
      </FloatingFooter>
    </>
  );
}
