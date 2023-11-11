import { useState } from "react";
import { RouterButton, Button } from "../../components/Button";
import FloatingFooter from "../../components/FloatingFooter";
import Header from "../../components/Header";
import MainLayout from "../../components/MainLayout";
import localforage from "localforage";
import { useNavigate } from "react-router-dom";

export default function BudgetPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState<string | null>(null);
  const isSetupDone = localStorage.getItem("setup-done") == "true";

  const options = {
    "1": "$10 or less",
    "2": "$20 or less",
    "3": "$30 or less",
    "4": "$40 or less",
    "5": "$50 or less",
    "100": "$100 or less",
    "100+": "Over $100",
  };

  async function handleClick(arg: string) {
    try {
      await localforage.setItem("preference-budget", arg);
      setCurrent(arg);
    } catch (error) {
      console.error("couldn't save setting", error);
    }
  }

  return (
    <>
      <Header>
        <h1>Budget</h1>
      </Header>
      <MainLayout>
        <p>How much do you want to spend?</p>
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
            <RouterButton to="/preferences/time" nospacing>
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
