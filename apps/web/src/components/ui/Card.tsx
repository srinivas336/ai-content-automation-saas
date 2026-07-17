import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950 p-6 shadow-lg">
      {children}
    </div>
  );
}