"use client";

import { Canvas } from "./Components/Canvas";
import { Container } from "./Components/Container";
import { SideBar } from "./Components/SideBar";
import { RootFolder } from "./Constants/types";

import data from "./Constants/treeNodeData.json";
import { TreeBuilder } from "./Components/SideBar/TreeBuilder";

const Home = () => {
  return (
    <>
      <Container>
        <SideBar>
          <TreeBuilder  data={data as RootFolder[]} />
        </SideBar>
        <Canvas />
      </Container>
    </>
  );
};
export default Home;
