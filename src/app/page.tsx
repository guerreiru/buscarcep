"use client";

import { CEPCard } from "@/components/cepCard";
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
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Consulta de CEP</h1>
        <p className="text-sm mb-4">
          Selecione o estado e cidade e digite o endereço para encontrar o CEP.
        </p>

        <StateCitySelect
          selectedCity={selectedCity}
          selectedState={selectedState}
          setSelectedCity={setSelectedCity}
          setSelectedState={setSelectedState}
        />

        <div className="mb-4">
          <label className="block text-sm mb-1">Endereço:</label>
          <input
            id="address"
            name="address"
            required
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Digite o endereço..."
            className="w-full bg-gray-800 text-white border border-gray-600 p-2 rounded"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="bg-blue-500 hover:bg-blue-600 transition text-white font-bold py-2 px-4 rounded w-full disabled:cursor-progress disabled:bg-blue-200 disabled:hover:bg-blue-200"
        >
          Buscar CEP
        </button>
        <p className="text-xs text-gray-400 mt-4">
          Se o endereço não for encontrado, será exibido o CEP geral da cidade,
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
