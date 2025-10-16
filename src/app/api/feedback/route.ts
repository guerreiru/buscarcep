import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, serviceInterest, newServiceIdea } = await req.json();

    if (!serviceInterest || !newServiceIdea) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando" },
        { status: 400 }
      );
    }

    const feedback = await prisma.feedback.create({
      data: { name, serviceInterest, newServiceIdea },
    });

    return NextResponse.json({ success: true, feedback });
  } catch (error) {
    console.error("Erro ao salvar feedback:", error);
    return NextResponse.json(
      { error: "Erro ao salvar feedback" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const feedbacks = await prisma.feedback.findMany();

    return NextResponse.json({ success: true, feedbacks });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar feedbacks" },
      { status: 500 }
    );
  }
}
