import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex flex-col items-center justify-center px-2 pt-16 pb-[116px]">
      <h1 className="text-white text-xl md:text-4xl font-bold">
        Página não encontrada
      </h1>
      <Link href="/" className="mt-2 text-blue-400 hover:underline">
        Voltar para a página inicial
      </Link>
    </div>
  );
}
