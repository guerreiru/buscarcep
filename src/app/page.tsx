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
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex flex-col items-center px-2 pt-16 pb-[116px] ">
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
    </div>
  );
}
