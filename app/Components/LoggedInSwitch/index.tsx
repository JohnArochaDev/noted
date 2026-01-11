"use client";

import { ReactNode } from "react";

import { useNodes } from "@/app/Context";

type LoggedInSwitchProps = {
  loggedIn: ReactNode;
  loggedOut: ReactNode;
};

export const LoggedInSwitch = ({
  loggedIn,
  loggedOut,
}: LoggedInSwitchProps) => {
  const { userId, isAuthChecking } = useNodes();

  if (isAuthChecking) {
    return (
      <div
        style={{ backgroundColor: "#121113", width: "100%", height: "100%" }}
      />
    );
  }

  return <>{userId ? loggedIn : loggedOut}</>;
};
