import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Card = ({ children }: Props) => {
  return (
    <div className="mt-3 mb-3 xl:flex xl:justify-center">
      <div className="flex flex-col flex-1 max-w-5xl rounded shadow-3xl p-8 gap-5 bg-white">
        {children}
      </div>
    </div>
  );
};
