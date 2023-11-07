// import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
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
          <CardTitle>I'm a title</CardTitle>
          <p>im just some normal text</p>
        </Card>

        <Card>
          <WidthSpaced>
            <CardTitle>Five Guys</CardTitle>
            <span>➤</span>
          </WidthSpaced>

          <p>0.42 miles away</p>
          <p>5 minute commute time</p>
        </Card>
      </MainLayout>
    </>
  );
}

export default App;
