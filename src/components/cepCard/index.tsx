import { MdOutlineContentCopy } from "react-icons/md";
import { Cep } from "@/types/Cep";
import { useRef, useState } from "react";

export interface CepCardProps {
  data: Cep;
}

export function CEPCard({ data }: CepCardProps) {
  const [copySuccess, setCopySuccess] = useState("");
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  const handleCopyCep = async () => {
    if (data.cep) {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(data.cep);
        } else {
          if (hiddenInputRef.current) {
            hiddenInputRef.current.value = data.cep;
            hiddenInputRef.current.select();
            document.execCommand("copy");
          }
        }
        setCopySuccess("CEP copiado com sucesso!");
      } catch (err) {
        setCopySuccess("Erro ao copiar o CEP.");
      } finally {
        setTimeout(() => setCopySuccess(""), 2000);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 min-w-full dark:*:text-background flex flex-col gap-1">
      {/* Input oculto para fallback */}
      <input
        ref={hiddenInputRef}
        type="hidden"
        readOnly
        style={{ display: "none", visibility: "hidden" }}
      />
      {data.cep && (
        <p className="flex items-center gap-2 relative">
          <strong>CEP: {data.cep}</strong>
          <span
            className="cursor-pointer"
            onClick={handleCopyCep}
            title="Copiar CEP"
          >
            <MdOutlineContentCopy />
          </span>
          {copySuccess && (
            <span className="text-sm text-blue-500 absolute -top-4">
              {copySuccess}
            </span>
          )}
        </p>
      )}

      {data.logradouro && (
        <p>
          <strong>Logradouro:</strong> {data.logradouro}
        </p>
      )}
      {data.complemento && (
        <p>
          <strong>Complemento:</strong> {data.complemento}
        </p>
      )}
      {data.bairro && (
        <p>
          <strong>Bairro:</strong> {data.bairro}
        </p>
      )}
    </div>
  );
}
