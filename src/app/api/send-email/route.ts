import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { MAX_MESSAGE_LENGTH } from "@/utils/constants";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const isSurveyForm = body.serviceInterest || body.newServiceIdea;
    const isContactForm = body.email || body.message;

    if (body.message && body.message.length > MAX_MESSAGE_LENGTH) {
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
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    let subject = "Nova mensagem recebida";
    let html = "";

    if (isSurveyForm) {
      subject = "📋 Nova resposta da pesquisa de opinião";
      html = `
        <div style="font-family: Arial, sans-serif; color: #222;">
          <h2>📊 Nova resposta da pesquisa</h2>
          <p><strong>👤 Nome:</strong> ${body.name || "Não informado"}</p>
          <p><strong>💭 Interesse em site de serviços locais:</strong> ${
            body.serviceInterest
          }</p>
          <p><strong>💡 Sugestão:</strong> ${
            body.newServiceIdea?.trim()
              ? body.newServiceIdea
              : "Nenhuma sugestão enviada."
          }</p>
          <hr />
          <p style="font-size: 0.9rem; color: #666;">
            📩 Mensagem automática do formulário de pesquisa.
          </p>
        </div>
      `;
    } else if (isContactForm) {
      subject = `📩 Nova mensagem de contato de ${body.name || "Anônimo"}`;
      html = `
        <div style="font-family: Arial, sans-serif; color: #222;">
          <h2>📬 Nova mensagem de contato</h2>
          <p><strong>👤 Nome:</strong> ${body.name || "Não informado"}</p>
          <p><strong>📧 E-mail:</strong> ${body.email || "Não informado"}</p>
          <p><strong>💬 Mensagem:</strong></p>
          <div style="background: #f8f8f8; padding: 10px; border-radius: 8px; margin-top: 4px;">
            ${body.message || "(sem mensagem)"}
          </div>
          <hr />
          <p style="font-size: 0.9rem; color: #666;">
            📩 Mensagem automática do formulário de contato.
          </p>
        </div>
      `;
    }

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL_USER,
      to: process.env.NEXT_PUBLIC_EMAIL_USER,
      subject,
      html, // 👈 usamos HTML em vez de text
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "E-mail enviado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json(
      { message: "Erro ao enviar o e-mail.", error },
      { status: 500 }
    );
  }
}
