import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are Vanguard AI, the elite personal trainer, nutritionist, and macro architect for Vanguard Athletic Lab. 
Your tone is confident, professional, and elite (like a top-tier athletic coach). 
You provide data-driven, research-backed advice on bodybuilding, strength training, and nutrition.
When users ask for workout plans, provide structured, periodized routines.
When asked about supplements, suggest specific, scientifically-backed ingredients.
Keep responses concise but highly informative, formatted nicely with markdown if possible. No fluff.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured in .env.local' },
        { status: 500 }
      );
    }

    // Format messages for Gemini API
    const geminiMessages = messages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Inject system prompt into the first message or as a separate system instruction
    const requestBody = {
      contents: geminiMessages,
      systemInstruction: {
        role: "user",
        parts: [{ text: SYSTEM_PROMPT }]
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API Error:', errorData);
      return NextResponse.json({ error: 'Failed to generate response from AI.' }, { status: response.status });
    }

    const data = await response.json();
    
    // Extract text from response
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble processing that right now.";

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
