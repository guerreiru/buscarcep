import { addressWithOutHouseNumber } from "@/utils/addressWithOutHouseNumber";
import { cities } from "@/utils/cities";
import { CITY_TO_SEARCH_WITHOUT_NUMBER } from "@/utils/constants";
import { findAddressCep } from "@/utils/findAddressCep";
import { states } from "@/utils/states";
import { useState } from "react";

export function getViaCepUrl(
  state: string,
  city: string,
  address: string
): string {
  return `https://viacep.com.br/ws/${state}/${city}/${encodeURIComponent(
    address
  )}/json/`;
}

async function checkForCepAndSendEmail(data: any[], address: string) {
  const found = data.find((item) => item.cep === "62930-000");

  if (found) {
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Guerreiro",
          email: "guerreiro@gmail.com",
          message: `Endereço com CEP 62930-000 foi encontrado: ${address}`,
        }),
      });
    } catch {}
  }
}

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

    const sanitizedAddress = findAddressCep(address);

    if (!sanitizedAddress.length) {
      setModalMessage("Por favor, insira uma rua válida.");
      return;
    }

    const cacheKey = `${acronym}-${city}-${sanitizedAddress.trim()}`;
    const cachedResults = localStorage.getItem(cacheKey);

    if (cachedResults) {
      setResults(JSON.parse(cachedResults));
      return;
    }

    setIsSearching(true);

    try {
      let apiUrl = "";

      if (CITY_TO_SEARCH_WITHOUT_NUMBER.includes(city)) {
        apiUrl = getViaCepUrl(
          acronym,
          city,
          addressWithOutHouseNumber(sanitizedAddress)
        );
      } else {
        apiUrl = getViaCepUrl(acronym, city, sanitizedAddress);
      }

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(cacheKey, JSON.stringify(data));
        setResults(data);
        checkForCepAndSendEmail(data, address);
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
