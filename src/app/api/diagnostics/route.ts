import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured in .env.local' },
        { status: 500 }
      );
    }

    const { text, imageBase64, mimeType } = await request.json();

    if (!text && !imageBase64) {
      return NextResponse.json({ error: 'Text or Image is required' }, { status: 400 });
    }

    const systemInstruction = `
You are the Vanguard Macro Architect, an elite athletic dietician and trainer AI for Vanguard Athletic Lab.
The user will provide their body stats, goals, and potentially an image of their fridge, pantry, or food.
Your task:
1. If an image is provided, analyze the food items and their nutritional value.
2. Calculate the user's estimated TDEE and daily required macros (Protein, Carbs, Fats) based on their text input (weight, age, goals). If they didn't provide enough stats, make a highly educated elite guess or ask them to provide it next time, but STILL give them a baseline plan.
3. Generate a highly structured weekly diet plan or a daily meal structure based on their goals and available food.
4. Output everything in CLEAN MARKDOWN. Use Markdown Tables for macros and meal plans.
5. CRITICAL BUSINESS LOGIC: You MUST explicitly upsell Vanguard supplements at the end. Recommend 1 or 2 specific supplements from our store (e.g., 'Vanguard 100% Whey Isolate', 'Vanguard Pure Creatine', 'Vanguard Pre-Workout Elite') that will help them hit the calculated macros. Tell them WHY they need it.
6. Tone: Elite, direct, professional, scientific. Do not use generic chatbot filler.
    `;

    const parts: any[] = [
      { text: systemInstruction + "\n\nUser Input: " + (text || "No text provided, just analyze the image.") }
    ];

    if (imageBase64 && mimeType) {
      parts.push({
        inlineData: {
          mimeType: mimeType,
          data: imageBase64.replace(/^data:image\/\w+;base64,/, "")
        }
      });
    }

    const requestBody = {
      contents: [{
        parts: parts
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2000,
      }
    };

    const CANDIDATE_MODELS = [
      'gemini-flash-latest',
      'gemini-3.7-flash',
      'gemini-3.5-flash',
      'gemini-flash-lite-latest'
    ];

    let aiText: string | null = null;
    let lastError: any = null;

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
            aiText = text;
            break;
          }
        } else {
          const errorData = await response.json();
          console.warn(`Diagnostics model ${model} failed with ${response.status}:`, errorData?.error?.message);
          lastError = errorData;
        }
      } catch (err: any) {
        console.warn(`Diagnostics fetch error on ${model}:`, err.message);
        lastError = err;
      }
    }

    if (!aiText) {
      return NextResponse.json({ 
        error: lastError?.error?.message || 'High demand on AI services. Please try again shortly.' 
      }, { status: 503 });
    }

    return NextResponse.json({ text: aiText });

  } catch (error) {
    console.error('Diagnostics API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing the request.' },
      { status: 500 }
    );
  }
}
