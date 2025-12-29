"use client";

import { Canvas } from "./Components/Canvas";
import { Container } from "./Components/Container";
import { SideBar } from "./Components/SideBar";
import { TreeNode } from "./Components/TreeNode";

const Home = () => {
  return (
    <>
      <Container>
        <SideBar>
          <TreeNode label="Test" onClick={() => {}} />
        </SideBar>
        <Canvas />
      </Container>
    </>
  );
};
export default Home;
