/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { Styles } from "./styles";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <div css={css(Styles)}>{children}</div>;
};
