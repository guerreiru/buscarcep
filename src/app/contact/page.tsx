"use client";

import { Input } from "@/components/inputField";
import { MAX_MESSAGE_LENGTH } from "@/utils/constants";
import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const isMessageLengthValid = form.message.length <= MAX_MESSAGE_LENGTH;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSendMessage = async () => {
    if (!form.message || form.message.trim() === "") {
      setStatus("A mensagem é obrigatória.");
      return;
    }

    try {
      if (!isMessageLengthValid) {
        setStatus(
          `A mensagem excede o limite de ${MAX_MESSAGE_LENGTH} caracteres.`
        );

        return;
      }

      setIsSendingMessage(true);
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("E-mail enviado com sucesso! 😎");
      } else {
        setStatus(data.message || "Erro ao enviar o e-mail. 😮");
      }
    } catch (error) {
      setStatus("Erro ao enviar o e-mail.");
    } finally {
      setIsSendingMessage(false);
      setTimeout(() => setStatus(""), 2000);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex flex-col items-center px-1 pt-16 pb-[116px]">
      <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <p className="mb-4">
          Entre em contato conosco para enviar dúvidas, sugestões ou informar
          algum problema no site
        </p>

        <Input
          id="name"
          name="name"
          type="text"
          value={form.name}
          placeholder="Seu nome"
          onChange={handleChange}
          label="Nome (Opicional)"
          aria-required="false"
        />

        <Input
          id="email"
          name="email"
          required
          type="email"
          value={form.email}
          placeholder="Seu email"
          onChange={handleChange}
          label="Email (Opicional)"
          aria-required="true"
        />

        <label htmlFor="message" className="block text-sm mb-1">
          Mensagem (Obrigatório)
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          rows={5}
          onChange={handleChange}
          className="w-full bg-gray-800 text-white border border-gray-600 p-2 rounded"
          placeholder="Digite sua mensagem"
        />
        <p className="text-sm">
          {form.message.length}/{MAX_MESSAGE_LENGTH} caracteres
        </p>

        <button
          onClick={handleSendMessage}
          disabled={isSendingMessage || !isMessageLengthValid}
          aria-disabled={isSendingMessage}
          className="bg-blue-700 hover:bg-blue-900 transition text-white font-bold py-2 px-4 rounded w-full disabled:bg-blue-200 disabled:hover:bg-blue-200 mt-4"
        >
          {isSendingMessage ? "Enviando..." : "Enviar"}
        </button>
      </div>

      {status && <p className="mt-4 text-center text-white">{status}</p>}
    </div>
  );
}
