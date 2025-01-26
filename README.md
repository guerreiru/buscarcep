# Consulta de CEPs por Nome de Rua 🏠

Este projeto é um site desenvolvido para buscar CEPs de ruas de forma simples e intuitiva. A ideia surgiu a partir de uma necessidade real: minha cidade, Limoeiro do Norte, antes possuía um único CEP para toda a cidade, mas recentemente adotou CEPs específicos para cada rua. 

Por isso, criei esta aplicação para facilitar a consulta de CEPs diretamente pelo nome da rua.

### 🔗 Acesse o Site
O projeto está disponível em produção no link abaixo:  
👉 [buscarcep](https://buscarcep.app.br/)

---

## 🚀 Tecnologias Utilizadas
- **[Next.js](https://nextjs.org/):** Framework para React, focado em performance e renderização do lado do servidor.
- **[TypeScript](https://www.typescriptlang.org/):** Superset de JavaScript para garantir tipagem estática e maior segurança no desenvolvimento.
- **[Tailwind CSS](https://tailwindcss.com/):** Framework de CSS para estilização rápida e moderna.
- **[API ViaCEP](https://viacep.com.br/):** Serviço gratuito para consultas de CEP.

---

## ⚙️ Funcionalidades
- **Busca por nome da rua:** Insira o nome da rua e encontre o CEP correspondente.
- **Correção de Abreviações:** Identifica e corrige diferenças entre termos como "Av." e "Avenida" para melhorar a precisão dos resultados.
- **Design Responsivo:** Funciona perfeitamente em dispositivos móveis e desktops.

---

## 🛠️ Desafios Enfrentados
- **Problema com Abreviações na API ViaCEP:** A API não retorna resultados se o nome da rua for abreviado de forma diferente. Por exemplo, "Avenida Antônio Joaquim" não é encontrado ao buscar por "Av. Antônio Joaquim". Para solucionar isso, implementei ajustes automáticos para lidar com as diferenças.
- **Performance:** Otimizei o uso da API para garantir que as buscas sejam rápidas e eficientes.

---

## 📦 Como Rodar o Projeto Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/guerreiru/buscarcep.git

2. **Acesse o diretório do projeto:**
   ```bash
   cd buscarcep

3. **Instale as dependências:**
   ```bash
   npm install

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev

5. **Abra o navegador:**
   ```bash
   O projeto estará rodando em http://localhost:3000

🌟 Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request com melhorias e novas ideias.

📞 Contato
Se tiver dúvidas ou quiser conversar sobre o projeto, entre em contato comigo:

E-mail: [![Gmail Badge](https://img.shields.io/badge/-dev.fernandoguerreiro@gmail.com-EA4335?style=flat-square&logo=Gmail&logoColor=white&link=mailto:dev.fernandoguerreiro@gmail.com)](mailto:dev.fernandoguerreiro@gmail.com)

Linkedin: [![Linkedin Badge](https://img.shields.io/badge/-Fernando%20Guerreiro-1293d2?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/guerreiru/)](https://www.linkedin.com/in/guerreiru/) 
