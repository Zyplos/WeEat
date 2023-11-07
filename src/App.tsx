// import { useState } from "react";
import "./App.css";
import { Card, ClickableCard, Title } from "./components/Card";
import Header from "./components/Header";
import MainLayout from "./components/MainLayout";
import SectionHeader from "./components/SectionHeader";
import WidthSpaced from "./components/WidthSpaced";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Header>wow!</Header>
      <MainLayout>a bunch of stuff here</MainLayout>
      <SectionHeader>really cool</SectionHeader>
      <MainLayout>
        <Card>
          <Title>Normal Card</Title>
          <p>im just some normal text</p>
        </Card>

        <Card>
          <WidthSpaced>
            <Title>Card with Go To Icon</Title>
            <span>➤</span>
          </WidthSpaced>

          <p>0.42 miles away</p>
          <p>5 minute commute time</p>
        </Card>

        <Card variant="active">
          <WidthSpaced>
            <Title>Active Card</Title>
            <span>➤</span>
          </WidthSpaced>

          <p>0.42 miles away</p>
          <p>5 minute commute time</p>
        </Card>

        <ClickableCard href="https://google.com" target="_blank">
          <WidthSpaced>
            <Title>Clickable Card</Title>
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
    </>
  );
}

export default App;
