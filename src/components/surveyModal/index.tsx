"use client";

import { useState } from "react";

interface SurveyModalProps {
  onClose: () => void;
}

export function SurveyModal({ onClose }: SurveyModalProps) {
  const [name, setName] = useState("");
  const [serviceInterest, setServiceInterest] = useState("Sim");
  const [newServiceIdea, setNewServiceIdea] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setTimeout(onClose, 2000);
  };

  return (
    <div className="fixed inset-0 px-2 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-700 p-6 rounded-lg w-full max-w-sm text-white shadow-lg">
        {!submitted ? (
          <>
            <p className="text-sm mb-3">
              Gostaríamos de saber sua opinião sobre futuros serviços!
            </p>

            {/* Nome */}
            <label className="text-sm block mb-1">Nome (opcional)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome (opcional)"
              className="w-full p-2 mb-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
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
              className="w-full p-2 mb-4 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
            />

            {/* Botões */}
            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="text-gray-300 hover:text-gray-100 text-sm"
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
