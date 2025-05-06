"use client";

import { useRef, useState } from "react";
import { Modal } from "../modal";
import Image from "next/image";
import { PIX_COPIA_E_COLA } from "@/utils/constants";

export function Footer() {
  const [modalOpen, setModalOpen] = useState(false);
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  const handleCopyPixCode = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(PIX_COPIA_E_COLA);
      } else {
        if (hiddenInputRef.current) {
          hiddenInputRef.current.value = PIX_COPIA_E_COLA;
          hiddenInputRef.current.select();
          document.execCommand("copy");
        }
      }
      alert("Código copiado com sucesso!");
    } catch (err) {
      alert("Erro ao copiar o código.");
    }
  };

  return (
    <footer className=" bg-gray-800 text-white fixed bottom-0 w-full z-50 shadow-md">
      <div className="flex flex-col lg:flex-row justify-around py-2 items-center flex-wrap gap-2 gap-y-3">
        <a
          href="mailto:dev.fernandoguerreiro@gmail.com"
          className="hover:text-blue-300 hover:underline text-sm"
          aria-label="Enviar e-mail para dev.fernandoguerreiro@gmail.com"
        >
          Contato: dev.fernandoguerreiro@gmail.com
        </a>
        <a
          href="http://api.whatsapp.com/send?phone=5588999254660"
          className="hover:text-blue-300 hover:underline text-sm"
          aria-label="Ligar ou mandar uma mensagem no WhatsApp 88 99925 4660"
        >
          Telefone/WhatsApp: (88) 99925-4660
        </a>
        <a
          href="http://api.whatsapp.com/send?phone=5588999747309"
          className="hover:text-blue-300 hover:underline text-sm text-green-400"
          aria-label="Ligar ou mandar uma mensagem no WhatsApp 88 99974-7309"
        >
          Curso preparatório para ACS e ACE: (88) 99974-7309
        </a>
        <p className="text-xs">
          © 2025 Fernando Guerreiro. Todos os direitos reservados.
        </p>
      </div>

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <input
            ref={hiddenInputRef}
            type="hidden"
            readOnly
            style={{ display: "none", visibility: "hidden" }}
          />

          <div className="flex flex-col items-center justify-center gap-1">
            <Image
              alt="Qr code para a chave pix dev.fernandoguerreiro@gmail.com"
              src="/qr-code.png"
              width={200}
              height={200}
            />

            <button
              className="border border-green-700 py-2 px-4 rounded-sm text-gray-800 shadow-sm hover:bg-slate-100 hover:border-green-800"
              onClick={handleCopyPixCode}
            >
              Copiar o código do pix
            </button>

            <p className="text-sm text-gray-800">
              Nome: Fernando Luiz Guerreiro Rodrigues
            </p>
            <p className="text-sm text-gray-800">CPF: ***.881.983-**</p>
            <p className="text-sm text-gray-800">
              Instituição: Bco Itaucard S.A.
            </p>
          </div>
        </Modal>
      )}
    </footer>
  );
}
