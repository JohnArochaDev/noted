"use client";

import { Canvas } from "./Components/Canvas";
import { Container } from "./Components/Container";
import { SideBar } from "./Components/SideBar";
import { Folder } from "./Components/Folder";
import { Node } from "./Components/Node";
import { NodeRow } from "./Components/NodeRow";

const Home = () => {
  return (
    <>
      <Container>
        <SideBar>
          <NodeRow>
            <Folder label="Test" />
          </NodeRow>
          <NodeRow>
            <Folder label="Test 2" />
          </NodeRow>
          <NodeRow>
            <Node label="Test Node" />
          </NodeRow>
        </SideBar>
        <Canvas />
      </Container>
    </>
  );
};
export default Home;
