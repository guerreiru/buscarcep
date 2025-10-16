"use client";

import { Input } from "@/components/inputField";
import { MAX_MESSAGE_LENGTH } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function Survey() {
  const [name, setName] = useState("");
  const [serviceInterest, setServiceInterest] = useState("Sim");
  const [newServiceIdea, setNewServiceIdea] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!serviceInterest.trim()) return;

    setLoading(true);
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, serviceInterest: serviceInterest === "Sim" ? true : false, newServiceIdea }),
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex flex-col items-center px-2 pt-[72px] pb-[164px] md:pb-[132px]">
      <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        {!submitted ? (
          <>
            <p className="text-xs md:text-base mb-4">
              Gostaríamos de saber sua opinião sobre futuros serviços!
            </p>

            <Input
              id="email"
              name="email"
              required
              type="email"
              value={name}
              placeholder="Digite seu nome (opcional)"
              onChange={(e) => setName(e.target.value)}
              label="Nome (opcional)"
            />

            {/* Pergunta com radio buttons */}
            <label className="text-sm block mb-2">
              Você gostaria de um serviço onde pudesse buscar por empresas ou
              profissionais, ou divulgar o seu próprio serviço?
            </label>
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="serviceInterest"
                  value="Sim"
                  checked={serviceInterest === "Sim"}
                  onChange={(e) => setServiceInterest(e.target.value)}
                  className="accent-green-600"
                />
                <span className="text-sm">Sim</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="serviceInterest"
                  value="Não"
                  checked={serviceInterest === "Não"}
                  onChange={(e) => setServiceInterest(e.target.value)}
                  className="accent-green-600"
                />
                <span className="text-sm">Não</span>
              </label>
            </div>

            {/* Outra pergunta */}
            <label className="text-sm block mb-1">
              Você gostaria de algum outro site ou serviço que atualmente não
              existe na sua cidade? (opcional)
            </label>
            <textarea
              value={newServiceIdea}
              onChange={(e) => setNewServiceIdea(e.target.value)}
              rows={3}
              placeholder="Digite sua ideia aqui..."
              className="w-full bg-gray-800 text-white border border-gray-600 p-2 rounded"
            />

            {/* Botões */}
            <div className="flex justify-end gap-2 mt-2">
              <button
                className="text-gray-300 hover:text-gray-100 text-sm"
                onClick={() => router.back()}
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-semibold disabled:opacity-70"
              >
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-green-400 font-semibold">
            Obrigado pelo seu feedback! 💚
          </p>
        )}
      </div>

    </div>
  );
}
