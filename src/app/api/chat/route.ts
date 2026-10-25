import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are Vanguard AI, the elite personal trainer, nutritionist, and macro architect for Vanguard Athletic Lab. 
Your tone is confident, professional, and elite (like a top-tier athletic coach). 
You provide data-driven, research-backed advice on bodybuilding, strength training, and nutrition.
When users ask for workout plans, provide structured, periodized routines.
When asked about supplements, suggest specific, scientifically-backed ingredients.
Keep responses concise but highly informative, formatted nicely with markdown if possible. No fluff.`;

const CANDIDATE_MODELS = [
  'gemini-flash-latest',
  'gemini-3.7-flash',
  'gemini-3.5-flash',
  'gemini-flash-lite-latest'
];

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

    const requestBody = {
      contents: geminiMessages,
      systemInstruction: {
        role: "user",
        parts: [{ text: SYSTEM_PROMPT }]
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1200,
      }
    };

    let generatedText: string | null = null;
    let lastError: any = null;

    // Cascade through candidate models if one is 503 or unavailable
    for (const model of CANDIDATE_MODELS) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            generatedText = text;
            break;
          }
        } else {
          const errData = await response.json();
          console.warn(`Model ${model} returned ${response.status}:`, errData?.error?.message || errData);
          lastError = errData;
        }
      } catch (err: any) {
        console.warn(`Fetch error for ${model}:`, err.message);
        lastError = err;
      }
    }

    if (generatedText) {
      return NextResponse.json({ text: generatedText });
    }

    // Intelligent athletic fallback if upstream Google servers are in a high-demand spike
    const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
    let fallbackText = "Our elite coaching system recommends maintaining a structured protocol. Focus on progressive overload, adequate protein intake (1g per pound of bodyweight), and consistent recovery.";

    if (lastUserMessage.includes('bulk')) {
      fallbackText = "### Vanguard Bulking Protocol\n\n1. **Caloric Surplus:** Aim for 300–500 kcal above maintenance to ensure lean mass accrual without excessive adiposity.\n2. **Macronutrient Split:**\n   - **Protein:** 1.0–1.2g per lb of bodyweight (Lean beef, chicken, whey isolate, eggs)\n   - **Carbohydrates:** 2.0–3.0g per lb (Oats, jasmine rice, sweet potatoes, cream of rice)\n   - **Fats:** 0.35–0.45g per lb (Avocados, extra virgin olive oil, nuts)\n3. **Training Synergy:** Progressive overload on compound movements (Squat, Deadlift, Bench, Overhead Press) in the 6–10 rep range.\n4. **Recommended Vanguard Supplement:** *Vanguard 100% Whey Isolate* + *Pure Creapure Creatine* (5g daily) for intracellular volumization.";
    } else if (lastUserMessage.includes('cut') || lastUserMessage.includes('fat')) {
      fallbackText = "### Vanguard Cutting & Shred Protocol\n\n1. **Caloric Deficit:** 400–500 kcal below maintenance to protect lean skeletal tissue while oxidizing visceral and subcutaneous fat.\n2. **High Protein Priority:** Elevate protein to 1.2–1.4g per lb to optimize nitrogen retention during caloric restriction.\n3. **Cardio Strategy:** 8,000–12,000 daily steps combined with 2x weekly Zone 2 incline treadmill work.\n4. **Recommended Supplement:** *Vanguard Pre-Workout Elite* + *L-Carnitine Complex*.";
    }

    return NextResponse.json({ text: fallbackText });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
