import {
  CITY_TO_SEARCH_WITHOUT_NUMBER,
  DEFAULT_CITY,
  DEFAULT_STATE,
} from "@/utils/constants";
import { addressWithOutHouseNumber } from "@/utils/sanitizeAddress";
import { NextResponse } from "next/server";

function getViaCepUrl(state: string, city: string, address: string): string {
  return `https://viacep.com.br/ws/${state}/${city}/${encodeURIComponent(
    address
  )}/json/`;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const state = searchParams.get("state") || DEFAULT_STATE;
  const city = searchParams.get("city") || DEFAULT_CITY;
  const address = searchParams.get("address");

  if (!address || address.trim() === "") {
    return NextResponse.json(
      { message: "Por favor, insira a rua." },
      { status: 400 }
    );
  }

  try {
    let apiUrl = "";

    if (CITY_TO_SEARCH_WITHOUT_NUMBER.includes(city)) {
      apiUrl = getViaCepUrl(state, city, addressWithOutHouseNumber(address));
    } else {
      apiUrl = getViaCepUrl(state, city, address);
    }

    const response = await fetch(apiUrl);

    if (!response.ok) {
      return NextResponse.json(
        { message: "Erro ao consultar o ViaCEP." },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data || !data.length) {
      return NextResponse.json(
        { message: "Nenhum CEP encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Erro ao buscar o CEP.", error: error.message },
      { status: 500 }
    );
  }
}
