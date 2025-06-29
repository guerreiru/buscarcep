import { Cep } from "@/types/Cep";
import { addressWithOutHouseNumber } from "@/utils/addressWithOutHouseNumber";
import { cities } from "@/utils/cities";
import { CITY_TO_SEARCH_WITHOUT_NUMBER } from "@/utils/constants";
import { findAddressCep } from "@/utils/findAddressCep";
import { limoeiroStreets } from "@/utils/limoeiro-streets";
import { normalizeAddress } from "@/utils/normalizeString";
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

export function useCepSearch() {
  const [address, setAddress] = useState("");
  const [results, setResults] = useState<Cep[]>([]);
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

    const sanitizedAddress = findAddressCep(address).toLocaleLowerCase();

    if (!sanitizedAddress.length) {
      setModalMessage("Por favor, insira uma rua válida.");
      return;
    }

    setIsSearching(true);

    const results: Cep[] = [];

    if (selectedCity === "Limoeiro do Norte") {
      for (let i = 0; i < limoeiroStreets.length; i++) {
        const street = limoeiroStreets[i];
        const sanitizedLogradouro = normalizeAddress(street.logradouro || "");

        if (sanitizedLogradouro?.includes(sanitizedAddress)) {
          results.push(street);
        }
      }
    }

    setResults(results);

    if (!results.length) {
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
    } else {
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
