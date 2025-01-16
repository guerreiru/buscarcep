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
    <div className="flex flex-col">
      <div className="mb-4">
        <label htmlFor="state" className="block text-sm mb-1">
          Estado:
        </label>
        <select
          id="state"
          name="state"
          className="w-full bg-gray-800 text-white border border-gray-600 p-2 rounded"
          value={selectedState}
          onChange={handleStateChange}
        >
          {states.map((state) => (
            <option key={state.acronym} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="city" className="block text-sm mb-1">
          Cidade:
        </label>
        <select
          id="city"
          name="city"
          className="w-full bg-gray-800 text-white border border-gray-600 p-2 rounded"
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
    </div>
  );
}
