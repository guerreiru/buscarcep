import React, { useEffect, useRef } from "react";

interface ModalProps {
  message?: string;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal = ({ message, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const lastActiveElement = document.activeElement as HTMLElement;
    return () => lastActiveElement?.focus();
  }, []);

  useEffect(() => {
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key === "Tab" && modalRef.current) {
        const focusableElements =
          modalRef.current.querySelectorAll<HTMLElement>(
            "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
          );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
  }, []);

  return (
    <div
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4"
      >
        {message && (
          <p
            id="modal-title"
            className="text-xl font-semibold mb-4 dark:text-background"
          >
            {message}
          </p>
        )}
        {children && (
          <div id="modal-description" className="mb-4">
            {children}
          </div>
        )}
        <div className="flex items-center justify-end">
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Fechar modal"
            className="bg-red-500 text-white font-bold py-2 px-4 rounded"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
