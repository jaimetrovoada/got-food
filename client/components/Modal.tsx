import React, { forwardRef, useImperativeHandle, useState } from "react";
import Button from "./Button";

interface Props {
  children: React.ReactNode;
}

export type ModalHandler = {
  show: () => void;
};

// eslint-disable-next-line react/display-name
const Modal = forwardRef<ModalHandler, Props>(({ children }, ref) => {
  const [showModal, setShowModal] = useState(false);
  useImperativeHandle(ref, () => ({
    show() {
      setShowModal(true);
    },
    hide() {
      setShowModal(false);
    },
  }));

  if (!showModal) null;

  return (
    <div
      className={`fixed inset-0 z-20 flex h-screen w-screen items-center justify-center bg-gray-50/50 ${
        showModal ? "block" : "hidden"
      }`}
      onClick={(e) => {
        if (e.currentTarget != e.target) return;
        setShowModal(false);
      }}
    >
      <div className="z-50 w-full max-w-screen-md">
        <Button variant="tertiary" onClick={() => setShowModal(false)}>
          close
        </Button>
        {children}
      </div>
    </div>
  );
});

export default Modal;
