import { lighterBackground, lighterTrim } from "@/app/Constants/colors";

export const SideBarStyling = {
  backgroundColor: lighterBackground,
  width: "250px",
  border: `2px solid ${lighterTrim}`,
  display: "flex",
  flexDirection: "column" as const,
};
