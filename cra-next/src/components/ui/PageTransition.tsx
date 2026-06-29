import { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  return <div className="page-fade">{children}</div>;
}
