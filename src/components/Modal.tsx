import { Dispatch, SetStateAction } from "react";

interface Props {
  closeModal: () => void;
  title: string;
  text: string;
}

const Modal = ({ closeModal, title, text }: Props) => (
  <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-gray-400 bg-opacity-60">
    <div className="relative mx-auto w-full max-w-xl mt-24">
      <div className="relative bg-white rounded-xl shadow bg-white p-4">
        <div className="flex justify-between items-start mb-5 rounded-t">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent rounded-xl text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={() => closeModal()}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="mb-6">
          <p className="leading-relaxed">{text}</p>
        </div>
        <div className="flex items-center rounded-b">
          <button
            type="button"
            className="bg-redstone hover:opacity-75 text-white py-2 px-4 rounded-full"
            onClick={() => closeModal()}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
