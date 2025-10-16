"use client";

import { CEPCard } from "@/components/cepCard";
import { Input } from "@/components/inputField";
import { Modal } from "@/components/modal";
import { StateCitySelect } from "@/components/stateCitySelect";
import { SurveyModal } from "@/components/surveyModal";
import { useCepSearch } from "@/hooks/useCepSearch";
import { limoeiroStreets } from "@/utils/limoeiro-streets";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
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

  useEffect(() => {
    if (results.length > 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [results]);

  const [showSurvey, setShowSurvey] = useState(false);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex flex-col items-center px-2 pt-[72px] pb-[164px] md:pb-[132px]">
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
          list="street-suggestions"
        />

        {selectedCity === "Limoeiro do Norte" && (
          <datalist id="street-suggestions">
            {limoeiroStreets.map((street, index) => (
              <option key={index} value={street.logradouro} />
            ))}
          </datalist>
        )}

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

        <p className="text-xs mt-2">
          Caso tenha ficado alguma dúvida, confira a página com o PDF
          disponibilizado pela prefeitura{" "}
          <Link
            href="/pdf"
            className="text-blue-400 hover:underline"
            aria-label="Clique aqui para entrar em contato"
          >
            aqui
          </Link>
        </p>
      </div>

      <div
        ref={resultsRef}
        className="mt-6 flex flex-wrap gap-2 w-full max-w-sm"
      >
        {results.map((result, index) => (
          <CEPCard key={index} data={result} />
        ))}
      </div>

      {results.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-300 mb-2">
            Gostou da ferramenta? Sua opinião nos ajuda a melhorar!
          </p>
          <button
            onClick={() => setShowSurvey(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow-md transition"
          >
            Responder Pesquisa de Satisfação
          </button>
        </div>
      )}

      {showSurvey && <SurveyModal onClose={() => setShowSurvey(false)} />}

      {modalMessage && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
}
