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
  const { userId } = useNodes();

  return <>{userId ? loggedIn : loggedOut}</>;
};
