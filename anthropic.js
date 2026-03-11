/**
 * Serviço de integração com a API da Anthropic.
 *
 * Modos de operação:
 *   1. PROXY (produção): defina VITE_API_PROXY_URL no .env apontando para seu backend.
 *      O frontend envia o payload para o proxy, que adiciona o header x-api-key no servidor.
 *
 *   2. DIRETO (desenvolvimento): defina VITE_ANTHROPIC_API_KEY no .env.
 *      O frontend chama a API da Anthropic diretamente usando
 *      o header "anthropic-dangerous-direct-browser-access".
 *      ⚠️  Não recomendado para produção — a chave fica exposta no client-side.
 */

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-20250514";
const MAX_TOKENS = 1024;

/**
 * Envia mensagens para a API da Anthropic e retorna o texto da resposta.
 *
 * @param {Object}   params
 * @param {string}   params.systemPrompt  – System prompt do perfil ativo
 * @param {Array}    params.messages       – Histórico de mensagens [{role, content}]
 * @returns {Promise<string>} Texto da resposta do modelo
 */
export async function sendMessage({ systemPrompt, messages }) {
  const proxyUrl = import.meta.env.VITE_API_PROXY_URL;
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

  const isDirect = !proxyUrl;

  if (isDirect && !apiKey) {
    throw new Error(
      "Configure VITE_ANTHROPIC_API_KEY ou VITE_API_PROXY_URL no arquivo .env"
    );
  }

  const url = proxyUrl || ANTHROPIC_URL;

  const headers = {
    "Content-Type": "application/json",
  };

  if (isDirect) {
    headers["x-api-key"] = apiKey;
    headers["anthropic-version"] = "2023-06-01";
    headers["anthropic-dangerous-direct-browser-access"] = "true";
  }

  const body = {
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: systemPrompt,
    tools: [{ type: "web_search_20250305", name: "web_search" }],
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();

  const text = data.content
    ?.filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("");

  return text || "Não foi possível obter resposta.";
}
