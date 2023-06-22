import React, { forwardRef, useImperativeHandle, useState } from "react";
import Button from "./Button";
import { XCircle } from "react-feather";

interface Props {
  children: React.ReactNode;
}

export type ModalHandler = {
  show: () => void;
  hide: () => void;
};

// eslint-disable-next-line react/display-name
const Modal = forwardRef<ModalHandler, Props>(({ children }, ref) => {
  const [showModal, setShowModal] = useState(false);
  const show = () => setShowModal(true);
  const hide = () => setShowModal(false);
  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  if (showModal === false) {
    return null;
  }

  return (
    <div
      className={
        "fixed inset-0 z-20 flex h-screen w-screen items-center justify-center overflow-hidden bg-neutral-900/50 px-2 backdrop-blur-md md:px-0"
      }
      onClick={(e) => {
        if (e.currentTarget != e.target) return;
        hide();
      }}
    >
      <div className="relative">
        <Button
          variant="tertiary"
          onClick={() => hide()}
          className="absolute right-0 ml-auto -translate-y-1/2 translate-x-1/2 rounded-full border border-gray-600/50 bg-zinc-950 text-red-700"
        >
          <XCircle />
        </Button>

        {children}
      </div>
    </div>
  );
});

export default Modal;
