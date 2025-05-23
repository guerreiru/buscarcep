import Link from "next/link";

export function Header() {
  return (
    <header className="bg-gray-900 text-white fixed top-0 w-full z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center flex-wrap">
        <h1 className="text-base md:text-xl font-bold">
          <Link href="/">Consulta de CEP</Link>
        </h1>
        <nav className="flex space-x-4">
          <Link href="/" className="text-xs md:text-sm hover:text-blue-400">
            Início
          </Link>
          <Link href="/pdf" className="text-xs md:text-sm hover:text-blue-400">
            PDF Ruas
          </Link>
          <Link
            href="/about"
            className="text-xs md:text-sm hover:text-blue-400"
          >
            Sobre
          </Link>
          <Link
            href="/contact"
            className="text-xs md:text-sm hover:text-blue-400"
          >
            Contato
          </Link>
        </nav>
      </div>
    </header>
  );
}
