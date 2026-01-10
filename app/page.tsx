"use client";

import { Suspense, useEffect } from "react";

import { ReactFlowProvider } from "@xyflow/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // removes all search params on page refresh
  useEffect(() => {
    if (searchParams.size > 0) {
      router.replace(pathname, { scroll: false });
    }
  }, [searchParams, pathname, router]); // ← Added dependencies to satisfy ESLint

  return (
    <div className={styles.pageWrapper}>
      <Suspense fallback={<></>}>
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
      </Suspense>
    </div>
  );
};

export default Home;
