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
      <div className="flex flex-col lg:flex-row justify-around py-2 items-center flex-wrap gap-2">
        <p className="text-sm">
          Contato:{" "}
          <a
            href="mailto:dev.fernandoguerreiro@gmail.com"
            className="hover:text-blue-300 hover:underline"
            aria-label="Enviar e-mail para dev.fernandoguerreiro@gmail.com"
          >
            dev.fernandoguerreiro@gmail.com
          </a>
        </p>
        <p className="text-sm">
          Telefone/WhatsApp:{" "}
          <a
            href="http://api.whatsapp.com/send?phone=5588999254660"
            className="hover:text-blue-300 hover:underline"
            aria-label="Ligar ou mandar uma mensagem no WhatsApp 88 99925 4660"
          >
            (88) 99925-4660
          </a>
        </p>
        <p className="text-sm text-center">
          Gostou do serviço? Apoie a manutenção do site ❤️!{" "}
          <span
            className="text-gray-200 hover:text-blue-300 hover:underline"
            aria-label="Ligar ou mandar uma mensagem no WhatsApp 88 99925 4660"
            onClick={() => setModalOpen(true)}
          >
            Clique aqui para ver o qr code
          </span>
        </p>
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
