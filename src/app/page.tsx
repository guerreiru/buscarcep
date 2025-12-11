"use client";

import { CEPCard } from "@/components/cepCard";
import { Input } from "@/components/inputField";
import { Modal } from "@/components/modal";
import { StateCitySelect } from "@/components/stateCitySelect";
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
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  // Data limite para exibir o modal (exemplo: 31 de janeiro de 2026)
  const EXPIRATION_DATE = new Date("2026-01-31");
  const STORAGE_KEY = "prolocal-welcome-shown";

  useEffect(() => {
    if (results.length > 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [results]);

  // Verificar se deve mostrar o modal de boas-vindas
  useEffect(() => {
    const hasShownWelcome = localStorage.getItem(STORAGE_KEY);
    const currentDate = new Date();

    // Mostra o modal se:
    // 1. Nunca foi exibido antes E
    // 2. A data atual é menor que a data de expiração
    if (!hasShownWelcome && currentDate < EXPIRATION_DATE) {
      setShowWelcomeModal(true);
    }
  }, []);

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
    // Marca que o modal já foi exibido
    localStorage.setItem(STORAGE_KEY, "true");
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex flex-col items-center px-2 pt-[78px] md:pt-16 pb-[164px] md:pb-[132px]">
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

      {modalMessage && <Modal message={modalMessage} onClose={closeModal} />}

      {/* Modal de Boas-vindas ProLocal */}
      {showWelcomeModal && (
        <Modal onClose={handleCloseWelcomeModal}>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Novidade: ProLocal!
            </h2>
            <p className="text-gray-700 mb-4">
              Descubra a nova plataforma que conecta você aos melhores
              profissionais e serviços da sua região!
            </p>
            <div className="bg-gradient-to-r from-[#beee02] to-[#a8d402] p-4 rounded-lg mb-4">
              <p className="text-gray-900 font-semibold mb-2">
                O que você encontra no ProLocal:
              </p>
              <ul className="text-sm text-gray-900 text-left space-y-1">
                <li>Profissionais qualificados</li>
                <li>Serviços na sua cidade</li>
                <li>Avaliações</li>
                <li>Contato direto via WhatsApp</li>
              </ul>
            </div>
            <Link
              href="/prolocal"
              onClick={handleCloseWelcomeModal}
              className="inline-block bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mb-3"
            >
              Conhecer o ProLocal →
            </Link>
            <p className="text-xs text-gray-500 mt-2">
              💡 Você também pode acessar pelo menu superior
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
