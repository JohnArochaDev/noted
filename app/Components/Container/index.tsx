"use client";

import styes from './styles.module.scss'

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className={styes.button}>{children}</div>;
};
