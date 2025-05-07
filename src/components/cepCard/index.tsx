import { MdOutlineContentCopy } from "react-icons/md";
import { Cep } from "@/types/Cep";
import { useRef, useState } from "react";

export interface CepCardProps {
  data: Cep;
}

export function CEPCard({ data }: CepCardProps) {
  // Cria uma cópia de data e altera o cep, se necessário
  const cepData = {
    ...data,
    cep: data.cep === "62930-000" ? "62930-970" : data.cep,
  };

  const [copySuccess, setCopySuccess] = useState("");
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  const handleCopyCep = async () => {
    if (cepData.cep) {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(cepData.cep);
        } else {
          if (hiddenInputRef.current) {
            hiddenInputRef.current.value = cepData.cep;
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
      <input
        ref={hiddenInputRef}
        type="hidden"
        readOnly
        style={{ display: "none", visibility: "hidden" }}
      />
      {cepData.cep && (
        <p className="flex items-center gap-2 relative">
          <strong>CEP: {cepData.cep}</strong>
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

      {cepData.logradouro && (
        <p>
          <strong>Logradouro:</strong> {cepData.logradouro}
        </p>
      )}
      {cepData.complemento && (
        <p>
          <strong>Complemento:</strong> {cepData.complemento}
        </p>
      )}
      {cepData.bairro && (
        <p>
          <strong>Bairro:</strong> {cepData.bairro}
        </p>
      )}
    </div>
  );
}
