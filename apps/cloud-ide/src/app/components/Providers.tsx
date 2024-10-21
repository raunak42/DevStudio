"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import { RecoilRoot } from "recoil";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <RecoilRoot>
      <ClerkProvider>
        <main>{children}</main>
      </ClerkProvider>
    </RecoilRoot>
  );
};
