import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, planData } = await request.json();
    if (!email || !planData) return NextResponse.json({ error: 'Email and planData required' }, { status: 400 });
    
    console.log(`\n\x1b[36m==================================================`);
    console.log(`[EMAIL SIMULATION] Sending Macro Plan to: ${email}`);
    console.log(`Plan Details: ${planData.calories} kcal | ${planData.protein}g Protein | ${planData.carbs}g Carbs | ${planData.fat}g Fats`);
    console.log(`==================================================\x1b[0m\n`);
    
    return NextResponse.json({ success: true, message: 'Plan sent successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
