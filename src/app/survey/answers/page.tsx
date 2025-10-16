'use client';

import { Input } from "@/components/inputField";
import { FormEvent, useState } from "react";

type Feedback = {
  id: number,
  name?: string | null,
  serviceInterest: boolean,
  newServiceIdea?: string | null,
  createdAt: Date
}

export default function Answers() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user.trim() || !pass.trim()) return;

    setLoading(true);
    if (user === process.env.NEXT_PUBLIC_USER && pass === process.env.NEXT_PUBLIC_PASS) {
      const feedbacks = await fetch("/api/feedback", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await feedbacks.json();

      setFeedbacks(data.feedbacks);

    } else {
      alert("Usuário ou senha incorretos.");
    }
    setLoading(false);
  };


  return <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex flex-col items-center px-2 pt-[78px] md:pt-16 pb-[164px] md:pb-[132px]">
    <form className="bg-gray-700 text-white p-6 rounded-lg shadow-lg w-full max-w-xs" onSubmit={handleSubmit}>
      <Input
        id="user"
        name="user"
        required
        type="text"
        value={user}
        placeholder="Digite seu usuário"
        onChange={(e) => setUser(e.target.value)}
        label="Usuário"
      />

      <Input
        id="pass"
        name="pass"
        required
        type="password"
        value={pass}
        placeholder="Digite sua senha"
        onChange={(e) => setPass(e.target.value)}
        label="Senha"
      />

      <button
        disabled={loading}
        className="bg-blue-700 hover:bg-blue-900 transition text-white font-bold py-2 px-4 rounded disabled:bg-blue-200 disabled:hover:bg-blue-200 w-full"
        type="submit"
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </form>

    {feedbacks.length > 0 && (
      <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg mt-6 overflow-x-auto">
        {feedbacks.map((fb) => (
          <div key={fb.id} className="border-b border-gray-600 py-2 last:border-0">
            <p><strong>Nome:</strong> {fb.name || "Não fornecido"}</p>
            <p><strong>Interessado no serviço:</strong> {fb.serviceInterest ? "Sim" : "Não"}</p>
            <p><strong>Ideia de novo serviço:</strong> {fb.newServiceIdea || "Não fornecido"}</p>
            <p className="text-sm text-gray-400"><em>Enviado em: {new Date(fb.createdAt).toLocaleString()}</em></p>
          </div>
        ))}
      </div>
    )}
  </div>
}