import { calculateSimilarity } from "@/utils/calculateSimilarity";
import { cities } from "@/utils/cities";
import { states } from "@/utils/states";
import { streets } from "@/utils/streets";
import { useState } from "react";

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
      setModalMessage("Por favor, insira a rua.");
      return;
    }

    const state = states.filter((state) => state.id === selectedState)[0]
      .acronym;
    const city = selectedCity || "Limoeiro do Norte";

    const results = streets.filter((street) => {
      const similarity = calculateSimilarity(address, street.name);
      return similarity > 0.3;
    });

    const _address = results.length > 0 ? results[0].name : address;

    const cacheKey = `${state}-${city}-${address.trim()}`;
    const cachedResults = localStorage.getItem(cacheKey);

    if (cachedResults) {
      setResults(JSON.parse(cachedResults));
      return;
    }

    setIsSearching(true);

    try {
      const response = await fetch(
        `/api/cep?state=${state}&city=${city}&address=${_address}`
      );
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(cacheKey, JSON.stringify(data));
        setResults(data);
      } else {
        const message = data.message || "Erro ao buscar o CEP.";
        setModalMessage(message);
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
