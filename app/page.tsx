"use client";

import { Canvas } from "./Components/Canvas";
import { Container } from "./Components/Container";
import { SideBar } from "./Components/SideBar";
import { Button } from "./Components/Button";

const Home = () => {
  return (
    <>
      <Container>
        <SideBar>
          <Button label="Test" onClick={() => {}} />
        </SideBar>
        <Canvas />
      </Container>
    </>
  );
};
export default Home;
