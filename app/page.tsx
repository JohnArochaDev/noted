"use client";

import { Canvas } from "./Components/Canvas";
import { Container } from "./Components/Container";
import { SideBar } from "./Components/SideBar";
import { Folder } from "./Components/Folder";
import { Node } from "./Components/Node";

const Home = () => {
  return (
    <>
      <Container>
        <SideBar>
          <Folder label="Test" />
          <Folder label="Test2" />
          <Node label="Test Node" />
        </SideBar>
        <Canvas />
      </Container>
    </>
  );
};
export default Home;
