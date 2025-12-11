import Link from "next/link";

export function Header() {
  return (
    <header className="bg-gray-900 text-white fixed top-0 w-full z-50 shadow-md">
      <div className="container mx-auto px-4 py-2 md:py-3 flex justify-between gap-y-1 items-center flex-wrap">
        <h1 className="text-sm md:text-xl font-bold">
          <Link href="/">Consulta de CEP</Link>
        </h1>
        <nav className="flex items-center gap-x-4 flex-wrap">
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
          <Link
            href="/prolocal"
            className="text-xs md:text-sm font-bold px-3 py-1 rounded
             bg-[#beee02] text-gray-900
             shadow-[0_0_8px_#beee02,0_0_12px_#beee02,0_0_20px_#beee02] hover:shadow-[0_0_12px_#beee02,0_0_20px_#beee02,0_0_28px_#beee02]
             transition-all duration-300"
          >
            ProLocal
          </Link>
        </nav>
      </div>
    </header>
  );
}
