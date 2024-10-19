import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};
