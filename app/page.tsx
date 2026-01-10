"use client";

import { Suspense } from "react";

import { ReactFlowProvider } from "@xyflow/react";

import { Canvas } from "./Components/Canvas";
import { Container } from "./Components/Container";
import { HotBar } from "./Components/HotBar";
import { LoggedInSwitch } from "./Components/LoggedInSwitch";
import { LoginPage } from "./Components/Login";
import { SearchParamsHandler } from "./Components/SearchParamsHandler";
import { SideBar } from "./Components/SideBar";
import { TreeBuilder } from "./Components/SideBar/TreeBuilder";
import { ToastProvider } from "./Components/Toast";
import { NodeProvider } from "./Context";
import styles from "./styles.module.scss";

const Home = () => {
  return (
    <div className={styles.pageWrapper}>
      <Suspense fallback={<div>Loading...</div>}>
        {" "}
        <SearchParamsHandler />
      </Suspense>
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
