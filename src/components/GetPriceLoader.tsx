import { Loader } from "./Loader";

interface Props {
  text: string;
}

export const GetPriceLoader = ({ text }: Props) => (
  <div className="flex justify-center items-center flex-col">
    <Loader />
    <p className="text-lg font-semibold mt-4">{text}</p>
  </div>
);
