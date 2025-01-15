import React from "react";

interface ModalProps {
  message?: string;
  onClose: () => void;
  children?: React.ReactNode; // Permitindo passar componentes filhos
}

export const Modal = ({ message, onClose, children }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
        {message && (
          <p className="text-xl font-semibold mb-4 dark:text-background">
            {message}
          </p>
        )}
        <div className="mb-4">{children}</div>
        <button
          onClick={onClose}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};
