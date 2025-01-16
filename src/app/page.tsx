"use client";

import { CEPCard } from "@/components/cepCard";
import { Input } from "@/components/inputField";
import { Modal } from "@/components/modal";
import { StateCitySelect } from "@/components/stateCitySelect";
import { useCepSearch } from "@/hooks/useCepSearch";

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

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex flex-col items-center md:justify-center px-2 py-4">
      <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Consulta de CEP</h1>
        <p className="text-sm mb-4">
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

      <footer className=" text-center mt-4 text-white">
        <div className="container mx-auto">
          <p className="text-sm mt-2">
            Contato:{" "}
            <a
              href="mailto:dev.fernandoguerreiro@gmail.com"
              className="hover:text-blue-400 hover:underline"
              aria-label="Enviar e-mail para dev.fernandoguerreiro@gmail.com"
            >
              dev.fernandoguerreiro@gmail.com
            </a>
          </p>
          <p className="text-sm mt-2">
            Telefone/WhatsApp:{" "}
            <a
              href="http://api.whatsapp.com/send?phone=5588999254660"
              className="hover:text-blue-400 hover:underline"
              aria-label="Ligar ou mandar uma mensagem no WhatsApp 88 99925 4660"
            >
              (88) 99925-4660
            </a>
          </p>
          <p className="text-xs mt-2">
            © 2025 Fernando Guerreiro. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
