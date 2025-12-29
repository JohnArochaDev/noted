"use client";

import { Canvas } from "./Components/Canvas";
import { Container } from "./Components/Container";
import { SideBar } from "./Components/SideBar";

const Home = () => {
  return (
    <>
      <Container>
        <SideBar />
        <Canvas />
      </Container>
    </>
  );
};
export default Home;
