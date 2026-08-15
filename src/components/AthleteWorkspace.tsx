"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  Clock, 
  Users, 
  CheckSquare, 
  ChevronRight, 
  Calculator, 
  Sparkles, 
  Utensils, 
  ShieldCheck, 
  Activity, 
  RotateCcw,
  Plus,
  Download,
  Lock,
  Mail,
  Send
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

export default function AthleteWorkspace() {
  // Calculator States
  const [age, setAge] = useState<number>(24);
  const [weight, setWeight] = useState<number>(170);
  const [unit, setUnit] = useState<'lbs' | 'kg'>('lbs');
  const [height, setHeight] = useState<number>(175);
  const [heightUnit, setHeightUnit] = useState<'cm' | 'in'>('cm');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'light' | 'moderate' | 'active' | 'extreme'>('moderate');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [trainingMinutes, setTrainingMinutes] = useState<number>(60);
  const [goal, setGoal] = useState<'bulk' | 'cut' | 'maintain'>('maintain');
  const [calculated, setCalculated] = useState<boolean>(true);

  // Timetable gender tab
  const [selectedGenderTab, setSelectedGenderTab] = useState<'male' | 'female'>('male');
  
  // Timetable split type state
  const [selectedSplitType, setSelectedSplitType] = useState<'ppl' | 'arnold' | 'fullbody' | 'strength'>('ppl');

  // Auth & Email states
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // Interactive Checklist states
  const [preps, setPreps] = useState([
    { id: 1, text: 'Administer 5g Micronized Creatine 30m prior to lifting', done: true },
    { id: 2, text: 'Hydrate with 750ml electrolyte formulation', done: true },
    { id: 3, text: '10-minute progressive dynamic physical warmup & joint rotation', done: false },
    { id: 4, text: 'Secure heavy duty lifting belt & dynamic wrist straps', done: false },
    { id: 5, text: 'Mental focus visualization & audio pre-stimulation', done: false },
  ]);

  const togglePrep = (id: number) => {
    setPreps(prev => prev.map(p => p.id === id ? { ...p, done: !p.done } : p));
  };

  // Convert weight to kg for standard formula
  const weightInKg = unit === 'lbs' ? weight * 0.45359237 : weight;
  // Convert height to cm for standard formula
  const heightInCm = heightUnit === 'in' ? height * 2.54 : height;

  // Real-time calculated outputs based on athlete inputs using Mifflin-St Jeor equation
  const calculateMacros = () => {
    let bmr = 0;
    
    // BMR formula (Mifflin-St Jeor)
    if (gender === 'male') {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
    } else {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
    }

    // Activity level multipliers
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      extreme: 1.9
    };
    
    const activityMultiplier = multipliers[activityLevel] || 1.55;
    let tdee = bmr * activityMultiplier;

    // fine-tune adjustment with lifting time
    tdee += (trainingMinutes * 1.5);

    // Adjust for fitness goal
    let calories = 0;
    let proteinGrams = 0;

    if (goal === 'bulk') {
      calories = tdee + 350;
      proteinGrams = weightInKg * 2.0; // 2.0g per kg
    } else if (goal === 'cut') {
      calories = tdee - 450;
      proteinGrams = weightInKg * 2.4; // higher protein on a cut (2.4g per kg)
    } else {
      calories = tdee;
      proteinGrams = weightInKg * 2.1; // maintenance level
    }

    // Safety floors
    const safetyFloor = gender === 'male' ? 1500 : 1200;
    if (calories < safetyFloor) {
      calories = safetyFloor;
    }

    calories = Math.round(calories);
    proteinGrams = Math.round(proteinGrams);

    // Fat: ~20% for cut, ~25% for bulk/maintain
    const fatPercent = goal === 'cut' ? 0.20 : 0.25;
    let fatGrams = Math.round((calories * fatPercent) / 9);

    // Carbs: Remaining calories
    const proteinCal = proteinGrams * 4;
    const fatCal = fatGrams * 9;
    let carbGrams = Math.round((calories - proteinCal - fatCal) / 4);
    if (carbGrams < 50) {
      carbGrams = 50;
    }

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calories,
      protein: proteinGrams,
      carbs: carbGrams,
      fat: fatGrams,
      water: (weightInKg * 0.033 + (trainingMinutes / 60) * 0.7).toFixed(1), // Liters of water
    };
  };

  const results = calculateMacros();

  const handleEmailPlan = async () => {
    if (!user) return;
    setEmailStatus('sending');
    try {
      const res = await fetch('/api/email-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, planData: results }),
      });
      if (res.ok) {
        setEmailStatus('sent');
        setTimeout(() => setEmailStatus('idle'), 3000);
      } else {
        setEmailStatus('error');
      }
    } catch (err) {
      setEmailStatus('error');
    }
  };

  // Gender specific routine splits Database
  const routinesDatabase = {
    male: {
      ppl: [
        { day: 'Monday', workout: 'PUSH A (CHEST & TRICEPS FOCUS)', exercises: ['Incline Barbell Bench: 4x6', 'Flat Dumbbell Press: 3x8', 'Overhead Dumbbell Extension: 3x10', 'Tricep Rope Pushdown: 3x12', 'Cable Lateral Raise: 4x15'] },
        { day: 'Tuesday', workout: 'PULL A (LAT & BICEPS FOCUS)', exercises: ['Weighted Pull-ups: 4x6', 'Barbell Row: 3x8', 'Incline Dumbbell Curl: 3x10', 'Hammer Curl: 3x12', 'Rear Delt Fly: 4x15'] },
        { day: 'Wednesday', workout: 'LEGS A (QUAD & CALF FOCUS)', exercises: ['Barbell Back Squat: 4x6', 'Romanian Deadlift: 3x8', 'Leg Extension: 3x12', 'Seated Calf Raise: 4x15', 'Hanging Leg Raise: 4x12'] },
        { day: 'Thursday', workout: 'PUSH B (SHOULDERS & UPPER CHEST)', exercises: ['Overhead Press: 4x6', 'Incline Dumbbell Fly: 3x10', 'Dips (Weighted): 3x8', 'Skull Crushers: 3x12', 'Lateral Raise: 4x15'] },
        { day: 'Friday', workout: 'PULL B (UPPER BACK & BICEPS)', exercises: ['Chest Supported Row: 4x8', 'Lat Pulldown: 3x10', 'Preacher Curl: 3x12', 'Cable Face Pull: 3x15', 'Shrugs: 3x12'] },
        { day: 'Saturday', workout: 'LEGS B (HAMSTRING & ABS FOCUS)', exercises: ['Deadlift: 3x5', 'Leg Press: 3x10', 'Lying Leg Curl: 3x12', 'Standing Calf Raise: 4x15', 'Ab Wheel Rollouts: 3x12'] },
        { day: 'Sunday', workout: 'REST / RECOVERY LAB', exercises: ['Active Stretching & Foam Roll', 'Light 30m Zone 2 Cardio', 'Hydration Assessment & Prep'] },
      ],
      arnold: [
        { day: 'Monday', workout: 'CHEST & BACK (MASS BUILDING)', exercises: ['Incline Dumbbell Press: 4x8', 'Bent-Over Row: 4x8', 'Flat Barbell Bench: 3x10', 'Lat Pulldown: 3x10', 'Dumbbell Pullover: 3x12'] },
        { day: 'Tuesday', workout: 'SHOULDERS & ARMS (SUPERSETS)', exercises: ['Seated DB Press: 4x10', 'Barbell Bicep Curl: 4x10', 'Skull Crushers: 4x10', 'Lateral Raise: 4x15', 'Hammer Curl: 3x12'] },
        { day: 'Wednesday', workout: 'LEGS & ABS (POSTERIOR CHAIN)', exercises: ['Barbell Back Squat: 4x8', 'Romanian Deadlift: 4x8', 'Leg Extension: 3x15', 'Lying Leg Curl: 3x15', 'Hanging Leg Raise: 4x15'] },
        { day: 'Thursday', workout: 'CHEST & BACK (HYPERTROPHY)', exercises: ['Dips (Weighted): 4x8', 'Weighted Chin-ups: 4x8', 'Incline Flyes: 3x12', 'T-Bar Row: 3x10', 'Cable Crossover: 3x15'] },
        { day: 'Friday', workout: 'SHOULDERS & ARMS (PUMP FOCUS)', exercises: ['Seated Barbell Press: 4x8', 'Incline DB Curl: 3x12', 'Tricep Pushdown: 3x15', 'Dumbbell Lateral Raise: 4x20', 'Concentration Curl: 3x12'] },
        { day: 'Saturday', workout: 'LEGS & ABS (VOLUME FOCUS)', exercises: ['Leg Press: 4x12', 'Hack Squat: 3x10', 'Seated Leg Curl: 3x15', 'Standing Calf Raise: 4x20', 'Plank Variations: 4x60s'] },
        { day: 'Sunday', workout: 'REST / MOVEMENT PREP', exercises: ['Yin Yoga or mobility flow', 'Outdoor Ruck Walk (15 lbs)', 'Sleep hygiene optimization'] },
      ],
      fullbody: [
        { day: 'Monday', workout: 'FULL BODY A (SQUAT STRENGTH)', exercises: ['Barbell Back Squat: 4x5', 'Incline DB Bench Press: 3x8', 'Barbell Row: 3x8', 'Leg Curl: 3x12', 'Cable Lateral Raise: 3x15'] },
        { day: 'Tuesday', workout: 'ACTIVE RECOVERY', exercises: ['Low-Intensity Cardio: 30m', 'Foam Rolling & Joint Mobility', 'Hydration optimization'] },
        { day: 'Wednesday', workout: 'FULL BODY B (DEADLIFT POWER)', exercises: ['Deadlift: 3x5', 'Overhead Press: 3x8', 'Pull-ups: 3x max reps', 'Dumbbell Lunges: 3x12 per leg', 'Plank: 3x60s'] },
        { day: 'Thursday', workout: 'ACTIVE RECOVERY', exercises: ['Swimming or Light Cycling: 30m', 'Dynamic stretches', 'Sauna session'] },
        { day: 'Friday', workout: 'FULL BODY C (BENCH HYPERTROPHY)', exercises: ['Barbell Bench Press: 4x6', 'Romanian Deadlift: 3x10', 'Lat Pulldown: 3x10', 'Leg Extension: 3x15', 'EZ-Bar Bicep Curl: 3x12'] },
        { day: 'Saturday', workout: 'REST / COGNITIVE DETOX', exercises: ['Light outdoor walking: 10k steps', 'Deep breathing meditation', 'Contrast therapy'] },
        { day: 'Sunday', workout: 'REST / LAB MEAL PREP', exercises: ['Macro meal sorting', 'Full body stretch routine', 'Pre-workout planning'] },
      ],
      strength: [
        { day: 'Monday', workout: 'BENCH PRESS DAY (PEAK FORCE)', exercises: ['Competition Bench: 5x3 @85%', 'Close Grip Bench: 3x6', 'Barbell Row: 4x8', 'Dumbbell Lateral Raise: 3x12', 'Face Pulls: 3x15'] },
        { day: 'Tuesday', workout: 'SQUAT DAY (PEAK FORCE)', exercises: ['Competition Squat: 5x3 @85%', 'Pause Squat: 3x5 @70%', 'Leg Press: 3x10', 'Hanging Leg Raise: 3x12', 'Standing Calf Raise: 3x15'] },
        { day: 'Wednesday', workout: 'REST / ACTIVE THERAPY', exercises: ['Mobility drills', 'Contrast shower / Ice bath', 'Steady walking'] },
        { day: 'Thursday', workout: 'OVERHEAD PRESS (POWER)', exercises: ['Overhead Press: 5x3', 'Incline Bench Press: 3x6', 'Weighted Pull-ups: 3x6', 'Tricep Dips: 3x10', 'EZ Bar Curls: 3x12'] },
        { day: 'Friday', workout: 'DEADLIFT DAY (PEAK FORCE)', exercises: ['Competition Deadlift: 5x2 @87%', 'Deficit Deadlift: 3x4 @70%', 'Barbell Shrugs: 3x10', 'Plank with weight: 3x45s', 'Hamstring curls: 3x12'] },
        { day: 'Saturday', workout: 'REST / STRAP & BELT RESET', exercises: ['Gear cleaning & prep', 'Soft tissue mobilization', 'Outdoor trail hike'] },
        { day: 'Sunday', workout: 'REST / SLEEP RESET', exercises: ['Pre-planning lifting weight target', 'Sleep schedule optimization', 'Amino acid replenishment'] },
      ]
    },
    female: {
      ppl: [
        { day: 'Monday', workout: 'PUSH A (SHOULDERS & GLUTES)', exercises: ['Dumbbell Shoulder Press: 4x8', 'Bulgarian Split Squat: 3x10', 'Dumbbell Lateral Raise: 3x12', 'Tricep Kickback: 3x12', 'Glute Cable Kickback: 3x15'] },
        { day: 'Tuesday', workout: 'PULL A (LATS & CORE)', exercises: ['Lat Pulldown (Wide): 4x10', 'Single-Arm DB Row: 3x10', 'Incline DB Bicep Curl: 3x12', 'Face Pulls: 3x15', 'Hanging Knee Raises: 3x15'] },
        { day: 'Wednesday', workout: 'LEGS A (GLUTE & POSTERIOR FOCUS)', exercises: ['Barbell Hip Thrust: 4x10 (3s hold)', 'Deficit Romanian Deadlift: 4x10', 'Goblet Squat: 3x12', 'Lying Leg Curl: 3x12', 'Abductor Machine: 3x20'] },
        { day: 'Thursday', workout: 'PUSH B (UPPER SCULPT & TRICEPS)', exercises: ['Incline DB Press: 3x10', 'Arnold Press: 3x10', 'Tricep Overhead Extension: 3x12', 'Cable Lateral Raise: 4x12', 'Plank: 3x60s'] },
        { day: 'Friday', workout: 'PULL B (BACK WIDTH & BICEPS)', exercises: ['Seated Cable Row: 4x10', 'Assisted Chin-ups: 3x8', 'Hammer Curls: 3x12', 'Rear Delt Flyes: 3x15', 'Deadbugs: 3x12'] },
        { day: 'Saturday', workout: 'LEGS B (QUAD & ABS PRECISION)', exercises: ['Leg Press (Narrow stance): 3x12', 'Smith Machine Squat: 3x10', 'Leg Extension: 3x15', 'Standing Calf Raise: 3x15', 'Russian Twists: 3x20'] },
        { day: 'Sunday', workout: 'REST / SPA RECOVERY', exercises: ['Infrared Sauna / Hot Bath', 'Deep glute foam rolling', 'Organic nutrient intake'] },
      ],
      arnold: [
        { day: 'Monday', workout: 'CHEST & BACK SCULPT', exercises: ['Incline DB Press: 4x10', 'Wide Lat Pulldown: 4x10', 'Pushups: 3x max', 'Chest-Supported Row: 3x12', 'Dumbbell Pullover: 3x12'] },
        { day: 'Tuesday', workout: 'SHOULDERS & ARMS DEFINITION', exercises: ['Seated DB Press: 4x10', 'Incline Dumbbell Curl: 3x12', 'Tricep Rope Pushdown: 3x15', 'Lateral Raise: 4x12', 'Hammer Curl: 3x12'] },
        { day: 'Wednesday', workout: 'LEGS & GLUTES BUILD', exercises: ['Barbell Hip Thrust: 4x12', 'Goblet Squat: 4x10', 'Romanian Deadlift: 3x12', 'Cable Kickback: 3x15', 'Standing Calf Raise: 3x20'] },
        { day: 'Thursday', workout: 'CHEST & BACK (VOLUME FOCUS)', exercises: ['Dumbbell Flyes: 3x12', 'Seated Cable Row: 4x12', 'Single-Arm Lat Pulldown: 3x12', 'Assisted Dips: 3x10', 'Face Pulls: 3x15'] },
        { day: 'Friday', workout: 'SHOULDERS & ARMS (VOLUME FOCUS)', exercises: ['Arnold Press: 3x12', 'Preacher Curl: 3x12', 'Overhead Tricep Extension: 3x12', 'Cable Lateral Raise: 4x15', 'Concentration Curl: 3x12'] },
        { day: 'Saturday', workout: 'LEGS & GLUTES (VOLUME FOCUS)', exercises: ['Bulgarian Split Squats: 3x12', 'Leg Press: 3x15', 'Seated Leg Curl: 3x15', 'Abductor Machine: 3x20', 'Ab Wheel Rollout: 3x12'] },
        { day: 'Sunday', workout: 'ACTIVE REST', exercises: ['Spacious Outdoor Walk: 10k steps', 'Dynamic Hip Openers & Cat-Camel', 'Warm Epsom salt bath'] },
      ],
      fullbody: [
        { day: 'Monday', workout: 'FULL BODY A (GLUTE & LAT FOCUS)', exercises: ['Barbell Hip Thrust: 4x10', 'Lat Pulldown: 3x10', 'Goblet Squat: 3x12', 'Tricep Pushdown: 3x12', 'Hanging Leg Raise: 3x15'] },
        { day: 'Tuesday', workout: 'REST / STRETCHING', exercises: ['Foam Rolling & Joint Mobility', 'Low-Intensity treadmill walk', 'Deep breathing exercises'] },
        { day: 'Wednesday', workout: 'FULL BODY B (QUAD & SHOULDER FOCUS)', exercises: ['Goblet Squat: 4x10', 'Dumbbell Shoulder Press: 3x10', 'Single-Arm Cable Row: 3x12', 'Romanian Deadlift: 3x12', 'Plank: 3x60s'] },
        { day: 'Thursday', workout: 'REST / CORE RE-STABILIZATION', exercises: ['Pilates Core Workout', 'Deadbugs & Bird-Dogs', 'Dynamic stretching flow'] },
        { day: 'Friday', workout: 'FULL BODY C (ATHLETIC POWER)', exercises: ['Kettlebell Swings: 4x15', 'Push-ups: 3x max reps', 'Dumbbell Renegade Row: 3x16 total', 'Bulgarian Split Squats: 3x10', 'Lateral Raises: 3x15'] },
        { day: 'Saturday', workout: 'ACTIVE MOVEMENT / COGNITIVE REST', exercises: ['Yoga flow for recovery', 'Outdoor Walk: 12k steps', 'Hydration optimization'] },
        { day: 'Sunday', workout: 'REST & NUTRITION LAB PREP', exercises: ['Micronutrient meal prepping', 'Full Sleep reset', 'Contrast therapy'] },
      ],
      strength: [
        { day: 'Monday', workout: 'DEADLIFT & PULL STRENGTH', exercises: ['Deadlift: 4x4 @80%', 'Barbell Row: 3x6', 'Lat Pulldown: 3x8', 'Hammer Curls: 3x10', 'Face Pulls: 3x15'] },
        { day: 'Tuesday', workout: 'BENCH & PUSH STRENGTH', exercises: ['Barbell Bench Press: 4x4 @80%', 'Overhead Press: 3x6', 'Dumbbell Flyes: 3x10', 'Dips (Assisted): 3x10', 'Skull Crushers: 3x12'] },
        { day: 'Wednesday', workout: 'REST & ACTIVE RECOVERY', exercises: ['Joint mobility routine', 'Steady Cycle or Pool Walk', 'Infrared sauna session'] },
        { day: 'Thursday', workout: 'SQUAT & LEGS STRENGTH', exercises: ['Barbell Back Squat: 4x4 @80%', 'Romanian Deadlift: 3x6', 'Leg Press: 3x8', 'Weighted Plank: 3x45s', 'Calf Raises: 3x15'] },
        { day: 'Friday', workout: 'OVERHEAD PRESS & TRICEPS', exercises: ['Overhead Press: 4x4', 'Close Grip Bench Press: 3x6', 'Lateral Raises: 3x12', 'Tricep Rope Pushdown: 3x12', 'Russian Twists: 3x20'] },
        { day: 'Saturday', workout: 'ACTIVE RECOVERY / STRENGTH CORE', exercises: ['Farmer Walks: 4x50 meters', 'Sandbag Carry / Core Work', 'Yoga flow'] },
        { day: 'Sunday', workout: 'REST & DEEP STRETCH', exercises: ['Full body passive stretching', 'Meal prep cycle loading', 'Hydration assessment'] },
      ]
    }
  };

  const activeRoutine = routinesDatabase[selectedGenderTab][selectedSplitType];

  const downloadNutritionPDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Theme colors
    const primaryColor = [11, 11, 13]; // Deep Charcoal
    const goldColor = [212, 163, 89]; // #d4a359
    const lightGray = [245, 245, 245];

    // Title header block
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 40, 'F');

    // Gold accent bar
    doc.setFillColor(goldColor[0], goldColor[1], goldColor[2]);
    doc.rect(0, 40, 210, 3, 'F');

    // Header Typography
    doc.setTextColor(255, 255, 255);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('IRON & GOLD ATHLETICS', 15, 18);
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
    doc.text('VANGUARD DIET & NUTRITION LAB • CALIBRATION REPORT', 15, 26);

    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`GENERATED: ${new Date().toLocaleDateString()}`, 15, 32);

    // SECTION: Profile & Parameters
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('ATHLETE METRIC PARAMETERS', 15, 55);

    // Line separator
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.line(15, 58, 195, 58);

    // Left Column (Athlete Info)
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Physical Profile', 15, 66);
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`• Gender: ${gender.toUpperCase()}`, 15, 72);
    doc.text(`• Age: ${age} Years`, 15, 78);
    doc.text(`• Weight: ${weight} ${unit.toUpperCase()}`, 15, 84);
    doc.text(`• Height: ${height} ${heightUnit.toUpperCase()}`, 15, 90);

    // Right Column (Training Info)
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Activity & Objectives', 110, 66);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    const activityLabelText = activityLevel === 'sedentary' ? 'Sedentary (no exercise)' :
                              activityLevel === 'light' ? 'Lightly Active (1-3 days/wk)' :
                              activityLevel === 'moderate' ? 'Moderately Active (3-5 days/wk)' :
                              activityLevel === 'active' ? 'Very Active (6-7 days/wk)' : 'Extra Active (heavy training)';
    doc.text(`• Activity Level: ${activityLabelText}`, 110, 72);
    doc.text(`• Daily Lifting Time: ${trainingMinutes} Mins`, 110, 78);
    doc.text(`• Primary Fitness Goal: ${goal.toUpperCase()}`, 110, 84);

    // SECTION: Calculated Daily Energy & Macros
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('CALIBRATED DAILY ENERGY & MACRONUTRIENT TARGETS', 15, 105);
    doc.line(15, 108, 195, 108);

    // Energy Box Background
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.rect(15, 114, 180, 24, 'F');
    doc.setDrawColor(goldColor[0], goldColor[1], goldColor[2]);
    doc.setLineWidth(0.5);
    doc.rect(15, 114, 180, 24, 'D');

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('TOTAL DAILY ENERGY TARGET (CALORIES)', 20, 122);

    doc.setFontSize(18);
    doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
    doc.text(`${results.calories} kcal / day`, 20, 131);

    // Mini metrics to the right inside the box
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`Basal Metabolic Rate (BMR): ${results.bmr} kcal`, 120, 122);
    doc.text(`Total Daily Energy Expenditure: ${results.tdee} kcal`, 120, 128);
    doc.text(`Minimum Fluid Intake: ${results.water} L / day`, 120, 134);

    // Macro Pillars Header
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('MACRONUTRIENT DISTRIBUTION', 15, 150);

    // 3 Columns for Macros
    // Column 1: Protein
    doc.setFillColor(240, 248, 245); // light green tint
    doc.rect(15, 155, 56, 32, 'F');
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(46, 125, 50); // green
    doc.text('PROTEIN', 20, 162);
    doc.setFontSize(14);
    doc.text(`${results.protein}g`, 20, 172);
    doc.setFontSize(8);
    doc.setFont('Helvetica', 'normal');
    doc.text(`${results.protein * 4} kcal / day`, 20, 180);

    // Column 2: Carbs
    doc.setFillColor(254, 252, 243); // light gold tint
    doc.rect(77, 155, 56, 32, 'F');
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]); // gold
    doc.text('CARBS', 82, 162);
    doc.setFontSize(14);
    doc.text(`${results.carbs}g`, 82, 172);
    doc.setFontSize(8);
    doc.setFont('Helvetica', 'normal');
    doc.text(`${results.carbs * 4} kcal / day`, 82, 180);

    // Column 3: Fats
    doc.setFillColor(255, 248, 240); // light orange tint
    doc.rect(139, 155, 56, 32, 'F');
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(216, 112, 14); // orange
    doc.text('FATS', 144, 162);
    doc.setFontSize(14);
    doc.text(`${results.fat}g`, 144, 172);
    doc.setFontSize(8);
    doc.setFont('Helvetica', 'normal');
    doc.text(`${results.fat * 9} kcal / day`, 144, 180);

    // Action / Suggestion Section
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('LAB SUGGESTION & SCIENTIFIC PROTOCOLS', 15, 202);
    doc.line(15, 204, 195, 204);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    
    let suggestion = '';
    if (goal === 'bulk') {
      suggestion = `BULKING REGIME DETECTED. SUPPLEMENT WITH VANGUARD ISOLATE WHEY AFTER LIFTING AND 5G MICRONIZED CREATINE TO INCREASE FORCE TRANSFER. TARGET HYPERTROPHY REPS (8-12) TO STIMULATE THE ANABOLIC RECEPTORS.`;
    } else if (goal === 'cut') {
      suggestion = `CALORIC DEFICIT APPLIED. RE-ESTABLISH AMINO POOLS WITH 25G WHEY ISOLATE POST-TRAINING. WEAR COMPRESSION GEAR TO STABILIZE TEMPERATURE. SUSTAIN INTENSITY AND PRIORITIZE SLEEP QUALITY AT 8+ HOURS TO PREVENT LEAN TISSUE LOSS.`;
    } else {
      suggestion = `MAINTENANCE ADAPTATION. ENSURE ADEQUATE PRE-WORKOUT FUELING WITH COMPLEX CARBS. HYDRATION SHOULD REMAIN STEADY AT ${results.water}L DAILY. KEEP LIFTING INTENSITY CONGRUENT WITH STRENGTH TARGETS.`;
    }
    
    // Wrap text
    const splitSuggestion = doc.splitTextToSize(suggestion, 180);
    doc.text(splitSuggestion, 15, 211);

    // Footnote
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('IRON & GOLD ATHLETICS • CLINICALLY DOSED • EXPERTLY SOURCED', 15, 280);

    doc.save(`Vanguard_Nutrition_Plan_${goal}_${weight}${unit}.pdf`);
  };

  const downloadWorkoutPDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const primaryColor = [11, 11, 13];
    const goldColor = [212, 163, 89];

    // Header Title block
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setFillColor(goldColor[0], goldColor[1], goldColor[2]);
    doc.rect(0, 40, 210, 3, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('IRON & GOLD ATHLETICS', 15, 18);
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
    const genderTitle = selectedGenderTab === 'male' ? 'MALE' : 'FEMALE';
    const splitTitle = selectedSplitType === 'ppl' ? 'PUSH / PULL / LEGS' :
                       selectedSplitType === 'arnold' ? 'ARNOLD SPLIT' :
                       selectedSplitType === 'fullbody' ? 'FULL BODY POWER' : 'POWERLIFTING STRENGTH';
    doc.text(`VANGUARD ${genderTitle} TRAINING MATRIX • ${splitTitle}`, 15, 26);

    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`GENERATED: ${new Date().toLocaleDateString()}`, 15, 32);

    // Days Section
    let yOffset = 55;
    activeRoutine.forEach((item, index) => {
      const isRest = item.workout.includes('REST') || item.workout.includes('RECOVERY');
      
      // Check if drawing next day goes off page
      if (yOffset > 240) {
        // Footnote on current page before adding a new page
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('IRON & GOLD ATHLETICS • CLINICALLY DOSED • EXPERTLY SOURCED', 15, 280);

        doc.addPage();
        yOffset = 20;
      }

      // Day Bar / header
      doc.setFillColor(245, 245, 245);
      doc.rect(15, yOffset, 180, 8, 'F');
      doc.setDrawColor(220, 220, 220);
      doc.rect(15, yOffset, 180, 8, 'D');

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(item.day.toUpperCase(), 18, yOffset + 5.5);

      doc.setTextColor(isRest ? 120 : 46, isRest ? 120 : 125, isRest ? 120 : 50); // grey or green
      doc.setFontSize(8);
      doc.text(isRest ? 'ACTIVE RECOVERY' : 'HEAVY LIFT DAY', 155, yOffset + 5.5);

      yOffset += 12;

      // Workout title
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
      doc.text(item.workout, 18, yOffset);
      yOffset += 5;

      // Exercises
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(60, 60, 60);

      item.exercises.forEach((ex) => {
        doc.text(`•  ${ex}`, 22, yOffset);
        yOffset += 5;
      });

      yOffset += 6; // Spacing before next day
    });

    // Final Footnote
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('IRON & GOLD ATHLETICS • CLINICALLY DOSED • EXPERTLY SOURCED', 15, 280);

    doc.save(`Vanguard_Workout_Schedule_${selectedGenderTab}_${selectedSplitType}.pdf`);
  };

  return (
    <section id="athlete-prep-section" className="bg-[#050505] border-t border-zinc-900 py-16 sm:py-24 relative overflow-hidden">
      {/* Immersive Watermark backings */}
      <div className="absolute right-0 top-1/3 -translate-y-1/2 opacity-[0.02] select-none pointer-events-none hidden xl:block">
        <h2 className="text-[200px] font-display font-black leading-none uppercase">VANGUARD</h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center sm:text-left mb-12 border-b border-zinc-900 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-gold-500 font-mono text-[10px] tracking-[0.25em] uppercase mb-2">
              <Activity className="h-3.5 w-3.5 animate-pulse" />
              <span>Vanguard Athletic Lab</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter leading-none">
              ATHLETE PREP <span className="text-gold-500 italic">&amp;</span> SPLITS
            </h2>
            <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider mt-1.5">
              Internally Calibrated Macro Calculation Engine &amp; Gender-Based Performance Routines
            </p>
          </div>
          <div className="flex justify-center gap-1.5 bg-[#0b0b0d] p-1 border border-zinc-900 rounded-lg">
            <button
              onClick={() => setSelectedGenderTab('male')}
              className={`px-4 py-1.5 rounded text-[10px] font-mono font-bold uppercase tracking-widest transition-all ${
                selectedGenderTab === 'male'
                  ? 'bg-gold-500 text-black shadow-[0_0_12px_rgba(220,38,38,0.3)]'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              MALE REGIMEN
            </button>
            <button
              onClick={() => setSelectedGenderTab('female')}
              className={`px-4 py-1.5 rounded text-[10px] font-mono font-bold uppercase tracking-widest transition-all ${
                selectedGenderTab === 'female'
                  ? 'bg-gold-500 text-black shadow-[0_0_12px_rgba(220,38,38,0.3)]'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              FEMALE REGIMEN
            </button>
          </div>
        </div>

        {/* 3-Way Grid split containing: 1. Input parameters, 2. Dynamic macros, 3. Training timetable */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">

          {/* COLUMN 1 (4 cols): Athlete Macro Architect input form */}
          <div id="diet-engine" className="lg:col-span-4 bg-[#0b0b0d]/80 border border-zinc-900 rounded-2xl p-6 relative overflow-hidden group hover:border-gold-500/20 transition-colors scroll-mt-24">
            <div className="absolute top-0 right-0 h-32 w-32 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center space-x-2.5 mb-6 pb-4 border-b border-zinc-900">
              <Calculator className="h-5 w-5 text-gold-500" />
              <div>
                <h3 className="font-display text-sm font-black text-white uppercase tracking-wider">Macro Architect</h3>
                <p className="text-[10px] text-zinc-500 font-mono uppercase">Instant mathematical configuration</p>
              </div>
            </div>

            <div className="space-y-4">
              
              {/* Age & Gender Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">Age (Years)</label>
                  <input 
                    type="number" 
                    value={age} 
                    onChange={(e) => {
                      setAge(Math.max(12, parseInt(e.target.value) || 0));
                      setCalculated(true);
                    }}
                    className="w-full bg-[#050505] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">Physical Gender</label>
                  <div className="flex rounded-lg border border-zinc-800 overflow-hidden bg-[#050505] p-0.5">
                    <button
                      type="button"
                      onClick={() => { setGender('male'); setCalculated(true); setSelectedGenderTab('male'); }}
                      className={`flex-1 py-1.5 text-[9px] font-mono font-bold uppercase transition-all rounded ${gender === 'male' ? 'bg-zinc-800 text-gold-500' : 'text-zinc-500'}`}
                    >
                      MALE
                    </button>
                    <button
                      type="button"
                      onClick={() => { setGender('female'); setCalculated(true); setSelectedGenderTab('female'); }}
                      className={`flex-1 py-1.5 text-[9px] font-mono font-bold uppercase transition-all rounded ${gender === 'female' ? 'bg-zinc-800 text-gold-500' : 'text-zinc-500'}`}
                    >
                      FEMALE
                    </button>
                  </div>
                </div>
              </div>

              {/* Weight Section */}
              <div className="grid grid-cols-12 gap-3 items-end">
                <div className="col-span-8">
                  <label className="block text-[9px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">Athlete Weight ({unit})</label>
                  <input 
                    type="number" 
                    value={weight} 
                    onChange={(e) => {
                      setWeight(Math.max(30, parseInt(e.target.value) || 0));
                      setCalculated(true);
                    }}
                    className="w-full bg-[#050505] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
                <div className="col-span-4">
                  <div className="flex rounded-lg border border-zinc-800 overflow-hidden bg-[#050505] p-0.5 h-[34px]">
                    <button
                      type="button"
                      onClick={() => {
                        if (unit === 'kg') {
                          setWeight(Math.round(weight * 2.20462262));
                        }
                        setUnit('lbs');
                        setCalculated(true);
                      }}
                      className={`flex-1 text-[9px] font-mono font-bold uppercase transition-all rounded ${unit === 'lbs' ? 'bg-zinc-800 text-gold-500' : 'text-zinc-500'}`}
                    >
                      LBS
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (unit === 'lbs') {
                          setWeight(Math.round(weight / 2.20462262));
                        }
                        setUnit('kg');
                        setCalculated(true);
                      }}
                      className={`flex-1 text-[9px] font-mono font-bold uppercase transition-all rounded ${unit === 'kg' ? 'bg-zinc-800 text-gold-500' : 'text-zinc-500'}`}
                    >
                      KG
                    </button>
                  </div>
                </div>
              </div>

              {/* Height Section */}
              <div className="grid grid-cols-12 gap-3 items-end">
                <div className="col-span-8">
                  <label className="block text-[9px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">Athlete Height ({heightUnit})</label>
                  <input 
                    type="number" 
                    value={height} 
                    onChange={(e) => {
                      setHeight(Math.max(10, parseInt(e.target.value) || 0));
                      setCalculated(true);
                    }}
                    className="w-full bg-[#050505] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
                <div className="col-span-4">
                  <div className="flex rounded-lg border border-zinc-800 overflow-hidden bg-[#050505] p-0.5 h-[34px]">
                    <button
                      type="button"
                      onClick={() => {
                        if (heightUnit === 'cm') {
                          setHeight(Math.round(height / 2.54));
                        }
                        setHeightUnit('in');
                        setCalculated(true);
                      }}
                      className={`flex-1 text-[9px] font-mono font-bold uppercase transition-all rounded ${heightUnit === 'in' ? 'bg-zinc-800 text-gold-500' : 'text-zinc-500'}`}
                    >
                      IN
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (heightUnit === 'in') {
                          setHeight(Math.round(height * 2.54));
                        }
                        setHeightUnit('cm');
                        setCalculated(true);
                      }}
                      className={`flex-1 text-[9px] font-mono font-bold uppercase transition-all rounded ${heightUnit === 'cm' ? 'bg-zinc-800 text-gold-500' : 'text-zinc-500'}`}
                    >
                      CM
                    </button>
                  </div>
                </div>
              </div>

              {/* Activity Level Selector */}
              <div>
                <label className="block text-[9px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">Daily Activity Level</label>
                <div className="relative">
                  <select
                    value={activityLevel}
                    onChange={(e) => {
                      setActivityLevel(e.target.value as any);
                      setCalculated(true);
                    }}
                    className="w-full bg-[#050505] border border-zinc-800 rounded-lg px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-gold-500 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="sedentary">Sedentary (Little or no exercise)</option>
                    <option value="light">Lightly Active (Light exercise 1-3 days/wk)</option>
                    <option value="moderate">Moderately Active (Moderate exercise 3-5 days/wk)</option>
                    <option value="active">Very Active (Hard exercise 6-7 days/wk)</option>
                    <option value="extreme">Extra Active (Heavy training + physical job)</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gold-500 text-[10px]">
                    ▼
                  </div>
                </div>
              </div>

              {/* Training Minutes */}
              <div>
                <label className="block text-[9px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">Daily Lifting Time (mins)</label>
                <div className="relative">
                  <input 
                    type="range" 
                    min="15" 
                    max="180" 
                    step="5"
                    value={trainingMinutes}
                    onChange={(e) => {
                      setTrainingMinutes(parseInt(e.target.value));
                      setCalculated(true);
                    }}
                    className="w-full accent-gold-500 bg-zinc-900 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-zinc-500 mt-1.5">
                    <span>15 min</span>
                    <span className="text-gold-500 font-bold">{trainingMinutes} minutes/day</span>
                    <span>180 min</span>
                  </div>
                </div>
              </div>

              {/* Goal */}
              <div>
                <label className="block text-[9px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">Primary Fitness Goal</label>
                <div className="grid grid-cols-3 gap-1.5 bg-[#050505] p-1 rounded-lg border border-zinc-800">
                  <button
                    type="button"
                    onClick={() => { setGoal('bulk'); setCalculated(true); }}
                    className={`py-1.5 text-[9px] font-mono font-black uppercase tracking-wider rounded ${goal === 'bulk' ? 'bg-zinc-800 text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    BULKING
                  </button>
                  <button
                    type="button"
                    onClick={() => { setGoal('cut'); setCalculated(true); }}
                    className={`py-1.5 text-[9px] font-mono font-black uppercase tracking-wider rounded ${goal === 'cut' ? 'bg-zinc-800 text-rose-500' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    SHREDDING
                  </button>
                  <button
                    type="button"
                    onClick={() => { setGoal('maintain'); setCalculated(true); }}
                    className={`py-1.5 text-[9px] font-mono font-black uppercase tracking-wider rounded ${goal === 'maintain' ? 'bg-zinc-800 text-amber-500' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    MAINTAIN
                  </button>
                </div>
              </div>

              {/* Reset trigger */}
              <button
                onClick={() => {
                  setAge(24);
                  setWeight(170);
                  setUnit('lbs');
                  setHeight(175);
                  setHeightUnit('cm');
                  setActivityLevel('moderate');
                  setGender('male');
                  setTrainingMinutes(60);
                  setGoal('maintain');
                  setCalculated(true);
                }}
                className="w-full flex items-center justify-center space-x-1.5 py-2 bg-zinc-950 hover:bg-[#0f0f12] text-zinc-500 hover:text-zinc-300 border border-zinc-900 rounded-lg text-[9px] font-mono font-bold uppercase transition-all cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset Parameters</span>
              </button>

            </div>
          </div>

          {/* COLUMN 2 (4 cols): Dynamic calibrated macro results with elegant motion */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
            
            {/* Realtime Results Block */}
            <div className="bg-[#0b0b0d]/80 border border-zinc-900 rounded-2xl p-6 relative flex-grow flex flex-col justify-between hover:border-gold-500/20 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-900">
                  <div className="flex items-center space-x-2.5">
                    <Flame className="h-5 w-5 text-gold-500" />
                    <div>
                      <h3 className="font-display text-sm font-black text-white uppercase tracking-wider">Calibrated Intake</h3>
                      <p className="text-[10px] text-zinc-500 font-mono uppercase font-bold">24hr physical requirement</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleEmailPlan}
                      disabled={emailStatus === 'sending' || emailStatus === 'sent'}
                      className={`flex items-center space-x-1 px-2 py-1 rounded border text-[9px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                        emailStatus === 'sent' 
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' 
                          : 'bg-gold-500/10 hover:bg-gold-500/20 border-gold-500/30 text-gold-500'
                      }`}
                      title="Send Plan to Email"
                    >
                      {emailStatus === 'sent' ? <CheckSquare className="h-2.5 w-2.5" /> : <Send className="h-2.5 w-2.5" />}
                      <span>{emailStatus === 'sending' ? 'SENDING' : emailStatus === 'sent' ? 'SENT' : 'EMAIL'}</span>
                    </button>
                    <button
                      onClick={downloadNutritionPDF}
                      className="flex items-center space-x-1 px-2 py-1 rounded bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 text-gold-500 text-[9px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      title="Download Nutrition Plan PDF"
                    >
                      <Download className="h-2.5 w-2.5" />
                      <span>PDF</span>
                    </button>
                    <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">
                      ONLINE
                    </span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${gender}-${weight}-${goal}-${trainingMinutes}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Caloric Intake Display */}
                    <div className="bg-[#050505] p-4 border border-zinc-900 rounded-xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 h-16 w-16 bg-red-500/5 rounded-full blur-xl" />
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Estimated Energy Limit</span>
                      <div className="flex items-baseline space-x-1.5">
                        <span className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
                          {results.calories}
                        </span>
                        <span className="text-xs font-mono text-zinc-500 uppercase font-bold">Kcal / Day</span>
                      </div>
                      <div className="w-full bg-zinc-900 h-1 rounded-full mt-3 overflow-hidden">
                        <div 
                          className="h-full bg-gold-500 transition-all duration-500"
                          style={{ width: goal === 'bulk' ? '85%' : goal === 'cut' ? '55%' : '70%' }}
                        />
                      </div>
                    </div>

                    {/* BMR and TDEE Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#050505] p-3 border border-zinc-900 rounded-xl relative overflow-hidden">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block mb-0.5">Basal BMR</span>
                        <div className="flex items-baseline space-x-1">
                          <span className="font-mono text-sm font-black text-white">{results.bmr}</span>
                          <span className="text-[8px] font-mono text-zinc-500 uppercase font-bold">kcal</span>
                        </div>
                      </div>
                      <div className="bg-[#050505] p-3 border border-zinc-900 rounded-xl relative overflow-hidden">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block mb-0.5">Active TDEE</span>
                        <div className="flex items-baseline space-x-1">
                          <span className="font-mono text-sm font-black text-gold-500">{results.tdee}</span>
                          <span className="text-[8px] font-mono text-zinc-500 uppercase font-bold">kcal</span>
                        </div>
                      </div>
                    </div>

                    {/* Macro Pillars */}
                    <div className="grid grid-cols-3 gap-3">
                      
                      {/* Protein */}
                      <div className="bg-[#050505] p-3 border border-zinc-900 rounded-xl text-center">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">PROTEIN</span>
                        <span className="font-mono text-base font-black text-white block">{results.protein}g</span>
                        <span className="text-[8px] font-mono text-emerald-500 block mt-1">{(results.protein * 4)} Kcal</span>
                      </div>

                      {/* Carbs */}
                      <div className="bg-[#050505] p-3 border border-zinc-900 rounded-xl text-center">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">CARBS</span>
                        <span className="font-mono text-base font-black text-zinc-200 block">{results.carbs}g</span>
                        <span className="text-[8px] font-mono text-gold-500 block mt-1">{(results.carbs * 4)} Kcal</span>
                      </div>

                      {/* Fats */}
                      <div className="bg-[#050505] p-3 border border-zinc-900 rounded-xl text-center">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">FATS</span>
                        <span className="font-mono text-base font-black text-zinc-300 block">{results.fat}g</span>
                        <span className="text-[8px] font-mono text-amber-500 block mt-1">{(results.fat * 9)} Kcal</span>
                      </div>

                    </div>

                    {/* Water metric */}
                    <div className="flex items-center justify-between p-3.5 bg-zinc-900/30 border border-zinc-900 rounded-xl">
                      <div className="flex items-center space-x-2">
                        <Utensils className="h-3.5 w-3.5 text-zinc-500" />
                        <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">Min Fluid Threshold</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-white">{results.water} Liters / Day</span>
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Action Recommendation Box */}
              <div className="mt-6 pt-4 border-t border-zinc-900">
                <div className="p-3.5 bg-gold-500/5 border border-gold-500/20 rounded-xl">
                  <div className="flex items-center space-x-1.5 mb-1.5 text-gold-500">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">LAB SUGGESTION</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-relaxed uppercase font-semibold font-mono">
                    {goal === 'bulk' && `BULKING REGIME DETECTED. SUPPLEMENT WITH VANGUARD ISOLATE WHEY AFTER LIFTING AND 5G MICRONIZED CREATINE TO INCREASE FORCE TRANSFER.`}
                    {goal === 'cut' && `CALORIC DEFICIT APPLIED. RE-ESTABLISH AMINO POOLS WITH 25G WHEY ISOLATE POST-TRAINING. WEAR COMPRESSION GEAR TO STABILIZE TEMPERATURE.`}
                    {goal === 'maintain' && `MAINTENANCE ADAPTATION. ENSURE ADEQUATE PRE-WORKOUT FUELING. HYDRATION SHOULD REMAIN STEADY AT ${results.water}L DAILY.`}
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* COLUMN 3 (4 cols): Progressive Pre-Training Ritual Planner */}
          <div className="lg:col-span-4 bg-[#0b0b0d]/80 border border-zinc-900 rounded-2xl p-6 hover:border-gold-500/20 transition-colors">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-900">
              <div className="flex items-center space-x-2.5">
                <CheckSquare className="h-5 w-5 text-gold-500" />
                <div>
                  <h3 className="font-display text-sm font-black text-white uppercase tracking-wider">Prep Rituals</h3>
                  <p className="text-[10px] text-zinc-500 font-mono uppercase">Pre-workout verification list</p>
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold text-zinc-500">
                {preps.filter(p => p.done).length} / {preps.length} DONE
              </span>
            </div>

            <div className="space-y-2.5">
              {preps.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => togglePrep(p.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 select-none ${
                    p.done 
                      ? 'bg-zinc-950/40 border-gold-500/30 text-zinc-300' 
                      : 'bg-[#050505] border-zinc-900 text-zinc-500 hover:text-zinc-400 hover:border-zinc-800'
                  }`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded flex items-center justify-center border transition-all ${
                    p.done ? 'bg-gold-500 border-gold-500 text-black' : 'border-zinc-800 bg-zinc-950'
                  }`}>
                    {p.done && <span className="text-[9px] font-bold">✔</span>}
                  </div>
                  <span className={`text-[10px] font-mono leading-tight uppercase font-semibold ${p.done ? 'line-through text-zinc-500' : ''}`}>
                    {p.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-[#050505] border border-zinc-900 rounded-xl flex items-center justify-between">
              <span className="text-[9px] font-mono text-zinc-500 uppercase font-bold tracking-wider">LIFTING STATUS</span>
              <span className="flex items-center space-x-1.5 text-[10px] font-mono font-bold text-gold-500 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500 animate-ping" />
                <span>RITUAL LOADED</span>
              </span>
            </div>
          </div>

        </div>

        {/* Workout Timetable block under - Beautiful custom calendar UI with gender tabs */}
        <div id="workout-splits" className="mt-12 bg-[#0b0b0d]/40 border border-zinc-900 rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-gold-500/20 transition-colors scroll-mt-24">
          <div className="absolute top-0 right-0 h-48 w-48 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-zinc-900">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-gold-500" />
              <div>
                <h3 className="font-display text-sm font-black text-white uppercase tracking-wider">
                  Vanguard {selectedGenderTab === 'male' ? 'Male' : 'Female'} Training Timetable
                </h3>
                <p className="text-[10px] text-zinc-500 font-mono uppercase font-semibold">Weekly training scheduling matrix</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={downloadWorkoutPDF}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 text-gold-500 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
                title="Download Workout Routine PDF"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Save PDF</span>
              </button>
            </div>
          </div>

          {/* Split Type Selector Tab Deck */}
          <div className="flex flex-wrap items-center gap-2 mb-8 bg-[#050505]/60 p-1 border border-zinc-900 rounded-xl max-w-max">
            <button
              onClick={() => setSelectedSplitType('ppl')}
              className={`px-4 py-2 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedSplitType === 'ppl'
                  ? 'bg-gold-500 text-black shadow-[0_0_12px_rgba(212,163,89,0.3)] font-black'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Push / Pull / Legs
            </button>
            <button
              onClick={() => setSelectedSplitType('arnold')}
              className={`px-4 py-2 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedSplitType === 'arnold'
                  ? 'bg-gold-500 text-black shadow-[0_0_12px_rgba(212,163,89,0.3)] font-black'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Arnold Split
            </button>
            <button
              onClick={() => setSelectedSplitType('fullbody')}
              className={`px-4 py-2 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedSplitType === 'fullbody'
                  ? 'bg-gold-500 text-black shadow-[0_0_12px_rgba(212,163,89,0.3)] font-black'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Full Body Power
            </button>
            <button
              onClick={() => setSelectedSplitType('strength')}
              className={`px-4 py-2 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedSplitType === 'strength'
                  ? 'bg-gold-500 text-black shadow-[0_0_12px_rgba(212,163,89,0.3)] font-black'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Powerlifting Strength
            </button>
          </div>

          {/* Timetable Grid */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <AnimatePresence mode="wait">
              {activeRoutine.map((item, index) => {
                const isRest = item.workout.includes('REST') || item.workout.includes('RECOVERY');
                return (
                  <motion.div
                    key={`${selectedGenderTab}-${selectedSplitType}-${item.day}`}
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -15 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="bg-[#050505] border border-zinc-900 hover:border-zinc-800 rounded-2xl p-4 flex flex-col justify-between hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all h-full"
                  >
                    <div>
                      {/* Day indicator */}
                      <div className="flex items-center justify-between mb-3 border-b border-zinc-900 pb-2">
                        <span className="text-[10px] font-mono font-black text-gold-500 tracking-wider uppercase">
                          {item.day}
                        </span>
                        <span className={`text-[8px] font-mono font-bold uppercase ${isRest ? 'text-zinc-600' : 'text-emerald-500'}`}>
                          {isRest ? 'REST' : 'LIFT'}
                        </span>
                      </div>

                      {/* Workout name */}
                      <h4 className="font-display text-xs font-black text-zinc-200 tracking-tight leading-tight uppercase mb-3 min-h-[2rem]">
                        {item.workout}
                      </h4>

                      {/* Exercises bullet sequence */}
                      <ul className="space-y-2 mt-1">
                        {item.exercises.map((ex, i) => (
                          <li key={i} className="text-[9px] font-mono text-zinc-400 font-medium leading-tight flex items-start space-x-1 uppercase">
                            <span className="text-zinc-600 font-black">•</span>
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-zinc-900 text-center">
                      <span className="text-[8px] font-mono text-zinc-600 tracking-wider uppercase font-bold">
                        {isRest ? 'active recovery' : '45-60m training load'}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </section>
  );
}
