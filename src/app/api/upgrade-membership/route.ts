import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function POST(request: Request) {
  try {
    const { email, tier } = await request.json();
    if (!email || !tier) return NextResponse.json({ error: 'Email and tier required' }, { status: 400 });
    
    let user = db.users.find(u => u.email === email);
    if (!user) {
      user = {
        id: 'usr_' + Date.now(),
        email,
        name: email.split('@')[0],
        membershipTier: tier
      };
      db.users.push(user);
    } else {
      user.membershipTier = tier;
    }
    
    console.log(`\n\x1b[32m==================================================`);
    console.log(`[EMAIL SIMULATION] Sending Welcome Email to: ${email}`);
    console.log(`Message: Welcome to Vanguard ${tier.toUpperCase()}! Your premium features and store discounts are now unlocked.`);
    console.log(`==================================================\x1b[0m\n`);
    
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
