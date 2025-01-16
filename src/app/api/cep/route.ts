import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const state = searchParams.get("state") || "CE";
  const city = searchParams.get("city") || "Limoeiro do Norte";
  const address = searchParams.get("address");

  if (!address || address.trim() === "") {
    return NextResponse.json(
      { message: "Por favor, insira o endereço." },
      { status: 400 }
    );
  }

  try {
    const apiUrl = `https://viacep.com.br/ws/${state}/${city}/${encodeURIComponent(
      address
    )}/json/`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Erro ao buscar na API do ViaCEP");
    }

    const data = await response.json();

    if (data.length === 0) {
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
