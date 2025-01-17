import { calculateSimilarity } from "@/utils/calculateSimilarity";
import { cities } from "@/utils/cities";
import { sanitizeAddress } from "@/utils/sanitizeAddress";
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
    const state = states.find((state) => state.id === selectedState);
    if (!state) {
      setModalMessage("Estado não encontrado.");
      return;
    }
    const acronym = state.acronym;
    const city = selectedCity || "Limoeiro do Norte";

    if (!address.trim()) {
      setModalMessage("Por favor, insira a rua.");
      return;
    }

    const sanitizedAddress = sanitizeAddress(address);

    if (!sanitizedAddress.length) {
      setModalMessage("Por favor, insira uma rua válida.");
      return;
    }

    const matchingAddresses = streets.filter((street) => {
      const similarity = calculateSimilarity(sanitizedAddress, street.name);
      return similarity > 0.3;
    });

    const defaultAddress =
      matchingAddresses.length > 0
        ? matchingAddresses[0].name
        : sanitizedAddress;

    const cacheKey = `${acronym}-${city}-${defaultAddress.trim()}`;
    const cachedResults = localStorage.getItem(cacheKey);

    if (cachedResults) {
      setResults(JSON.parse(cachedResults));
      return;
    }

    setIsSearching(true);

    console.log(sanitizedAddress);

    try {
      const response = await fetch(
        `/api/cep?state=${acronym}&city=${city}&address=${defaultAddress}`
      );
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(cacheKey, JSON.stringify(data));
        setResults(data);
      } else {
        const message = data.message || "Erro ao buscar o CEP.";
        setModalMessage(message);
      }
    } catch (error) {
      setModalMessage("Erro ao buscar o CEP. Tente novamente mais tarde.");
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
