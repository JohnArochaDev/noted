"use client";

import { ReactFlowProvider } from "@xyflow/react";

import { Canvas } from "./Components/Canvas";
import { Container } from "./Components/Container";
import { HotBar } from "./Components/HotBar";
import { LoggedInSwitch } from "./Components/LoggedInSwitch";
import { LoginPage } from "./Components/Login";
import { SideBar } from "./Components/SideBar";
import { TreeBuilder } from "./Components/SideBar/TreeBuilder";
import { ToastProvider } from "./Components/Toast";
import { NodeProvider } from "./Context";
import styles from "./styles.module.scss";

const Home = () => {
  return (
    <div className={styles.pageWrapper}>
      <NodeProvider>
        <ToastProvider>
          <LoggedInSwitch
            loggedIn={
              <>
                <HotBar />
                <Container>
                  <SideBar>
                    <TreeBuilder />
                  </SideBar>
                  <ReactFlowProvider>
                    {" "}
                    <Canvas />
                  </ReactFlowProvider>
                </Container>
              </>
            }
            loggedOut={<LoginPage />}
          />
        </ToastProvider>
      </NodeProvider>
    </div>
  );
};

export default Home;
