export default function ProlocalPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black dark:text-white">
            ProLocal
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-black dark:text-white">
            Conectando Profissionais à Comunidade
          </p>
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            A plataforma que conecta você aos melhores profissionais e serviços
            da sua região. Seja você um cliente em busca de soluções ou um
            profissional querendo expandir seus negócios.
          </p>
          <a
            href="https://www.prolocal.com.br/register?type=client"
            target="_blank"
            className="inline-block bg-[#beee02] hover:bg-[#a8d402] text-black font-bold text-lg px-10 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Comece Agora - É Grátis!
          </a>
        </div>
      </section>

      {/* Para Clientes Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-[#000000]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center text-black dark:text-white">
            👤 Para Clientes
          </h2>
          <h3 className="text-2xl mb-8 text-center text-gray-700 dark:text-gray-300">
            Encontre o Profissional Ideal Perto de Você
          </h3>
          <p className="text-lg mb-8 text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
            Precisa de um eletricista? Encanador? Professor particular?
            Designer? No ProLocal, você encontra profissionais qualificados na
            sua cidade com apenas alguns cliques.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: "🔍",
                title: "Busca Inteligente",
                desc: "Encontre serviços por categoria, localização ou nome",
              },
              {
                icon: "📍",
                title: "Filtro por Localização",
                desc: "Veja apenas profissionais que atendem na sua região",
              },
              {
                icon: "⭐",
                title: "Avaliações",
                desc: "Leia avaliações de outros clientes antes de contratar",
              },
              {
                icon: "💰",
                title: "Comparação de Preços",
                desc: "Veja valores e tipos de cobrança",
              },
              {
                icon: "📱",
                title: "Contato Direto",
                desc: "Entre em contato via WhatsApp de forma rápida",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#0a0a0a] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold mb-2 text-black dark:text-white">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-[#0a0a0a] p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-800">
            <h4 className="text-2xl font-bold mb-4 text-black dark:text-white">
              Como Funciona:
            </h4>
            <ol className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="bg-[#beee02] text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                  1
                </span>
                <span>Cadastre-se gratuitamente como cliente</span>
              </li>
              <li className="flex items-start">
                <span className="bg-[#beee02] text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                  2
                </span>
                <span>Busque o serviço que você precisa</span>
              </li>
              <li className="flex items-start">
                <span className="bg-[#beee02] text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                  3
                </span>
                <span>
                  Filtre por localização para encontrar profissionais perto de
                  você
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-[#beee02] text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                  4
                </span>
                <span>Compare perfis e avaliações para escolher o melhor</span>
              </li>
              <li className="flex items-start">
                <span className="bg-[#beee02] text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                  5
                </span>
                <span>
                  Entre em contato direto com o profissional escolhido
                </span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Para Profissionais Section */}
      <section className="py-16 px-4 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center text-black dark:text-white">
            💼 Para Profissionais e Empresas
          </h2>
          <h3 className="text-2xl mb-8 text-center text-gray-700 dark:text-gray-300">
            Alcance Mais Clientes e Cresça Seu Negócio
          </h3>
          <p className="text-lg mb-8 text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
            Você é profissional autônomo, prestador de serviços ou possui uma
            empresa? O ProLocal é a vitrine perfeita para mostrar seu trabalho e
            conquistar novos clientes na sua região.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: "📝",
                title: "Perfil Profissional",
                desc: "Crie um perfil detalhado com seus dados e portfólio",
              },
              {
                icon: "🛠️",
                title: "Gestão de Serviços",
                desc: "Cadastre e gerencie todos os serviços que você oferece",
              },
              {
                icon: "💵",
                title: "Definição de Preços",
                desc: "Configure valores e tipos de cobrança",
              },
              {
                icon: "📊",
                title: "Painel de Controle",
                desc: "Visualize seus serviços e gerencie tudo em um só lugar",
              },
              {
                icon: "⭐",
                title: "Sistema de Avaliações",
                desc: "Receba avaliações e construa sua reputação",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-[#000000] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold mb-2 text-black dark:text-white">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section className="py-16 px-4 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-black dark:text-white">
            🌟 Diferenciais do ProLocal
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "📍",
                title: "Foco em Serviços Locais",
                items: [
                  "Busca por estado e cidade",
                  "Conectando pessoas da mesma região",
                  "Fortalecendo a economia local",
                ],
              },
              {
                icon: "💚",
                title: "Gratuito para Começar",
                items: [
                  "Cadastro gratuito para clientes e profissionais",
                  "Planos premium com benefícios extras (disponível em breve)",
                ],
              },
              {
                icon: "🎯",
                title: "Interface Simples e Intuitiva",
                items: [
                  "Design moderno e responsivo",
                  "Funciona em celular, tablet e desktop",
                  "Modo escuro disponível",
                ],
              },
              {
                icon: "⚡",
                title: "Conexão Rápida",
                items: [
                  "Contato direto via WhatsApp",
                  "Sem intermediários desnecessários",
                  "Negociação direta",
                ],
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-[#000000] p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-3">{item.icon}</span>
                  <h3 className="text-2xl font-bold text-black dark:text-white">
                    {item.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {item.items.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className="flex items-start text-gray-700 dark:text-gray-300"
                    >
                      <span className="text-[#beee02] mr-2">•</span>
                      <span>{subItem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cadastro"
        className="py-20 px-4 bg-[#beee02] dark:bg-[#beee02]"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            🤝 Junte-se à Comunidade ProLocal
          </h2>
          <p className="text-xl mb-8 text-black">
            Seja você um <strong>cliente em busca de qualidade</strong> ou um{" "}
            <strong>profissional querendo crescer</strong>, o ProLocal é a
            plataforma que une necessidades e oportunidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.prolocal.com.br/register?type=client"
              target="_blank"
              className="bg-black hover:bg-[#0a0a0a] text-white font-bold text-lg px-10 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Cadastrar como Cliente
            </a>
            <a
              href="https://www.prolocal.com.br/register?type=professional"
              target="_blank"
              className="bg-white hover:bg-gray-100 text-black font-bold text-lg px-10 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Cadastrar como Profissional
            </a>
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section className="py-16 px-4 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-black dark:text-white">
            📞 Suporte e Contato
          </h2>
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            Tem dúvidas ou precisa de ajuda? Entre em contato conosco:
          </p>
          <div className="space-y-4 text-lg">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-black dark:text-white">
                📧 Email:
              </span>{" "}
              <a href="mailto:suporteprolocal@gmail.com">
                suporteprolocal@gmail.com
              </a>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-black dark:text-white">
                💬 WhatsApp:
              </span>{" "}
              <a href="tel:+5588999254660">(88) 99925-4660</a>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-black dark:text-white">
                🌐 Site:
              </span>{" "}
              <a
                href="https://www.prolocal.com.br/"
                className="text-[#beee02] hover:underline"
              >
                www.prolocal.com.br
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-black dark:bg-[#000000] text-center">
        <p className="text-white text-lg font-semibold">
          ProLocal - Conectando Profissionais à Comunidade 🚀
        </p>
      </footer>
    </div>
  );
}
