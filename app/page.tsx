"use client";

import { Canvas } from "./Components/Canvas";
import { Container } from "./Components/Container";
import { HotBar } from "./Components/HotBar";
import { SideBar } from "./Components/SideBar";
import { TreeBuilder } from "./Components/SideBar/TreeBuilder";
import data from "./Constants/treeNodeData.json";
import { RootFolder } from "./Constants/types";
import { NodeProvider } from "./Context";
import styles from "./styles.module.scss";

const Home = () => {
  return (
    <div className={styles.pageWrapper}>
      <NodeProvider>
        <HotBar />
        <Container>
          <SideBar>
            <TreeBuilder data={data as RootFolder[]} />
          </SideBar>
          <Canvas />
        </Container>
      </NodeProvider>
    </div>
  );
};

export default Home;
