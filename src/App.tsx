// import { useState } from "react";
import "./App.css";
import { Card, ClickableCard } from "./components/Card";
import CardTitle from "./components/CardTitle";
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
          <CardTitle>Normal Card</CardTitle>
          <p>im just some normal text</p>
        </Card>

        <Card>
          <WidthSpaced>
            <CardTitle>Card with Go To Icon</CardTitle>
            <span>➤</span>
          </WidthSpaced>

          <p>0.42 miles away</p>
          <p>5 minute commute time</p>
        </Card>

        <Card variant="active">
          <WidthSpaced>
            <CardTitle>Active Card</CardTitle>
            <span>➤</span>
          </WidthSpaced>

          <p>0.42 miles away</p>
          <p>5 minute commute time</p>
        </Card>

        <ClickableCard href="https://google.com" target="_blank">
          <WidthSpaced>
            <CardTitle>Clickable Card</CardTitle>
            <span>➤</span>
          </WidthSpaced>

          <p>0.42 miles away</p>
          <p>5 minute commute time</p>
        </ClickableCard>

        <ClickableCard href="https://google.com" target="_blank" variant="active">
          <WidthSpaced>
            <CardTitle>Active Clickable Card</CardTitle>
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
