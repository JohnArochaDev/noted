"use client";

import { Canvas } from "./Components/Canvas";
import { Container } from "./Components/Container";
import { SideBar } from "./Components/SideBar";
import { TreeBuilder } from "./Components/SideBar/TreeBuilder";

import data from './Constants/treeNodeData.json'
import { Folder } from "./Constants/types";

const Home = () => {
  
  return (
    <>
      <Container>
        <SideBar>
          <TreeBuilder data={data as Folder[]} />
        </SideBar>
        <Canvas />
      </Container>
    </>
  );
};
export default Home;
