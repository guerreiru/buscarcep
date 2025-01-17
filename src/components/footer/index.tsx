export function Footer() {
  return (
    <footer className=" bg-gray-800 text-white fixed bottom-0 w-full z-50 shadow-md">
      <div className="flex flex-col items-center py-2">
        <p className="text-sm mt-2">
          Contato:{" "}
          <a
            href="mailto:dev.fernandoguerreiro@gmail.com"
            className="hover:text-blue-300 hover:underline"
            aria-label="Enviar e-mail para dev.fernandoguerreiro@gmail.com"
          >
            dev.fernandoguerreiro@gmail.com
          </a>
        </p>
        <p className="text-sm mt-2">
          Telefone/WhatsApp:{" "}
          <a
            href="http://api.whatsapp.com/send?phone=5588999254660"
            className="hover:text-blue-300 hover:underline"
            aria-label="Ligar ou mandar uma mensagem no WhatsApp 88 99925 4660"
          >
            (88) 99925-4660
          </a>
        </p>
        <p className="text-xs mt-2">
          © 2025 Fernando Guerreiro. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
