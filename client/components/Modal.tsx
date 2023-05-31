import React, { forwardRef, useImperativeHandle, useState } from "react";

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

  if (!showModal) null;

  return (
    <div
      className={`fixed inset-0 z-20 flex h-screen w-screen items-center justify-center bg-gray-50/50 backdrop-blur-md ${
        showModal ? "block" : "hidden"
      }`}
      onClick={(e) => {
        if (e.currentTarget != e.target) return;
        setShowModal(false);
      }}
    >
      {children}
    </div>
  );
});

export default Modal;
