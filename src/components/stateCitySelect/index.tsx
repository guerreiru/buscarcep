import { useState } from "react";
import { states } from "@/utils/states";
import { cities } from "@/utils/cities";

interface StateCitySelectProps {
  selectedState: keyof typeof cities;
  setSelectedState: React.Dispatch<React.SetStateAction<keyof typeof cities>>;
  selectedCity: string;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
}

export function StateCitySelect({
  selectedState,
  setSelectedState,
  selectedCity,
  setSelectedCity,
}: StateCitySelectProps) {
  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as keyof typeof cities;
    setSelectedState(value);
    setSelectedCity("");
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  const citiesForSelectedState = cities[selectedState] || [];

  return (
    <div className="flex flex-col mb-4">
      <label className="font-semibold mb-2">Estado:</label>
      <select
        className="border border-gray-300 rounded-lg p-2 mb-4 text-zinc-800"
        value={selectedState}
        onChange={handleStateChange}
      >
        {states.map((state) => (
          <option key={state.acronym} value={state.id}>
            {state.name}
          </option>
        ))}
      </select>

      <label className="font-semibold mb-2">Cidade:</label>
      <select
        className="border border-gray-300 rounded-lg p-2 text-zinc-800"
        value={selectedCity}
        onChange={handleCityChange}
        disabled={!selectedState}
      >
        <option value="">Selecione uma cidade</option>
        {citiesForSelectedState.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}
