export default function About() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex flex-col items-center pb-2 py-4 pt-16">
      <main className="w-full max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-blue-300 mb-4">
          Sobre o Projeto
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          Este site nasceu da necessidade de encontrar rapidamente os novos CEPs
          das ruas da minha cidade,{" "}
          <span className="font-semibold">Limoeiro do Norte, Ceará</span>.
          Antes, utilizávamos um CEP geral, mas agora, com a mudança, a maioria
          das ruas possui um CEP específico.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          A ideia surgiu quando minha namorada precisou do CEP de uma rua e,
          para facilitar a vida dela e de outras pessoas, decidi criar uma
          ferramenta simples e prática.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Meu objetivo é ajudar os moradores da região a acessarem informações
          de maneira rápida e eficiente, especialmente para quem ainda está se
          adaptando às mudanças nos CEPs da cidade.
        </p>

        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Sobre mim</h3>
        <p className="text-lg leading-relaxed">
          Meu nome é{" "}
          <span className="font-semibold text-blue-300">
            Fernando Guerreiro
          </span>
          , desenvolvedor de software e apaixonado por resolver problemas
          através da tecnologia. Este projeto é apenas um exemplo de como a
          tecnologia pode facilitar a vida cotidiana.
        </p>
      </main>
    </div>
  );
}
