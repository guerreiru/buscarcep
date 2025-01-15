"use client";

import { CEPCard } from "@/components/cepCard";
import { Modal } from "@/components/modal";
import { StateCitySelect } from "@/components/stateCitySelect";
import { Cep } from "@/types/Cep";
import { cities } from "@/utils/cities";
import { states } from "@/utils/states";
import { useEffect, useState } from "react";

export default function Home() {
  const [address, setAddress] = useState("");
  const [results, setResults] = useState<Cep[]>([]);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<keyof typeof cities>("6");
  const [selectedCity, setSelectedCity] = useState("Limoeiro do Norte");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  const modalEndDate = new Date("2025-06-30T23:59:59");

  useEffect(() => {
    const visitedBefore = localStorage.getItem("visitedBefore");
    const currentDate = new Date();

    if (!visitedBefore && currentDate <= modalEndDate) {
      setIsFirstVisit(true);
      setIsModalOpen(true);
    } else {
      setIsFirstVisit(false);
    }
  }, []);

  const handleSearch = async () => {
    if (!address.trim()) {
      setModalMessage("Por favor, insira o endereço.");
      return;
    }

    if (!selectedCity) {
      setModalMessage("Por favor, selecione uma cidade.");
      return;
    }

    const state =
      states.filter((state) => state.id === selectedState)[0].acronym || "CE";
    const city = selectedCity || "Limoeiro do Norte";

    setResults([]);

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${state}/${city}/${address}/json/`
      );
      const data = await response.json();

      if (data.length === 0) {
        setModalMessage("Nenhum CEP encontrado.");
        return;
      }

      setResults(data);
    } catch (error) {
      setModalMessage("Erro ao buscar o CEP.");
    }
  };

  const closeModal = () => {
    setModalMessage(null);
    setIsModalOpen(false);

    if (isFirstVisit) {
      localStorage.setItem("visitedBefore", "true");
    }
  };

  return (
    <div className="flex flex-col min-h-screen py-8 px-4 lg:max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Consulta de CEP</h1>
      <p className="mb-6">
        Selecione o estado a cidade e digite o endereço para encontrar o CEP.
      </p>
      <StateCitySelect
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />

      <div>
        <label className="font-semibold mb-2 block" htmlFor="address">
          Endereço:
        </label>
        <input
          id="address"
          name="address"
          required
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 mb-4 w-full max-w placeholder:text-foreground dark:placeholder:text-background dark:text-background"
          placeholder="Digite o endereço..."
        />
      </div>
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Buscar CEP
      </button>

      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        Se o endereço não for encontrado, será exibido o CEP geral da cidade,
        caso esteja disponível.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {results.map((result, index) => (
          <CEPCard key={index} data={result} />
        ))}
      </div>

      {isModalOpen && (
        <Modal message="Olá." onClose={closeModal}>
          <p className="dark:text-background">
            A cidade de Limoeiro do Norte passou por uma atualização importante
            no sistema de CEP. Antes, todo o município possuía um único CEP, mas
            agora, a maioria das ruas terá seu próprio CEP individual. Essa
            mudança visa facilitar a entrega de correspondências e encomendas,
            proporcionando mais precisão e agilidade nos serviços postais.
          </p>
        </Modal>
      )}

      {modalMessage && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
}
