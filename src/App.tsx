// import { useState } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { AcrylicCard, Card, ClickableCard, Title } from "./components/Card";
import FloatingFooter from "./components/FloatingFooter";
import { TextInput } from "./components/Forms";
import Header from "./components/Header";
import MainLayout from "./components/MainLayout";
import SectionHeader from "./components/SectionHeader";
import WidthSpaced from "./components/WidthSpaced";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Header>wow!</Header>
      <div id="acrylic-testing">
        <MainLayout>
          <Button variant="acrylic">Active Button</Button>
          <AcrylicCard>wowo</AcrylicCard>
        </MainLayout>
      </div>
      <SectionHeader>really cool</SectionHeader>
      <MainLayout>
        <div style={{ marginBottom: "1rem" }}>
          <TextInput placeholder="Search..." />
        </div>

        <div style={{ margin: "2rem 0" }}>
          <Button>Normal Button</Button>
          <Button variant="outlined">Outlined Button</Button>
          <Button variant="active">Active Button</Button>
        </div>

        <Card>
          <Title>Normal Card</Title>
          <p>im just some normal text</p>
        </Card>

        <ClickableCard href="https://google.com" target="_blank">
          <WidthSpaced>
            <Title>Clickable Card with Icon</Title>
            <span>➤</span>
          </WidthSpaced>

          <p>0.42 miles away</p>
          <p>5 minute commute time</p>
        </ClickableCard>

        <ClickableCard href="https://google.com" target="_blank" variant="active">
          <WidthSpaced>
            <Title>Active Clickable Card</Title>
            <span>➤</span>
          </WidthSpaced>

          <p>0.42 miles away</p>
          <p>5 minute commute time</p>
        </ClickableCard>
      </MainLayout>
      <FloatingFooter>
        <Button variant="outlined">Back</Button>
        <Button>Next</Button>
      </FloatingFooter>
    </>
  );
}

export default App;
