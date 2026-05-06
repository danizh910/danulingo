import { NextResponse, type NextRequest } from 'next/server';

const LEVEL_MAP: Record<string, string> = {
  es: 'Anfänger bis Grundkenntnisse',
  it: 'absoluter Anfänger',
  fr: 'Mittelstufe (Schul-Niveau)',
};

function buildSystemPrompt(language: string, scenario: string, langCode: string) {
  return `Du bist ein freundlicher Reise-Gesprächspartner. Führe ein Gespräch auf ${language} mit dem Nutzer.
Szenario: ${scenario}.
Korrigiere Fehler freundlich auf Deutsch (in Klammern, z.B. "[Korrektur: ...]").
Niveau: ${LEVEL_MAP[langCode] ?? 'Anfänger'}.
Halte Antworten kurz (max 2 Sätze).
Wenn der Nutzer noch nichts geschrieben hat, beginne das Gespräch passend zum Szenario auf ${language}.
Füge manchmal kleine Tipps auf Deutsch in Klammern ein.`;
}

async function callOllama(
  messages: { role: string; content: string }[],
  systemPrompt: string
): Promise<string> {
  const baseUrl = process.env.OLLAMA_API_URL!;
  const model = process.env.OLLAMA_MODEL ?? 'gemma3';

  const res = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      max_tokens: 256,
      stream: false,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Ollama error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '';
}

async function callClaude(
  messages: { role: string; content: string }[],
  systemPrompt: string
): Promise<string> {
  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 256,
    system: systemPrompt,
    messages: messages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

export async function POST(request: NextRequest) {
  const { messages, language, langCode, scenario } = await request.json();
  const systemPrompt = buildSystemPrompt(language, scenario, langCode);

  const formattedMessages = [...messages];
  if (formattedMessages.length === 0) {
    formattedMessages.push({
      role: 'user',
      content: `[Starte das Gespräch auf ${language} passend zum Szenario: ${scenario}]`,
    });
  }

  const useOllama = Boolean(process.env.OLLAMA_API_URL);
  const content = useOllama
    ? await callOllama(formattedMessages, systemPrompt)
    : await callClaude(formattedMessages, systemPrompt);

  return NextResponse.json({ content });
}
