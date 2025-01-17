import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { MAX_MESSAGE_LENGTH } from "@/utils/constants";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, message } = body;

    if (message) {
      return NextResponse.json(
        {
          message: "Mensagem é obrigatória.",
        },
        { status: 400 }
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        {
          message: `A mensagem excede o limite de ${MAX_MESSAGE_LENGTH} caracteres.`,
        },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Mensagem de ${name}`,
      text: `Você recebeu uma nova mensagem:
      
      Nome: ${name}
      E-mail: ${email}
      Mensagem: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "E-mail enviado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao enviar o e-mail.", error: error },
      { status: 500 }
    );
  }
}
