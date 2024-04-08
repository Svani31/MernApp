"use client"
import { SessionProvider } from "next-auth/react";

function Provider({ children }:any) {
  return <SessionProvider session={children}>{children}</SessionProvider>;
}

export default Provider;
