"use client";

import { Canvas } from "./Components/Canvas";
import { Container } from "./Components/Container";
import { HotBar } from "./Components/HotBar";
import { LoggedInSwitch } from "./Components/LoggedInSwitch";
import { LoginPage } from "./Components/Login";
import { SideBar } from "./Components/SideBar";
import { TreeBuilder } from "./Components/SideBar/TreeBuilder";
import { NodeProvider } from "./Context";
import styles from "./styles.module.scss";

const Home = () => {
  return (
    <div className={styles.pageWrapper}>
      <NodeProvider>
        <LoggedInSwitch
          loggedIn={
            <>
              <HotBar />
              <Container>
                <SideBar>
                  <TreeBuilder />
                </SideBar>
                <Canvas />
              </Container>
            </>
          }
          loggedOut={<LoginPage />}
        />
      </NodeProvider>
    </div>
  );
};

export default Home;
