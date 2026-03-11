# ⚡ Freenergia

**Inteligência para o Mercado Livre de Energia**

Assistente especializado nos Procedimentos de Comercialização de Energia Elétrica da CCEE, com consulta em tempo real a documentos oficiais via web search.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Anthropic](https://img.shields.io/badge/Claude-API-D97706?logo=anthropic&logoColor=white)

---

## 📋 Sobre

O Freenergia é uma interface de chat que conecta profissionais do setor elétrico aos documentos oficiais da CCEE (Câmara de Comercialização de Energia Elétrica). O app utiliza a API da Anthropic (Claude) com **web search** integrado para buscar informações atualizadas diretamente de `ccee.org.br`.

### Perfis disponíveis

| Perfil | Foco | Estilo |
|--------|------|--------|
| ⚙️ **Técnico** | Medição, Contabilização, Sazonalização | Analítico, direto, baseado em evidências |
| 📈 **Comercial** | Contratos, MCSD, CCEAL, Liquidação | Conversacional, orientado a resultados |
| ⚖️ **Jurídico** | Penalidades, Infrações, Compliance | Formal, conservador, orientado a normas |

### Funcionalidades

- Consulta em tempo real a documentos oficiais da CCEE via web search
- Três perfis especializados com prompts otimizados
- Citação obrigatória de fontes (documento, módulo/seção, versão)
- Sugestões de perguntas por perfil
- Interface responsiva e moderna

---

## 🚀 Início Rápido

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- Uma chave de API da [Anthropic](https://console.anthropic.com/)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/freenergia.git
cd freenergia

# Instale as dependências
npm install

# Configure a variável de ambiente
cp .env.example .env
```

Edite o arquivo `.env` e adicione sua chave da API Anthropic:

```env
VITE_ANTHROPIC_API_KEY=sk-ant-sua-chave-aqui
```

### Executar em desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador.

### Build para produção

```bash
npm run build
npm run preview
```

---

## 🏗️ Arquitetura

```
freenergia/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx            # Componente principal (roteamento de telas)
│   ├── main.jsx           # Entry point React
│   ├── components/
│   │   ├── WelcomeScreen.jsx   # Tela de seleção de perfil
│   │   └── ChatScreen.jsx      # Interface de chat
│   ├── config/
│   │   ├── profiles.js         # Definição dos perfis e system prompts
│   │   └── suggestions.js      # Perguntas sugeridas por perfil
│   └── services/
│       └── anthropic.js        # Integração com a API Anthropic
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔑 Configuração da API

### Opção 1: Chamada direta do browser (desenvolvimento)

O app faz chamadas diretamente à API da Anthropic usando o header `anthropic-dangerous-direct-browser-access`. Isso é adequado para **desenvolvimento e testes locais**, mas **não é recomendado para produção** pois expõe a chave de API no client-side.

### Opção 2: Proxy backend (produção — recomendado)

Para produção, configure um proxy backend que receba as requisições do frontend e repasse à API da Anthropic mantendo a chave no servidor. O arquivo `src/services/anthropic.js` já suporta a variável `VITE_API_PROXY_URL` para este cenário.

Exemplo com um proxy simples (Express):

```javascript
// server.js (exemplo)
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(req.body),
  });
  const data = await response.json();
  res.json(data);
});

app.listen(3001);
```

---

## 🌐 Deploy

### Vercel

```bash
npm i -g vercel
vercel
```

Adicione `VITE_ANTHROPIC_API_KEY` nas variáveis de ambiente do projeto na Vercel.

### Netlify

```bash
npm run build
```

Faça upload da pasta `dist/` no Netlify e configure as variáveis de ambiente.

---

## 🔒 Segurança

> **⚠️ Importante:** Nunca commite sua chave de API. O arquivo `.env` já está no `.gitignore`.

Para produção, utilize sempre um proxy backend para intermediar as chamadas à API da Anthropic, evitando expor a chave no código client-side.

---

## 📄 Licença

MIT — veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/minha-feature`)
3. Commit suas mudanças (`git commit -m 'feat: minha nova feature'`)
4. Push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

---

<p align="center">
  Feito com ⚡ por <strong>Freenergia</strong><br>
  <sub>Baseado exclusivamente em documentos oficiais · ccee.org.br</sub>
</p>
