"use client";

import { Canvas } from "./Components/Canvas";
import { Container } from "./Components/Container";
import { SideBar } from "./Components/SideBar";
import { TreeFolder } from "./Components/SideBar/Folder";
import { Folder } from "./Constants/types";

import data from "./Constants/treeNodeData.json";

const Home = () => {
  return (
    <>
      <Container>
        <SideBar>
          <TreeFolder folderData={data[0] as Folder} />
        </SideBar>
        <Canvas />
      </Container>
    </>
  );
};
export default Home;
