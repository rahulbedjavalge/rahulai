import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    // If a model API key is configured, you could proxy the request here.
    // For now we return a simple deterministic summary when no key is set.
    if (!text) return NextResponse.json({ summary: '' });

    // Simple extractive fallback: return first 300 chars as a 'summary'
    const summary = text.length > 300 ? text.slice(0, 300) + '…' : text;
    return NextResponse.json({ summary });
  } catch (err) {
    return NextResponse.json({ summary: '', error: String(err) }, { status: 500 });
  }
}
