# Khan Academy Proxy com Script

Este projeto cria um site que carrega o site da Khan Academy (khanacademy.org) com um script JavaScript injetado automaticamente, hospedado no Vercel e acessível em dispositivos móveis e desktops.

## Estrutura do Projeto
- `public/index.html`: Frontend responsivo com iframe.
- `src/server.js`: Servidor proxy que injeta o script.
- `package.json`: Dependências e scripts.
- `vercel.json`: Configurações para deploy no Vercel.

## Pré-requisitos
- Node.js (>=14)
- Conta no Vercel
- Conta no GitHub

## Configuração Local
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/khan-proxy.git
   cd khan-proxy
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```
4. Acesse `http://localhost:3000` no navegador.

## Deploy no Vercel
1. Faça push do projeto para um repositório no GitHub.
2. No Vercel Dashboard, clique em "New Project" e importe o repositório.
3. Configure:
   - Framework Preset: Other
   - Root Directory: (deixe em branco)
   - Build Command: (deixe padrão)
   - Output Directory: (deixe padrão)
   - Install Command: `npm install`
4. Deploy o projeto. O Vercel fornecerá um URL (ex.: `https://khan-proxy.vercel.app`).

## Uso
- Acesse o URL fornecido pelo Vercel.
- O site carregará a Khan Academy com o script injetado automaticamente.
- O script replica o bookmarklet: `fetch("https://raw.githubusercontent.com/Niximkk/Khanware/refs/heads/main/Khanware.js").then(t=>t.text()).then(eval)`.

## Notas
- **Termos de Serviço**: Verifique os termos da Khan Academy (khanacademy.org) antes de usar, pois injetar scripts pode violar suas políticas.
- **Responsividade**: O site é compatível com dispositivos móveis graças ao Bootstrap e CSS personalizado.

## Licença
MIT