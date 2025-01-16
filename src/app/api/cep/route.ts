import { NextResponse } from "next/server";

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

  const addressSanitizer = address.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ0-9 ]/g, "");

  if (!addressSanitizer || addressSanitizer.trim() === "") {
    return NextResponse.json(
      { message: "Por favor, insira uma rua válido." },
      { status: 400 }
    );
  }

  try {
    const apiUrl = `https://viacep.com.br/ws/${state}/${city}/${encodeURIComponent(
      addressSanitizer
    )}/json/`;
    const response = await fetch(apiUrl);

    const data = await response.json();

    if (data.length === 0 || !response.ok) {
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
