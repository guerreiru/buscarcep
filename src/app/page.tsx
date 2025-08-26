"use client";

import { CEPCard } from "@/components/cepCard";
import { Input } from "@/components/inputField";
import { Modal } from "@/components/modal";
import { StateCitySelect } from "@/components/stateCitySelect";
import { useCepSearch } from "@/hooks/useCepSearch";
import { PIX_COPIA_E_COLA } from "@/utils/constants";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [modalPix, setModalPix] = useState(true);

  const {
    address,
    setAddress,
    results,
    selectedState,
    setSelectedState,
    selectedCity,
    setSelectedCity,
    handleSearch,
    modalMessage,
    closeModal,
    isSearching,
  } = useCepSearch();

  const resultsRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    if (results.length > 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [results]);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex flex-col items-center px-2 pt-16 pb-[164px] md:pb-[132px]">
      <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <p className="mb-4">
          Selecione o estado e cidade e digite a rua para encontrar o CEP.
        </p>

        <StateCitySelect
          selectedCity={selectedCity}
          selectedState={selectedState}
          setSelectedCity={setSelectedCity}
          setSelectedState={setSelectedState}
        />

        <Input
          id="address"
          name="address"
          required
          type="text"
          value={address}
          placeholder="Digite a rua"
          onChange={(e) => setAddress(e.target.value)}
          label="Rua"
          aria-required="true"
        />

        <button
          onClick={handleSearch}
          disabled={isSearching}
          aria-disabled={isSearching}
          className="bg-blue-700 hover:bg-blue-900 transition text-white font-bold py-2 px-4 rounded w-full disabled:cursor-progress disabled:bg-blue-200 disabled:hover:bg-blue-200"
        >
          {isSearching ? "Buscando..." : "Buscar CEP"}
        </button>

        <p className="text-xs mt-4">
          Se a rua não tiver CEP próprio, será exibido o CEP geral da cidade,
          caso esteja disponível.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 w-full max-w-sm">
        {results.map((result, index) => (
          <CEPCard key={index} data={result} />
        ))}
      </div>

      {modalMessage && <Modal message={modalMessage} onClose={closeModal} />}
      {modalPix && (
        <Modal onClose={() => setModalPix(false)}>
          <input
            ref={hiddenInputRef}
            type="hidden"
            readOnly
            style={{ display: "none", visibility: "hidden" }}
          />

          <div className="flex flex-col items-center justify-center gap-1">
            <h1 className="text-gray-800 text-center">
              Se você gostar do serviço, contribua com a manutenção do site ❤️!
            </h1>
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

            <p className="text-xs md:text-sm text-gray-800">
              Nome: Fernando Luiz Guerreiro Rodrigues
            </p>
            <p className="text-xs md:text-sm text-gray-800">
              CPF: ***.881.983-**
            </p>
            <p className="text-xs md:text-sm text-gray-800">
              Instituição: Itaú Unibanco S.A.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
