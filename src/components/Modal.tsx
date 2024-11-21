import React from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",
        className,
      )}
    >
      <div className="w-6/12 bg-white rounded-2xl shadow-lg p-10 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
        {title && (
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            {title}
          </h2>
        )}
        <div className="text-gray-700">{children}</div>
        {footer && <div className="mt-10">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
