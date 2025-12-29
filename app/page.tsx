"use client";

import { Canvas } from "./Components/Canvas";
import { Container } from "./Components/Container";
import { SideBar } from "./Components/SideBar";
import { FolderNode } from "./Components/FolderNode";

const Home = () => {
  return (
    <>
      <Container>
        <SideBar>
          <FolderNode label="Test" />
        </SideBar>
        <Canvas />
      </Container>
    </>
  );
};
export default Home;
