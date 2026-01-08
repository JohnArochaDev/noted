import { JSX } from "react";

import { useNodes } from "@/app/Context";

type LoggedInSwitch = {
  loggedIn: JSX.Element;
};

export const LoggedInSwitch = () => {
  const { userId } = useNodes();
};
