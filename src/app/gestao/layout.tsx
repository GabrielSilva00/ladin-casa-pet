import { ReactNode } from "react";

export default function GestaoLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-creme2/40">{children}</div>;
}
