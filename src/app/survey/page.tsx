"use client";

import { Input } from "@/components/inputField";
import { MAX_MESSAGE_LENGTH } from "@/utils/constants";
import { useState } from "react";

type FormState = {
  name: string;
  serviceInterest: string;
  newServiceIdea: string;
};

export default function Survey() {
  const [form, setForm] = useState<FormState>({
    name: "",
    serviceInterest: "Sim",
    newServiceIdea: "",
  });
  const [status, setStatus] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const isMessageLengthValid = form.newServiceIdea.length <= MAX_MESSAGE_LENGTH;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSendMessage = async () => {
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
        body: JSON.stringify({
          name: form.name,
          serviceInterest: form.serviceInterest,
          newServiceIdea: form.newServiceIdea,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Respostas enviadas com sucesso! 😎");
        setForm({ name: "", serviceInterest: "Sim", newServiceIdea: "" });
      } else {
        setStatus(data.message || "Erro ao enviar o e-mail. 😮");
      }
    } catch (error) {
      setStatus("Erro ao enviar o e-mail.");
    } finally {
      setIsSendingMessage(false);
      setTimeout(() => setStatus(""), 2500);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center px-2 pt-[78px] md:pt-16 pb-[132px] md:pb-[64px]">
      <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <p className="text-sm md:text-base mb-4 text-center">
          Queremos saber sua opinião! 😊 <br />
          Responda abaixo e ajude a trazer novos serviços para nossa cidade.
        </p>

        <Input
          id="name"
          name="name"
          type="text"
          value={form.name}
          placeholder="Seu nome"
          onChange={handleChange}
          label="Nome (Opcional)"
          aria-required="false"
        />

        <label className="text-sm block mb-2 mt-4">
          Você gostaria de um site onde pudesse{" "}
          <strong>encontrar</strong> ou <strong>divulgar</strong> serviços de
          empresas e profissionais da cidade?
        </label>

        <div className="flex flex-col gap-2 mb-4">
          {["Sim", "Não", "Talvez"].map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="serviceInterest"
                value={option}
                checked={form.serviceInterest === option}
                onChange={handleChange}
                className="accent-blue-600"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>

        <label
          htmlFor="newServiceIdea"
          className="block text-xs md:text-sm mb-1"
        >
          Existe algum outro tipo de site ou serviço que você gostaria de ver na
          sua cidade? (Opcional)
        </label>

        <textarea
          id="newServiceIdea"
          name="newServiceIdea"
          value={form.newServiceIdea}
          rows={3}
          onChange={handleChange}
          className="w-full bg-gray-800 text-white border border-gray-600 p-2 rounded resize-none"
          placeholder="Digite sua sugestão ou ideia"
        />

        <p
          className={`text-xs md:text-sm mt-1 ${form.newServiceIdea.length > MAX_MESSAGE_LENGTH * 0.9
            ? "text-yellow-400"
            : "text-gray-300"
            }`}
        >
          {form.newServiceIdea.length}/{MAX_MESSAGE_LENGTH} caracteres
        </p>

        <button
          onClick={handleSendMessage}
          disabled={isSendingMessage || !isMessageLengthValid}
          aria-disabled={isSendingMessage}
          className="bg-blue-700 hover:bg-blue-900 transition text-white font-bold py-2 px-4 rounded w-full disabled:bg-blue-200 disabled:hover:bg-blue-200 mt-3"
        >
          {isSendingMessage ? "Enviando..." : "Enviar"}
        </button>
      </div>

      {status && (
        <p className="mt-4 text-center text-white" aria-live="polite">
          {status}
        </p>
      )}
    </div>
  );
}
