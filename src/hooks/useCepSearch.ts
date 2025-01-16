import { cities } from "@/utils/cities";
import { states } from "@/utils/states";
import { useState, useEffect } from "react";

export function useCepSearch() {
  const [address, setAddress] = useState("");
  const [results, setResults] = useState([]);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<keyof typeof cities>("6");
  const [selectedCity, setSelectedCity] = useState("Limoeiro do Norte");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!address.trim()) {
      setModalMessage("Por favor, insira o endereço.");
      return;
    }

    const state = states.filter((state) => state.id === selectedState)[0]
      .acronym;
    const city = selectedCity || "Limoeiro do Norte";

    const cacheKey = `${state}-${city}-${address.trim()}`;
    const cachedResults = localStorage.getItem(cacheKey);

    if (cachedResults) {
      setResults(JSON.parse(cachedResults));
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `/api/cep?state=${state}&city=${city}&address=${address}`
      );
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(cacheKey, JSON.stringify(data));
        setResults(data);
      } else {
        setModalMessage("Erro ao buscar o CEP.");
      }
    } catch {
      setModalMessage("Erro ao buscar o CEP.");
    } finally {
      setIsSearching(false);
    }
  };

  const closeModal = () => {
    setModalMessage(null);
    setIsModalOpen(false);
  };

  return {
    address,
    setAddress,
    results,
    selectedState,
    setSelectedState,
    selectedCity,
    setSelectedCity,
    handleSearch,
    modalMessage,
    isModalOpen,
    closeModal,
    isSearching,
  };
}
