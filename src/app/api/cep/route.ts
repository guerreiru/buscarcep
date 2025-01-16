import { sanitizeAddress } from "@/utils/sanitizeAddress";
import { NextResponse } from "next/server";

function getViaCepUrl(state: string, city: string, address: string): string {
  return `https://viacep.com.br/ws/${state}/${city}/${encodeURIComponent(
    address
  )}/json/`;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const state = searchParams.get("state") || "CE";
  const city = searchParams.get("city") || "Limoeiro do Norte";
  const address = searchParams.get("address");

  if (!address || address.trim() === "") {
    return NextResponse.json(
      { message: "Por favor, insira a rua." },
      { status: 400 }
    );
  }

  const sanitizedAddress = sanitizeAddress(address);

  if (!sanitizedAddress) {
    return NextResponse.json(
      { message: "Por favor, insira uma rua válida." },
      { status: 400 }
    );
  }

  try {
    const apiUrl = getViaCepUrl(state, city, sanitizedAddress);
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return NextResponse.json(
        { message: "Erro ao consultar o ViaCEP.", status: response.status },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data || data.length === 0) {
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
