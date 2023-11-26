import { useEffect, useState } from "react";
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

  useEffect(() => {
    localforage.getItem("preference-transport").then((value) => setCurrent(value as string));
  }, []);

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

  const icons = {
    walking: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
        <path d="M436-364 371-72q-3 14-14.5 23T330-40q-20 0-32-15t-8-34l102-515-72 28v96q0 17-11.5 28.5T280-440q-17 0-28.5-11.5T240-480v-122q0-12 6.5-21.5T264-638l178-76q14-6 29.5-7t29.5 4q14 5 26.5 14t20.5 23l40 64q13 20 30.5 38t39.5 31q14 8 31 14.5t34 9.5q16 3 26.5 14.5T760-480q0 17-12 28t-29 9q-56-8-100.5-35T541-543l-25 123 72 68q6 6 9 13.5t3 15.5v243q0 17-11.5 28.5T560-40q-17 0-28.5-11.5T520-80v-220l-84-64Zm104-376q-33 0-56.5-23.5T460-820q0-33 23.5-56.5T540-900q33 0 56.5 23.5T620-820q0 33-23.5 56.5T540-740Z" />
      </svg>
    ),
    biking: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
        <path d="M620-740q-33 0-56.5-23.5T540-820q0-33 23.5-56.5T620-900q33 0 56.5 23.5T700-820q0 33-23.5 56.5T620-740ZM432-540l66 69q11 11 16.5 25t5.5 30v176q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-160L312-512q-14-12-19-25t-5-31q0-18 5.5-30.5T312-624l112-112q13-13 27.5-18.5T484-760q18 0 32.5 5.5T544-736l76 76q21 21 47 35.5t58 20.5q17 3 28 15t11 29q0 17-12 28t-29 9q-49-7-90-28t-73-53l-32-32-96 96Zm-232 60q85 0 142.5 57.5T400-280q0 85-57.5 142.5T200-80q-85 0-142.5-57.5T0-280q0-85 57.5-142.5T200-480Zm0 340q57 0 98.5-41.5T340-280q0-57-41.5-98.5T200-420q-57 0-98.5 41.5T60-280q0 57 41.5 98.5T200-140Zm560-340q85 0 142.5 57.5T960-280q0 85-57.5 142.5T760-80q-85 0-142.5-57.5T560-280q0-85 57.5-142.5T760-480Zm0 340q57 0 98.5-41.5T900-280q0-57-41.5-98.5T760-420q-57 0-98.5 41.5T620-280q0 57 41.5 98.5T760-140Z" />
      </svg>
    ),
    driving: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
        <path d="M240-200v20q0 25-17.5 42.5T180-120q-25 0-42.5-17.5T120-180v-286q0-7 1-14t3-13l75-213q8-24 29-39t47-15h410q26 0 47 15t29 39l75 213q2 6 3 13t1 14v286q0 25-17.5 42.5T780-120q-25 0-42.5-17.5T720-180v-20H240Zm-8-360h496l-42-120H274l-42 120Zm68 240q25 0 42.5-17.5T360-380q0-25-17.5-42.5T300-440q-25 0-42.5 17.5T240-380q0 25 17.5 42.5T300-320Zm360 0q25 0 42.5-17.5T720-380q0-25-17.5-42.5T660-440q-25 0-42.5 17.5T600-380q0 25 17.5 42.5T660-320Z" />
      </svg>
    ),
  };

  return (
    <>
      <Header>
        <h1>Mode of Transport</h1>
      </Header>
      <MainLayout>
        <p>How will you be moving around?</p>
        {Object.entries(options).map(([value, label]) => (
          <Button key={value} icon={icons[value as keyof typeof icons]} onClick={() => handleClick(value)} variant={current == value ? "active" : undefined}>
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
