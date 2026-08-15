"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AcademyPortalSkeleton } from './AcademySkeleton';
import { 
  Flame, 
  BookOpen, 
  Target, 
  Dumbbell, 
  Calendar, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Award, 
  ChevronRight, 
  Plus, 
  Sparkles,
  Timer,
  Compass,
  Play,
  Pause,
  RotateCcw,
  Trash2,
  Check,
  CheckSquare,
  Square,
  Info,
  HelpCircle,
  Activity,
  Edit2,
  Bookmark,
  ChevronDown,
  SlidersHorizontal,
  X
} from 'lucide-react';

// Interfaces
interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rpe: string;
  notes: string;
}

interface CustomDay {
  target: string;
  isRest: boolean;
  exercises: Exercise[];
}

interface WeeklyPlan {
  [key: string]: CustomDay;
}

export default function AcademyPortal() {
  const [activeTab, setActiveTab] = useState<'workouts' | 'plans' | 'programs' | 'challenges'>('workouts');
  const [isTabLoading, setIsTabLoading] = useState<boolean>(false);

  const handleTabChange = (newTab: 'workouts' | 'plans' | 'programs' | 'challenges') => {
    if (newTab === activeTab && !isTabLoading) return;
    setIsTabLoading(true);
    setActiveTab(newTab);
    setTimeout(() => {
      setIsTabLoading(false);
    }, 450);
  };

  const handleRefreshContent = () => {
    setIsTabLoading(true);
    setTimeout(() => {
      setIsTabLoading(false);
    }, 650);
  };

  // ----------------------------------------------------
  // WORKOUT STATE & LOGIC (Workout Session Player)
  // ----------------------------------------------------
  const workoutData = [
    {
      id: 'w1',
      title: 'FIERCE CHEST & DELTS PUMP',
      subtitle: 'ANABOLIC DENSITY PROTOCOL',
      level: 'ADVANCED',
      duration: '50 MIN',
      description: 'A high-volume chest and lateral shoulder builder focusing on mechanical tension and high stretch positions for maximum chest width.',
      restDefault: 90,
      type: 'strength',
      focus: 'upper body',
      difficulty: 'advanced',
      equipment: ['dumbbells'],
      exercises: [
        { name: 'Incline Dumbbell Press', sets: 3, reps: '8-10', rpe: 'RPE 8.5', notes: 'Focus on deep stretch & 2-sec eccentric contraction' },
        { name: 'Weighted Chest Dips', sets: 3, reps: '10', rpe: 'RPE 9', notes: 'Leaning forward to maximize chest recruitment' },
        { name: 'Cable Chest Flyes', sets: 3, reps: '12-15', rpe: 'RPE 8', notes: 'Squeeze at the peak of contraction for 1.5s' },
        { name: 'Dumbbell Overhead Shoulder Press', sets: 3, reps: '8-10', rpe: 'RPE 8.5', notes: 'Dumbbells align over ears at bottom' },
        { name: 'Cable Lateral Raises', sets: 4, reps: '15-20', rpe: 'RPE 9', notes: 'Continuous tension, do not let weights touch' }
      ]
    },
    {
      id: 'w2',
      title: 'POSTERIOR CHAIN FORCE',
      subtitle: 'BACK & HAMSTRING MATRIX',
      level: 'ELITE',
      duration: '60 MIN',
      description: 'Designed to build deep muscle thickness throughout the spinal erectors, lats, and the posterior legs.',
      restDefault: 120,
      type: 'strength',
      focus: 'full body',
      difficulty: 'advanced',
      equipment: ['barbell', 'dumbbells', 'pull-up bar'],
      exercises: [
        { name: 'Conventional Deadlift', sets: 3, reps: '5', rpe: 'RPE 9', notes: 'Power focus. Reset your hips after each rep' },
        { name: 'Weighted Pull-ups', sets: 3, reps: '6-8', rpe: 'RPE 8.5', notes: 'Squeeze shoulder blades down and back' },
        { name: 'Meadows Dumbbell Row', sets: 3, reps: '10-12', rpe: 'RPE 9', notes: 'Deep stretch at bottom, row to hip crest' },
        { name: 'Romanian Deadlift', sets: 4, reps: '8-10', rpe: 'RPE 8', notes: 'Load the hamstrings, flat back' },
        { name: 'Seated Face Pulls', sets: 3, reps: '15', rpe: 'RPE 8.5', notes: 'Flare elbows out, 1s squeeze' }
      ]
    },
    {
      id: 'w3',
      title: 'VANGUARD QUAD SWEEP',
      subtitle: 'ANTERIOR CHAIN EXPLOSION',
      level: 'ELITE',
      duration: '45 MIN',
      description: 'Extreme quadriceps isolation and load loading designed to expand muscle volume and absolute squat capability.',
      restDefault: 150,
      type: 'strength',
      focus: 'lower body',
      difficulty: 'advanced',
      equipment: ['barbell', 'dumbbells'],
      exercises: [
        { name: 'Barbell Back Squat', sets: 4, reps: '6-8', rpe: 'RPE 9', notes: 'Deep depth below parallel. Drive through midfoot' },
        { name: 'Hack Squat', sets: 3, reps: '10-12', rpe: 'RPE 9', notes: 'Keep heels flat on plate' },
        { name: 'Leg Extensions', sets: 3, reps: '15', rpe: 'RPE 8', notes: 'Hold contraction for 1 sec at top' },
        { name: 'Walking Dumbbell Lunges', sets: 3, reps: '15 steps/leg', rpe: 'RPE 8.5', notes: 'Torso slightly leaning forward' },
        { name: 'Standing Calf Raises', sets: 4, reps: '20', rpe: 'RPE 8', notes: '2-sec full stretch at the bottom' }
      ]
    },
    {
      id: 'w4',
      title: 'HIIT CARDIO TORCH',
      subtitle: 'MAX HEART RATE MATRIX',
      level: 'HARD',
      duration: '30 MIN',
      description: 'High intensity interval training designed to push aerobic threshold and burn high energy in minimal time.',
      restDefault: 45,
      type: 'cardio',
      focus: 'full body',
      difficulty: 'hard',
      equipment: ['no equipment'],
      exercises: [
        { name: 'Jumping Jacks', sets: 4, reps: '45 sec', rpe: 'RPE 8', notes: 'Keep a fast pace' },
        { name: 'Burpees', sets: 4, reps: '45 sec', rpe: 'RPE 9', notes: 'Explode up on each rep' },
        { name: 'Mountain Climbers', sets: 4, reps: '45 sec', rpe: 'RPE 8.5', notes: 'Keep core engaged and hips low' },
        { name: 'High Knees', sets: 4, reps: '45 sec', rpe: 'RPE 8', notes: 'Pump arms and raise knees high' }
      ]
    },
    {
      id: 'w5',
      title: 'KETTLEBELL FLOW METCON',
      subtitle: 'METABOLIC CONDITIONING',
      level: 'NORMAL',
      duration: '35 MIN',
      description: 'A metabolic conditioning workout designed to build endurance and power using functional tools.',
      restDefault: 60,
      type: 'metcon',
      focus: 'full body',
      difficulty: 'normal',
      equipment: ['kettlebells'],
      exercises: [
        { name: 'Kettlebell Swings', sets: 4, reps: '20', rpe: 'RPE 8', notes: 'Hinge at the hips, squeeze glutes at top' },
        { name: 'Kettlebell Goblet Squats', sets: 3, reps: '12', rpe: 'RPE 8', notes: 'Keep chest upright' },
        { name: 'Kettlebell Clean & Press', sets: 3, reps: '8/arm', rpe: 'RPE 8.5', notes: 'Fluid path close to body' }
      ]
    },
    {
      id: 'w6',
      title: 'ABS TO THE LIMIT',
      subtitle: 'CORE SHRED PROTOCOL',
      level: 'EASY',
      duration: '15 MIN',
      description: 'Focused core isolation workout designed to build definition and strength in the rectus abdominis.',
      restDefault: 30,
      type: 'HIIT',
      focus: 'abs',
      difficulty: 'easy',
      equipment: ['no equipment'],
      exercises: [
        { name: 'Hanging Knee Raises', sets: 3, reps: '15', rpe: 'RPE 8', notes: 'Control the descent, do not swing' },
        { name: 'Plank Hold', sets: 3, reps: '60 sec', rpe: 'RPE 7', notes: 'Keep body in a straight line' },
        { name: 'Russian Twists', sets: 3, reps: '20/side', rpe: 'RPE 8', notes: 'Touch ground on both sides' }
      ]
    },
    {
      id: 'w7',
      title: 'YOGA STRETCH & FLEX',
      subtitle: 'MINDFUL RESTORATIVE FLOW',
      level: 'LIGHT',
      duration: '40 MIN',
      description: 'Deep stretching and isometric poses to improve joint range of motion and mental clarity.',
      restDefault: 0,
      type: 'yoga',
      focus: 'full body',
      difficulty: 'light',
      equipment: ['no equipment'],
      exercises: [
        { name: 'Sun Salutation A', sets: 3, reps: '5 mins', rpe: 'RPE 4', notes: 'Focus on breath coordination' },
        { name: 'Downward Dog Hold', sets: 3, reps: '2 mins', rpe: 'RPE 5', notes: 'Pedal the feet' },
        { name: 'Warrior II pose', sets: 3, reps: '1 min/side', rpe: 'RPE 6', notes: 'Keep hips aligned' }
      ]
    },
    {
      id: 'w8',
      title: 'COMBAT CONDITIONING',
      subtitle: 'MARTIAL CARDIO FUSION',
      level: 'ADVANCED',
      duration: '45 MIN',
      description: 'High velocity martial arts training sequence designed to build core density and high work capacity.',
      restDefault: 60,
      type: 'combat',
      focus: 'upper body',
      difficulty: 'advanced',
      equipment: ['no equipment'],
      exercises: [
        { name: 'Shadow Boxing', sets: 3, reps: '3 mins', rpe: 'RPE 8', notes: 'Jab, cross, hook combinations' },
        { name: 'Sprawls', sets: 3, reps: '15', rpe: 'RPE 9', notes: 'Drop hips flat to floor, jump back up' },
        { name: 'Slip & Roll drills', sets: 3, reps: '2 mins', rpe: 'RPE 7.5', notes: 'Defensive head movement' }
      ]
    },
    {
      id: 'w9',
      title: 'BARBELL FORCE PROTOCOL',
      subtitle: 'MAXIMUM MOTOR RECRUITMENT',
      level: 'ADVANCED',
      duration: '50 MIN',
      description: 'Pure compound barbell sequence targeting structural motor strength.',
      restDefault: 120,
      type: 'strength',
      focus: 'full body',
      difficulty: 'advanced',
      equipment: ['barbell'],
      exercises: [
        { name: 'Overhead Press', sets: 4, reps: '6', rpe: 'RPE 8.5', notes: 'Squeeze glutes to protect spine' },
        { name: 'Bent-Over Rows', sets: 4, reps: '8', rpe: 'RPE 8', notes: 'Row to lower ribcage' }
      ]
    },
    {
      id: 'w10',
      title: 'ARM DESTRUCTION PROTOCOL',
      subtitle: 'BICEPS & TRICEPS HYPERTROPHY',
      level: 'ADVANCED',
      duration: '45 MIN',
      description: 'A focused, high-volume arm routine utilizing supersets to maximize pump and muscle breakdown.',
      restDefault: 60,
      type: 'strength',
      focus: 'upper body',
      difficulty: 'advanced',
      equipment: ['dumbbells', 'cable'],
      exercises: [
        { name: 'Barbell Bicep Curls', sets: 4, reps: '10-12', rpe: 'RPE 8.5', notes: 'Strict form, no swinging' },
        { name: 'Overhead Triceps Extension', sets: 4, reps: '12-15', rpe: 'RPE 9', notes: 'Deep stretch at the bottom' },
        { name: 'Hammer Curls', sets: 3, reps: '10', rpe: 'RPE 8', notes: 'Target the brachialis' },
        { name: 'Triceps Rope Pushdowns', sets: 3, reps: '15', rpe: 'RPE 9', notes: 'Flare the rope at the bottom' },
        { name: 'Concentration Curls', sets: 3, reps: '12/arm', rpe: 'RPE 8.5', notes: 'Squeeze at the peak' }
      ]
    },
    {
      id: 'w11',
      title: 'OLYMPIC EXPLOSION',
      subtitle: 'POWER & VELOCITY',
      level: 'ELITE',
      duration: '60 MIN',
      description: 'Highly technical Olympic weightlifting movements for maximal power output.',
      restDefault: 180,
      type: 'combat',
      focus: 'full body',
      difficulty: 'advanced',
      equipment: ['barbell'],
      exercises: [
        { name: 'Power Clean', sets: 5, reps: '3', rpe: 'RPE 8', notes: 'Explosive hip extension' },
        { name: 'Snatch Balance', sets: 4, reps: '4', rpe: 'RPE 7.5', notes: 'Drop fast under the bar' },
        { name: 'Push Press', sets: 4, reps: '5', rpe: 'RPE 8.5', notes: 'Use leg drive' },
        { name: 'Front Squat', sets: 3, reps: '5', rpe: 'RPE 8', notes: 'Maintain upright torso' }
      ]
    },
    {
      id: 'w12',
      title: 'FUNCTIONAL HYPERTROPHY',
      subtitle: 'BODYWEIGHT MASTERY',
      level: 'NORMAL',
      duration: '40 MIN',
      description: 'A calisthenics routine designed to build relative strength and functional muscle mass.',
      restDefault: 60,
      type: 'stretching',
      focus: 'upper body',
      difficulty: 'normal',
      equipment: ['no equipment', 'pull-up bar'],
      exercises: [
        { name: 'Muscle-Ups', sets: 3, reps: 'To failure', rpe: 'RPE 9', notes: 'False grip, explosive pull' },
        { name: 'Archer Push-Ups', sets: 3, reps: '8/arm', rpe: 'RPE 8.5', notes: 'Keep straight arm locked' },
        { name: 'Front Lever Holds', sets: 4, reps: '15 sec', rpe: 'RPE 9', notes: 'Engage lats fully' },
        { name: 'Pistol Squats', sets: 3, reps: '6/leg', rpe: 'RPE 8', notes: 'Control descent' }
      ]
    }
  ];

  const [selectedWorkoutId, setSelectedWorkoutId] = useState('w1');
  const [sessionActive, setSessionActive] = useState(false);
  const [completedSets, setCompletedSets] = useState<{ [key: string]: boolean }>({});
  const [workoutLogHistory, setWorkoutLogHistory] = useState<string[]>([]);
  
  // Filter states
  const [showFilters, setShowFilters] = useState(true);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFocus, setSelectedFocus] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);

  // Timer States
  const [timerSeconds, setTimerSeconds] = useState(90);
  const [timerMax, setTimerMax] = useState(90);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeWorkout = workoutData.find(w => w.id === selectedWorkoutId) || workoutData[0];

  // Compute filtered workouts
  const filteredWorkouts = workoutData.filter((workout) => {
    if (selectedTypes.length > 0 && !selectedTypes.includes(workout.type)) {
      return false;
    }
    if (selectedFocus.length > 0 && !selectedFocus.includes(workout.focus)) {
      return false;
    }
    if (selectedDifficulties.length > 0 && !selectedDifficulties.includes(workout.difficulty)) {
      return false;
    }
    if (selectedEquipments.length > 0) {
      const hasMatchingEquip = workout.equipment.some(eq => selectedEquipments.includes(eq));
      if (!hasMatchingEquip) return false;
    }
    return true;
  });

  // If active selected workout gets filtered out, auto-select first of filtered workouts
  useEffect(() => {
    if (filteredWorkouts.length > 0) {
      const isSelectedVisible = filteredWorkouts.some(w => w.id === selectedWorkoutId);
      if (!isSelectedVisible) {
        setSelectedWorkoutId(filteredWorkouts[0].id);
      }
    }
  }, [filteredWorkouts, selectedWorkoutId]);

  // Load initial logs
  useEffect(() => {
    const history = localStorage.getItem('iron_gold_workout_history');
    if (history) {
      setWorkoutLogHistory(JSON.parse(history));
    }
  }, []);

  // Timer Effect
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            if (timerRef.current) clearInterval(timerRef.current);
            // Flash completed
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerRunning]);

  const handleStartTimer = (seconds: number) => {
    setTimerMax(seconds);
    setTimerSeconds(seconds);
    setTimerRunning(true);
  };

  const handleToggleSet = (exIndex: number, setIndex: number) => {
    const key = `${exIndex}-${setIndex}`;
    const newSets = { ...completedSets, [key]: !completedSets[key] };
    setCompletedSets(newSets);

    // If set was checked, auto-trigger the default rest timer!
    if (!completedSets[key]) {
      handleStartTimer(activeWorkout.restDefault);
    }
  };

  const handleFinishWorkout = () => {
    const now = new Date();
    const timestamp = `${now.toLocaleDateString()} at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const logMsg = `Completed "${activeWorkout.title}" • ${Object.keys(completedSets).filter(k => completedSets[k]).length} sets logged • ${timestamp}`;
    
    const updated = [logMsg, ...workoutLogHistory].slice(0, 5); // keep 5
    setWorkoutLogHistory(updated);
    localStorage.setItem('iron_gold_workout_history', JSON.stringify(updated));

    // Reset states
    setSessionActive(false);
    setCompletedSets({});
    setTimerRunning(false);
    alert(`🏆 Excellent session! "${activeWorkout.title}" has been saved to your Local Training Journal.`);
  };


  // ----------------------------------------------------
  // TRAINING PLANS STATE & LOGIC (Interactive Scheduler)
  // ----------------------------------------------------
  const defaultPPLPlan: WeeklyPlan = {
    'Monday': { target: 'PUSH A', isRest: false, exercises: [{ name: 'Incline Bench Press', sets: 4, reps: '8', rpe: '9', notes: 'Heavy chest focus' }, { name: 'Dumbbell Lateral Raises', sets: 4, reps: '15', rpe: '8', notes: 'Side delts focus' }] },
    'Tuesday': { target: 'PULL A', isRest: false, exercises: [{ name: 'Weighted Pull-ups', sets: 4, reps: '6', rpe: '8.5', notes: 'Focus on vertical pull' }, { name: 'Incline Dumbbell Curl', sets: 3, reps: '12', rpe: '8', notes: 'Peak biceps stretch' }] },
    'Wednesday': { target: 'LEGS A', isRest: false, exercises: [{ name: 'Barbell Back Squat', sets: 4, reps: '8', rpe: '9', notes: 'Deep parallel load' }] },
    'Thursday': { target: 'REST & HYDRATE', isRest: true, exercises: [] },
    'Friday': { target: 'PUSH B', isRest: false, exercises: [{ name: 'Military Press', sets: 4, reps: '8', rpe: '9', notes: 'Shoulder push load' }, { name: 'Cable Chest Flyes', sets: 3, reps: '12', rpe: '8', notes: 'High peak tension' }] },
    'Saturday': { target: 'PULL B', isRest: false, exercises: [{ name: 'Meadows Rows', sets: 4, reps: '10', rpe: '9', notes: 'Upper back width' }] },
    'Sunday': { target: 'LEGS B (RECOVERY)', isRest: false, exercises: [{ name: 'Romanian Deadlifts', sets: 4, reps: '10', rpe: '8', notes: 'Hamstrings stretch load' }] }
  };

  const defaultArnoldPlan: WeeklyPlan = {
    'Monday': { target: 'CHEST & BACK A', isRest: false, exercises: [{ name: 'Flat Bench Press', sets: 4, reps: '8', rpe: '9', notes: 'Antagonist bench set' }, { name: 'Bent-Over Rows', sets: 4, reps: '8', rpe: '9', notes: 'High volume back row' }] },
    'Tuesday': { target: 'SHOULDERS & ARMS A', isRest: false, exercises: [{ name: 'Overhead Press', sets: 4, reps: '8', rpe: '8.5', notes: 'Delts mass' }, { name: 'Barbell Curls superset Tricep Dips', sets: 4, reps: '10', rpe: '8', notes: 'Maximum arm pump' }] },
    'Wednesday': { target: 'LEGS & ABS A', isRest: false, exercises: [{ name: 'Front Squat', sets: 4, reps: '8', rpe: '9', notes: 'Quad sweep focus' }] },
    'Thursday': { target: 'ACTIVE REST', isRest: true, exercises: [] },
    'Friday': { target: 'CHEST & BACK B', isRest: false, exercises: [{ name: 'Incline Dumbbell Press', sets: 4, reps: '10', rpe: '8.5', notes: 'Upper chest' }] },
    'Saturday': { target: 'SHOULDERS & ARMS B', isRest: false, exercises: [{ name: 'Hammer Curls', sets: 4, reps: '12', rpe: '8', notes: 'Brachialis thickness' }] },
    'Sunday': { target: 'LEGS B (HEAVY)', isRest: false, exercises: [{ name: 'Conventional Deadlift', sets: 3, reps: '5', rpe: '9.5', notes: 'Absolute force' }] }
  };

  const [customPlan, setCustomPlan] = useState<WeeklyPlan>(defaultPPLPlan);
  const [selectedPlanType, setSelectedPlanType] = useState<'ppl' | 'arnold'>('ppl');
  const [selectedDayKey, setSelectedDayKey] = useState<string>('Monday');
  
  // Custom plan add forms
  const [newExName, setNewExName] = useState('');
  const [newExSets, setNewExSets] = useState(3);
  const [newExReps, setNewExReps] = useState('10');
  const [newExRpe, setNewExRpe] = useState('8');
  const [newExNotes, setNewExNotes] = useState('');

  // Hydrate custom plan on load
  useEffect(() => {
    const saved = localStorage.getItem('iron_gold_custom_plan');
    if (saved) {
      setCustomPlan(JSON.parse(saved));
    }
  }, []);

  const handleLoadTemplate = (type: 'ppl' | 'arnold') => {
    const target = type === 'ppl' ? defaultPPLPlan : defaultArnoldPlan;
    setSelectedPlanType(type);
    setCustomPlan(target);
    localStorage.setItem('iron_gold_custom_plan', JSON.stringify(target));
  };

  const handleAddExerciseToPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExName.trim()) return;

    const updated = { ...customPlan };
    updated[selectedDayKey].exercises.push({
      name: newExName,
      sets: newExSets,
      reps: newExReps,
      rpe: `RPE ${newExRpe}`,
      notes: newExNotes
    });
    updated[selectedDayKey].isRest = false; // toggles rest state automatically

    setCustomPlan(updated);
    localStorage.setItem('iron_gold_custom_plan', JSON.stringify(updated));

    // Reset inputs
    setNewExName('');
    setNewExNotes('');
  };

  const handleRemoveExerciseFromPlan = (dayKey: string, exIdx: number) => {
    const updated = { ...customPlan };
    updated[dayKey].exercises.splice(exIdx, 1);
    setCustomPlan(updated);
    localStorage.setItem('iron_gold_custom_plan', JSON.stringify(updated));
  };

  const handleToggleRestDay = (dayKey: string) => {
    const updated = { ...customPlan };
    updated[dayKey].isRest = !updated[dayKey].isRest;
    if (updated[dayKey].isRest) {
      updated[dayKey].exercises = [];
      updated[dayKey].target = 'REST DAY';
    } else {
      updated[dayKey].target = 'CUSTOM TRAINING';
    }
    setCustomPlan(updated);
    localStorage.setItem('iron_gold_custom_plan', JSON.stringify(updated));
  };


  // ----------------------------------------------------
  // PROGRAMS STATE & LOGIC (12-Week Overhaul Trackers)
  // ----------------------------------------------------
  const [selectedProgramId, setSelectedProgramId] = useState<'p1' | 'p2'>('p1');
  const [progProgress, setProgProgress] = useState<{ [key: string]: boolean }>({});
  const [weeklyWeightLogs, setWeeklyWeightLogs] = useState<{ [key: number]: string }>({});
  const [newLogWeight, setNewLogWeight] = useState('');
  const [selectedWeekLog, setSelectedWeekLog] = useState(1);

  useEffect(() => {
    const savedProgress = localStorage.getItem('iron_gold_prog_progress');
    const savedLogs = localStorage.getItem('iron_gold_prog_logs');
    if (savedProgress) setProgProgress(JSON.parse(savedProgress));
    if (savedLogs) setWeeklyWeightLogs(JSON.parse(savedLogs));
  }, []);

  const handleToggleWeek = (weekNum: number) => {
    const key = `${selectedProgramId}-week-${weekNum}`;
    const updated = { ...progProgress, [key]: !progProgress[key] };
    setProgProgress(updated);
    localStorage.setItem('iron_gold_prog_progress', JSON.stringify(updated));
  };

  const handleAddWeightLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogWeight) return;
    const updatedLogs = { ...weeklyWeightLogs, [selectedWeekLog]: newLogWeight };
    setWeeklyWeightLogs(updatedLogs);
    localStorage.setItem('iron_gold_prog_logs', JSON.stringify(updatedLogs));
    setNewLogWeight('');
    alert(`📈 Logged ${newLogWeight} lbs for Week ${selectedWeekLog}!`);
  };

  // Calculate percentage
  const totalWeeks = selectedProgramId === 'p1' ? 12 : 6;
  const completedWeeksCount = Array.from({ length: totalWeeks }).filter((_, i) => {
    return progProgress[`${selectedProgramId}-week-${i + 1}`];
  }).length;
  const progPct = Math.round((completedWeeksCount / totalWeeks) * 100);


  // ----------------------------------------------------
  // CHALLENGES STATE & LOGIC (Arcade Stopwatch / Load Calc)
  // ----------------------------------------------------
  const [selectedChallengeId, setSelectedChallengeId] = useState<'c1' | 'c2' | 'c3' | 'c4'>('c1');
  const [bodyweightInput, setBodyweightInput] = useState('180');
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  
  // Stopwatch for challenges
  const [challengeTime, setChallengeTime] = useState(0);
  const [challengeRunning, setChallengeRunning] = useState(false);
  const challengeTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savedBadges = localStorage.getItem('iron_gold_unlocked_badges');
    if (savedBadges) setUnlockedBadges(JSON.parse(savedBadges));
  }, []);

  useEffect(() => {
    if (challengeRunning) {
      challengeTimerRef.current = setInterval(() => {
        setChallengeTime(p => p + 1);
      }, 1000);
    } else {
      if (challengeTimerRef.current) clearInterval(challengeTimerRef.current);
    }
    return () => {
      if (challengeTimerRef.current) clearInterval(challengeTimerRef.current);
    };
  }, [challengeRunning]);

  const handleResetChallengeStopwatch = () => {
    setChallengeRunning(false);
    setChallengeTime(0);
  };

  const handleUnlockBadge = (badgeName: string) => {
    if (unlockedBadges.includes(badgeName)) return;
    const updated = [...unlockedBadges, badgeName];
    setUnlockedBadges(updated);
    localStorage.setItem('iron_gold_unlocked_badges', JSON.stringify(updated));
    alert(`🎉 GRIT MEDAL UNLOCKED: You earned the legendary "${badgeName}" badge!`);
  };

  const formatStopwatchTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };


  // ----------------------------------------------------
  // GUIDES STATE & LOGIC (E-Reader + Interactive Science Quiz)
  // ----------------------------------------------------
  const guidesData = [
    {
      id: 'g1',
      title: 'MTOR PATHWAY ACTIVATION',
      subtitle: 'PROTEIN KINETICS & AMINO INFUSION',
      author: 'Dr. Marcus Vance, PhD (Physiology)',
      readTime: '8 MIN READ',
      summary: 'An in-depth scientific analysis of how dietary amino acid concentrations activate the mammalian target of rapamycin (mTORC1) to drive skeletal muscle translation.',
      paragraphs: [
        'The mammalian target of rapamycin complex 1 (mTORC1) serves as the primary master control hub integrating nutritional, hormonal, and mechanical load stimuli. When stimulated, mTORC1 initiates a cascade of downstream phosphorylation events that turn on muscle protein synthesis (MPS). Of all essential amino acids (EAAs), Leucine acts as the direct molecular ignition key.',
        'To maximize mTOR signaling, current clinical evidence recommends the "Leucine Trigger Hypothesis". Consuming a minimum of 3.0 to 3.5 grams of free Leucine is required within a meal to peak plasma levels and unlock the cellular gatekeepers (Sestrin2 / GATOR2 complex). This triggers maximum anabolic stimulation for approximately 2 to 3 hours.',
        'Importantly, muscle tissue undergoes a "Refractory Period" after an anabolic bolus. Consuming dietary protein too frequently (e.g. grazing every 90 minutes) leads to receptor desensitization, causing a muted protein synthesis curve. Structuring distinct protein boluses of 30-45g every 3.5 to 4.5 hours yields significantly higher cumulative daily muscle tissue accretion.',
        'Finally, timing matters enormously during the immediate post-workout window. Rapid-absorbing Whey Protein Isolate triggers a rapid hyperaminoacidemia peak to initiate immediate tissue reconstitution, while slow-digesting Casein is best utilized prior to nocturnal fasts to prevent catabolic sleep states.'
      ],
      quiz: [
        {
          q: 'Which specific essential amino acid acts as the direct ignition key to activate mTORC1?',
          options: ['L-Glutamine', 'L-Leucine', 'L-Arginine', 'L-Valine'],
          correct: 1
        },
        {
          q: 'What is the minimum recommended amount of Leucine required to trigger muscle protein synthesis?',
          options: ['0.5 grams', '1.0 gram', '3.0 - 3.5 grams', '10.0 grams'],
          correct: 2
        }
      ]
    },
    {
      id: 'g2',
      title: 'PROGRESSIVE OVERLOAD BLUEPRINT',
      subtitle: 'THE MECHANICS OF MOTOR UNIT RECRUITMENT',
      author: 'Coach J. Sterling, CSCS',
      readTime: '10 MIN READ',
      summary: 'A biomechanical guide detailing the prioritization of mechanical tension over simple metabolic breakdown to build progressive muscular hypertrophy.',
      paragraphs: [
        'Muscular hypertrophy is fundamentally an adaptive response to mechanical overload. Henneman\'s Size Principle states that motor units are recruited in a strict order of ascending threshold. Low-threshold motor units (Type I slow twitch) are recruited first during low-force outputs, while high-threshold motor units (Type II fast twitch, which have the highest capacity for growth) are recruited only when absolute load or muscular fatigue levels demand high force.',
        'To stimulate Type II fibers, you must manipulate three primary variables: Absolute Load (increasing weight), Volume (total sets and repetitions), and Proximity to Failure (RPE/RIR metrics). Simple metabolic burn ("the pump") is secondary to systematic, recorded progression in absolute tension.',
        'An athlete must carefully track their Cumulative Training Volume (Sets x Reps x Weight). If you bench press 200 lbs for 3 sets of 10, your session load is 6,000 lbs. To progress, you can increase weight to 205 lbs, add an extra set, or perform extra reps with identical form. Form must remain completely locked; swinging or using momentum transfers load away from target muscle fibers.',
        'Finally, because progressive overload places tremendous fatigue stresses on both central motor systems and peripheral connective structures, a structured "Deload Week" should be programmed every 6 to 8 weeks. Dropping cumulative intensity by 40% allows micro-tears to recover, paving the way for supercompensation phases.'
      ],
      quiz: [
        {
          q: 'According to Henneman\'s Size Principle, when are high-threshold Type II motor units recruited?',
          options: ['Only during light warm-up sets', 'Only when absolute load or muscular fatigue demands high force', 'When doing high-speed cardio', 'When stretching in between sets'],
          correct: 1
        },
        {
          q: 'What is the correct formula to calculate Cumulative Training Volume?',
          options: ['Sets + Reps + Weight', 'Sets x Reps x Weight', 'Weight / Sets', 'RPE x Rest Time'],
          correct: 1
        }
      ]
    }
  ];

  const [selectedGuideIndex, setSelectedGuideIndex] = useState(0);
  const [bookmarkedGuides, setBookmarkedGuides] = useState<string[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const activeGuide = guidesData[selectedGuideIndex];

  const handleToggleBookmark = (id: string) => {
    if (bookmarkedGuides.includes(id)) {
      setBookmarkedGuides(bookmarkedGuides.filter(b => b !== id));
    } else {
      setBookmarkedGuides([...bookmarkedGuides, id]);
    }
  };

  const handleSelectAnswer = (qIdx: number, optIdx: number) => {
    setQuizAnswers({ ...quizAnswers, [`${activeGuide.id}-${qIdx}`]: optIdx });
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    activeGuide.quiz.forEach((q, idx) => {
      if (quizAnswers[`${activeGuide.id}-${idx}`] === q.correct) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    if (score === activeGuide.quiz.length) {
      handleUnlockBadge(`${activeGuide.id.toUpperCase()}_CERTIFIED`);
    }
  };

  const handleResetQuiz = () => {
    setQuizSubmitted(false);
    setQuizScore(null);
    const cleaned = { ...quizAnswers };
    activeGuide.quiz.forEach((_, idx) => {
      delete cleaned[`${activeGuide.id}-${idx}`];
    });
    setQuizAnswers(cleaned);
  };


  return (
    <section id="athlete-academy" className="py-16 sm:py-24 border-t border-zinc-900/60 dark:border-zinc-900/60 light:border-zinc-200 bg-[#050505] relative overflow-hidden scroll-mt-24">
      {/* Visual gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-gold-500/5 via-transparent to-transparent opacity-80 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headings */}
        <div className="text-center md:text-left mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter leading-[0.95]">
              ATHLETE <span className="text-gold-500 italic">PORTAL</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 font-mono uppercase tracking-wider font-semibold">
              Explore specialized standalone dashboards for single workout trackers, plans, calendars, roadmaps, and whitepapers.
            </p>
          </div>
          
          <div className="flex items-center justify-center md:justify-end gap-3 font-mono text-[10px] text-zinc-500 bg-[#0b0b0d]/50 light:bg-zinc-100 border border-zinc-900/60 light:border-zinc-200/80 px-4 py-2 rounded-xl">
            <span className="h-2 w-2 rounded-full bg-gold-500 animate-pulse" />
            <span>5 STANDALONE COMPLIANCE HUBS ACTIVE</span>
            <button
              onClick={handleRefreshContent}
              title="Fetch / Refresh Portal Data"
              className="ml-2 px-2 py-1 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-gold-400 rounded-md transition-colors cursor-pointer flex items-center gap-1 border border-zinc-800"
            >
              <RotateCcw className={`h-2.5 w-2.5 ${isTabLoading ? 'animate-spin text-gold-500' : ''}`} />
              <span className="text-[8px] font-bold uppercase tracking-wider hidden sm:inline">REFRESH</span>
            </button>
          </div>
        </div>

        {/* Top Segmented Navigation Tabs - Clean Modern Monochrome Styling */}
        <div className="relative mb-12 p-2 sm:p-2.5 bg-[#0b0b0d]/90 light:bg-zinc-100/90 rounded-2xl sm:rounded-3xl border border-zinc-900 light:border-zinc-300 shadow-xl max-w-5xl mx-auto overflow-hidden">
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative z-10">
            
            <button
              onClick={() => handleTabChange('workouts')}
              className={`relative px-4 py-3.5 rounded-xl sm:rounded-2xl border font-display font-black text-xs tracking-wider transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2 ${
                activeTab === 'workouts'
                  ? 'bg-zinc-100 text-zinc-950 border-zinc-100 shadow-md light:bg-zinc-900 light:text-white light:border-zinc-900'
                  : 'bg-zinc-900/40 hover:bg-zinc-800/60 light:bg-white/60 light:hover:bg-white border-zinc-900/60 light:border-zinc-200 text-zinc-400 hover:text-zinc-200 light:text-zinc-600 light:hover:text-black'
              }`}
            >
              <Dumbbell className="h-4.5 w-4.5 stroke-[2.5]" />
              <span className="uppercase font-bold tracking-widest text-[11px]">1. WORKOUTS</span>
            </button>

            <button
              onClick={() => handleTabChange('plans')}
              className={`relative px-4 py-3.5 rounded-xl sm:rounded-2xl border font-display font-black text-xs tracking-wider transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2 ${
                activeTab === 'plans'
                  ? 'bg-zinc-100 text-zinc-950 border-zinc-100 shadow-md light:bg-zinc-900 light:text-white light:border-zinc-900'
                  : 'bg-zinc-900/40 hover:bg-zinc-800/60 light:bg-white/60 light:hover:bg-white border-zinc-900/60 light:border-zinc-200 text-zinc-400 hover:text-zinc-200 light:text-zinc-600 light:hover:text-black'
              }`}
            >
              <Calendar className="h-4.5 w-4.5 stroke-[2.5]" />
              <span className="uppercase font-bold tracking-widest text-[11px]">2. TRAINING PLANS</span>
            </button>

            <button
              onClick={() => handleTabChange('programs')}
              className={`relative px-4 py-3.5 rounded-xl sm:rounded-2xl border font-display font-black text-xs tracking-wider transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2 ${
                activeTab === 'programs'
                  ? 'bg-zinc-100 text-zinc-950 border-zinc-100 shadow-md light:bg-zinc-900 light:text-white light:border-zinc-900'
                  : 'bg-zinc-900/40 hover:bg-zinc-800/60 light:bg-white/60 light:hover:bg-white border-zinc-900/60 light:border-zinc-200 text-zinc-400 hover:text-zinc-200 light:text-zinc-600 light:hover:text-black'
              }`}
            >
              <TrendingUp className="h-4.5 w-4.5 stroke-[2.5]" />
              <span className="uppercase font-bold tracking-widest text-[11px]">3. PROGRAMS</span>
            </button>

            <button
              onClick={() => handleTabChange('challenges')}
              className={`relative px-4 py-3.5 rounded-xl sm:rounded-2xl border font-display font-black text-xs tracking-wider transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2 ${
                activeTab === 'challenges'
                  ? 'bg-zinc-100 text-zinc-950 border-zinc-100 shadow-md light:bg-zinc-900 light:text-white light:border-zinc-900'
                  : 'bg-zinc-900/40 hover:bg-zinc-800/60 light:bg-white/60 light:hover:bg-white border-zinc-900/60 light:border-zinc-200 text-zinc-400 hover:text-zinc-200 light:text-zinc-600 light:hover:text-black'
              }`}
            >
              <Flame className="h-4.5 w-4.5 stroke-[2.5]" />
              <span className="uppercase font-bold tracking-widest text-[11px]">4. CHALLENGES</span>
            </button>

          </div>
        </div>


        {/* Interactive Dashboards with Custom Sub-Components and rich user-friendly UI */}
        <AnimatePresence mode="wait">
          
          {isTabLoading ? (
            <motion.div
              key="skeleton-loading-state"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <AcademyPortalSkeleton tab={activeTab} />
            </motion.div>
          ) : (
            <>
              {/* TAB 1: WORKOUT EXECUTION TRACKER WITH ACTIVE TIMER */}
              {activeTab === 'workouts' && (
            <motion.div
              key="workouts-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Filter Sidebar - Styled like the lightweight checklist card requested */}
              {showFilters && (
                <div className="lg:col-span-3 bg-[#f5f5f7] dark:bg-[#0b0b0d]/95 rounded-3xl border border-zinc-200 dark:border-zinc-900 p-5 shadow-xl space-y-6">
                  <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-900 pb-3">
                    <span className="font-display font-black text-sm text-zinc-950 dark:text-white uppercase tracking-wider">FILTERS</span>
                    {((selectedTypes.length + selectedFocus.length + selectedDifficulties.length + selectedEquipments.length) > 0) && (
                      <button
                        onClick={() => {
                          setSelectedTypes([]);
                          setSelectedFocus([]);
                          setSelectedDifficulties([]);
                          setSelectedEquipments([]);
                        }}
                        className="text-[9px] font-mono text-red-500 hover:underline uppercase font-bold cursor-pointer"
                      >
                        RESET ALL
                      </button>
                    )}
                  </div>

                  {/* 1. TYPES */}
                  <div className="space-y-3">
                    <h4 className="font-display font-black text-xs text-zinc-950 dark:text-white uppercase tracking-widest">TYPES</h4>
                    <div className="space-y-2.5">
                      {['strength', 'cardio', 'metcon', 'HIIT', 'combat', 'stretching', 'wellness', 'yoga'].map((type) => {
                        const isChecked = selectedTypes.includes(type);
                        return (
                          <button
                            key={type}
                            onClick={() => {
                              if (isChecked) {
                                setSelectedTypes(selectedTypes.filter(t => t !== type));
                              } else {
                                setSelectedTypes([...selectedTypes, type]);
                              }
                            }}
                            className="flex items-center gap-2.5 w-full text-left font-sans text-zinc-800 dark:text-zinc-300 font-medium text-sm hover:text-black dark:hover:text-white transition-colors cursor-pointer group"
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                              isChecked
                                ? 'bg-gold-500 border-gold-500 text-black'
                                : 'bg-transparent border-zinc-400 dark:border-zinc-700 group-hover:border-gold-500'
                            }`}>
                              {isChecked && <Check className="h-3 w-3 stroke-[3.5]" />}
                            </div>
                            <span className="lowercase">{type}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. FOCUS */}
                  <div className="space-y-3">
                    <h4 className="font-display font-black text-xs text-zinc-950 dark:text-white uppercase tracking-widest">FOCUS</h4>
                    <div className="space-y-2.5">
                      {['full body', 'upper body', 'lower body', 'abs'].map((focus) => {
                        const isChecked = selectedFocus.includes(focus);
                        return (
                          <button
                            key={focus}
                            onClick={() => {
                              if (isChecked) {
                                setSelectedFocus(selectedFocus.filter(f => f !== focus));
                              } else {
                                setSelectedFocus([...selectedFocus, focus]);
                              }
                            }}
                            className="flex items-center gap-2.5 w-full text-left font-sans text-zinc-800 dark:text-zinc-300 font-medium text-sm hover:text-black dark:hover:text-white transition-colors cursor-pointer group"
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                              isChecked
                                ? 'bg-gold-500 border-gold-500 text-black'
                                : 'bg-transparent border-zinc-400 dark:border-zinc-700 group-hover:border-gold-500'
                            }`}>
                              {isChecked && <Check className="h-3 w-3 stroke-[3.5]" />}
                            </div>
                            <span className="lowercase">{focus}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. DIFFICULTY */}
                  <div className="space-y-3">
                    <h4 className="font-display font-black text-xs text-zinc-950 dark:text-white uppercase tracking-widest">DIFFICULTY</h4>
                    <div className="space-y-2.5">
                      {['light', 'easy', 'normal', 'hard', 'advanced'].map((difficulty) => {
                        const isChecked = selectedDifficulties.includes(difficulty);
                        return (
                          <button
                            key={difficulty}
                            onClick={() => {
                              if (isChecked) {
                                setSelectedDifficulties(selectedDifficulties.filter(d => d !== difficulty));
                              } else {
                                setSelectedDifficulties([...selectedDifficulties, difficulty]);
                              }
                            }}
                            className="flex items-center gap-2.5 w-full text-left font-sans text-zinc-800 dark:text-zinc-300 font-medium text-sm hover:text-black dark:hover:text-white transition-colors cursor-pointer group"
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                              isChecked
                                ? 'bg-gold-500 border-gold-500 text-black'
                                : 'bg-transparent border-zinc-400 dark:border-zinc-700 group-hover:border-gold-500'
                            }`}>
                              {isChecked && <Check className="h-3 w-3 stroke-[3.5]" />}
                            </div>
                            <span className="lowercase">{difficulty}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 4. EQUIPMENT */}
                  <div className="space-y-3">
                    <h4 className="font-display font-black text-xs text-zinc-950 dark:text-white uppercase tracking-widest">EQUIPMENT</h4>
                    <div className="space-y-2.5">
                      {['no equipment', 'dumbbells', 'pull-up bar', 'kettlebells', 'barbell'].map((equip) => {
                        const isChecked = selectedEquipments.includes(equip);
                        return (
                          <button
                            key={equip}
                            onClick={() => {
                              if (isChecked) {
                                setSelectedEquipments(selectedEquipments.filter(e => e !== equip));
                              } else {
                                setSelectedEquipments([...selectedEquipments, equip]);
                              }
                            }}
                            className="flex items-center gap-2.5 w-full text-left font-sans text-zinc-800 dark:text-zinc-300 font-medium text-sm hover:text-black dark:hover:text-white transition-colors cursor-pointer group"
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                              isChecked
                                ? 'bg-gold-500 border-gold-500 text-black'
                                : 'bg-transparent border-zinc-400 dark:border-zinc-700 group-hover:border-gold-500'
                            }`}>
                              {isChecked && <Check className="h-3 w-3 stroke-[3.5]" />}
                            </div>
                            <span className="lowercase">{equip}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Left Column: Select Workout List */}
              <div className={`${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'} bg-[#0b0b0d]/90 light:bg-white rounded-3xl border border-zinc-900 light:border-zinc-200 p-5 shadow-xl space-y-4`}>
                <div className="flex items-center justify-between border-b border-zinc-900 light:border-zinc-200 pb-3 gap-2">
                  <div className="flex flex-col">
                    <span className="font-mono text-xs font-black text-white light:text-black uppercase">AVAILABLE MATRIX</span>
                    <span className="text-[8px] font-mono text-zinc-500 uppercase mt-0.5">SELECT TO TRACK</span>
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-2 py-1 rounded-lg border font-mono text-[9px] font-bold uppercase transition-all flex items-center gap-1 cursor-pointer ${
                      showFilters 
                        ? 'bg-gold-500/15 border-gold-500/50 text-gold-500' 
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    <span>FILTERS { (selectedTypes.length + selectedFocus.length + selectedDifficulties.length + selectedEquipments.length) > 0 ? `(${selectedTypes.length + selectedFocus.length + selectedDifficulties.length + selectedEquipments.length})` : '' }</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {filteredWorkouts.length === 0 ? (
                    <div className="p-4 bg-zinc-900/40 rounded-2xl border border-zinc-800 text-center space-y-2">
                      <p className="text-[10px] font-mono text-zinc-500 uppercase">NO WORKOUTS MATCH THE CRITERIA</p>
                      <button
                        onClick={() => {
                          setSelectedTypes([]);
                          setSelectedFocus([]);
                          setSelectedDifficulties([]);
                          setSelectedEquipments([]);
                        }}
                        className="px-2.5 py-1 bg-gold-500 hover:bg-gold-600 text-black font-mono text-[9px] font-black rounded uppercase"
                      >
                        RESET FILTERS
                      </button>
                    </div>
                  ) : (
                    filteredWorkouts.map((workout) => {
                      const isSelected = selectedWorkoutId === workout.id;
                      return (
                        <button
                          key={workout.id}
                          onClick={() => {
                            setSelectedWorkoutId(workout.id);
                            setCompletedSets({});
                            setSessionActive(false);
                          }}
                          className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'bg-gold-500/10 border-gold-500 text-gold-500 shadow-md'
                              : 'bg-[#050505] light:bg-zinc-50 border-zinc-900 light:border-zinc-200 text-zinc-400 hover:text-white light:text-zinc-700 light:hover:text-black'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-zinc-900 light:bg-zinc-200 text-zinc-400 light:text-zinc-700">
                              {workout.level}
                            </span>
                            <span className="text-[9px] font-mono text-zinc-500 font-bold">{workout.duration}</span>
                          </div>
                          <h3 className="font-display font-black text-sm uppercase text-white light:text-black mt-2 leading-tight">
                            {workout.title}
                          </h3>
                          <p className="text-[9px] font-mono text-zinc-500 uppercase mt-0.5">{workout.subtitle}</p>
                          <div className="mt-2.5 flex flex-wrap gap-1">
                            <span className="text-[8px] font-mono bg-zinc-900/60 text-zinc-400 px-1 py-0.5 rounded uppercase">{workout.type}</span>
                            <span className="text-[8px] font-mono bg-zinc-900/60 text-zinc-400 px-1 py-0.5 rounded uppercase">{workout.focus}</span>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>

                {/* Workout History Ledger */}
                <div className="pt-4 border-t border-zinc-900 light:border-zinc-200">
                  <h4 className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2.5">
                    SESSION COMPLIANCE JOURNAL (LOCAL)
                  </h4>
                  {workoutLogHistory.length === 0 ? (
                    <p className="text-[9px] font-mono text-zinc-600 uppercase italic">
                      No recorded workouts in this session yet. Complete sets below to populate.
                    </p>
                  ) : (
                    <div className="space-y-1.5">
                      {workoutLogHistory.map((log, lIdx) => (
                        <div key={lIdx} className="text-[9px] font-mono bg-[#050505] p-2 border border-zinc-900 rounded-lg text-emerald-400 uppercase leading-snug">
                          {log}
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          setWorkoutLogHistory([]);
                          localStorage.removeItem('iron_gold_workout_history');
                        }}
                        className="text-[8px] font-mono text-red-500 hover:underline uppercase font-bold cursor-pointer mt-1 block"
                      >
                        Clear Workout Log Journal
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column (8 cols): Real-time Interactive Exercise Track / Rest Stopwatch */}
              <div className={`${showFilters ? 'lg:col-span-6' : 'lg:col-span-8'} bg-[#0b0b0d]/90 light:bg-white rounded-3xl border border-zinc-900 light:border-zinc-200 p-6 shadow-2xl relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/[0.02] rounded-full blur-3xl pointer-events-none" />

                <div className="border-b border-zinc-900 light:border-zinc-200 pb-4 mb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-[9px] font-mono text-gold-500 font-bold tracking-widest block uppercase">
                      DIET &amp; WORKOUT LAB WORKSPACE
                    </span>
                    <h2 className="font-display font-black text-xl sm:text-2xl text-white light:text-black uppercase mt-1">
                      {activeWorkout.title}
                    </h2>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">{activeWorkout.subtitle}</p>
                  </div>

                  {!sessionActive ? (
                    <button
                      onClick={() => setSessionActive(true)}
                      className="px-5 py-2.5 bg-gold-500 hover:bg-gold-600 text-black font-display font-black text-xs tracking-widest uppercase rounded-xl transition-all duration-300 shadow-lg cursor-pointer"
                    >
                      🚀 START WORKOUT SESSION
                    </button>
                  ) : (
                    <button
                      onClick={handleFinishWorkout}
                      className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-display font-black text-xs tracking-widest uppercase rounded-xl transition-all duration-300 shadow-lg cursor-pointer"
                    >
                      ✓ LOG &amp; FINISH SESSION
                    </button>
                  )}
                </div>

                {/* Interactive Timer HUD (Beautiful glowing bar) */}
                <div className="bg-[#050505] light:bg-zinc-50 border border-zinc-900 light:border-zinc-200 rounded-2xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
                      <Timer className={`h-5 w-5 text-gold-500 ${timerRunning ? 'animate-spin' : ''}`} />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">AUTOMATIC REST INTERVAL STOPWATCH</span>
                      <span className="text-base font-mono font-black text-white light:text-black">
                        {timerSeconds > 0 ? `${timerSeconds}s REMAINING` : 'REST PERIOD FINISHED! NEXT SET NOW.'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleStartTimer(60)}
                      className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] font-mono text-zinc-400 rounded-lg cursor-pointer"
                    >
                      60s
                    </button>
                    <button
                      onClick={() => handleStartTimer(90)}
                      className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] font-mono text-zinc-400 rounded-lg cursor-pointer"
                    >
                      90s
                    </button>
                    <button
                      onClick={() => handleStartTimer(120)}
                      className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] font-mono text-zinc-400 rounded-lg cursor-pointer"
                    >
                      120s
                    </button>
                    <button
                      onClick={() => {
                        setTimerRunning(!timerRunning);
                      }}
                      className="p-1.5 rounded-lg bg-gold-500 text-black cursor-pointer"
                    >
                      {timerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>
                  </div>

                  {/* Progressive Bar */}
                  <div className="w-full md:hidden h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gold-500 transition-all duration-1000"
                      style={{ width: `${(timerSeconds / timerMax) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Progress bar desktop */}
                <div className="hidden md:block w-full h-1 bg-zinc-900 light:bg-zinc-200 rounded-full mb-6 overflow-hidden">
                  <div 
                    className="h-full bg-gold-500 transition-all duration-1000"
                    style={{ width: `${(timerSeconds / timerMax) * 100}%` }}
                  />
                </div>

                {/* Exercises Cards */}
                <div className="space-y-4">
                  {activeWorkout.exercises.map((ex, exIdx) => (
                    <div 
                      key={exIdx}
                      className="p-4 bg-[#050505] light:bg-zinc-50 border border-zinc-900 light:border-zinc-200 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all duration-200"
                    >
                      <div className="space-y-1 md:max-w-md">
                        <div className="flex items-center space-x-2">
                          <span className="text-[9px] font-mono font-bold bg-gold-500/10 text-gold-500 px-2 py-0.5 rounded">
                            EXERCISE {exIdx + 1}
                          </span>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase">{ex.rpe}</span>
                        </div>
                        <h4 className="font-display font-black text-sm uppercase text-white light:text-black">
                          {ex.name}
                        </h4>
                        <p className="text-[10px] text-zinc-400 light:text-zinc-600 font-sans">
                          {ex.notes}
                        </p>
                      </div>

                      {/* Interactive checkboxes for Sets */}
                      <div className="flex flex-col items-end gap-1.5 w-full md:w-auto">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase font-bold">LOG WORK SETS</span>
                        <div className="flex items-center gap-1.5">
                          {Array.from({ length: ex.sets }).map((_, setIdx) => {
                            const isSetDone = completedSets[`${exIdx}-${setIdx}`];
                            return (
                              <button
                                key={setIdx}
                                disabled={!sessionActive}
                                onClick={() => handleToggleSet(exIdx, setIdx)}
                                className={`w-10 h-10 rounded-xl border font-mono text-xs font-bold uppercase transition-all flex flex-col items-center justify-center relative cursor-pointer ${
                                  !sessionActive ? 'opacity-40 cursor-not-allowed' : ''
                                } ${
                                  isSetDone
                                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-inner'
                                    : 'bg-zinc-900 light:bg-white border-zinc-800 light:border-zinc-300 text-zinc-400 light:text-zinc-700 hover:border-gold-500'
                                }`}
                              >
                                <span className="text-[8px] opacity-70 leading-none">SET</span>
                                <span className="text-xs font-black">{setIdx + 1}</span>
                                {isSetDone && (
                                  <span className="absolute -top-1 -right-1 bg-white text-emerald-600 rounded-full p-0.5 border border-emerald-500">
                                    <Check className="h-2 w-2 stroke-[3]" />
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                        <span className="text-[8px] font-mono text-zinc-500 uppercase italic">
                          {ex.reps} Target Reps
                        </span>
                      </div>

                    </div>
                  ))}
                </div>

                {!sessionActive && (
                  <div className="mt-6 p-4 bg-gold-500/5 border border-gold-500/20 rounded-2xl text-center">
                    <p className="text-[10px] font-mono text-zinc-400 uppercase leading-relaxed font-semibold">
                      ⚠️ Hit "START WORKOUT SESSION" above to unlock physical logs, countdown alarms, and set completion recorders.
                    </p>
                  </div>
                )}

              </div>
            </motion.div>
          )}


          {/* TAB 2: INTERACTIVE 7-DAY WEEKLY CALENDAR DECK PLANNER */}
          {activeTab === 'plans' && (
            <motion.div
              key="plans-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Controls HUD and template selector */}
              <div className="bg-[#0b0b0d]/90 light:bg-white border border-zinc-900 light:border-zinc-200 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded bg-gold-500/10 text-gold-500 text-[9px] font-mono font-bold uppercase border border-gold-500/20">
                    SOCIALLY SOURCED ANTHROPOMETRY
                  </div>
                  <h3 className="font-display font-black text-xl text-white light:text-black uppercase mt-1">
                    TRAINING PLAN WEEKLY DECK
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono">
                    Select a scientific split template below, customize the daily lift targets, or write in custom exercises.
                  </p>
                </div>

                <div className="flex items-center space-x-3.5 w-full md:w-auto">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-black">TEMPLATE:</span>
                  <div className="grid grid-cols-2 gap-2 bg-[#050505] light:bg-zinc-100 p-1 rounded-xl border border-zinc-900 light:border-zinc-200">
                    <button
                      onClick={() => handleLoadTemplate('ppl')}
                      className={`px-4 py-2 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
                        selectedPlanType === 'ppl'
                          ? 'bg-gold-500 text-black'
                          : 'text-zinc-400 hover:text-white light:text-zinc-600 light:hover:text-black'
                      }`}
                    >
                      PUSH/PULL/LEGS
                    </button>
                    <button
                      onClick={() => handleLoadTemplate('arnold')}
                      className={`px-4 py-2 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
                        selectedPlanType === 'arnold'
                          ? 'bg-gold-500 text-black'
                          : 'text-zinc-400 hover:text-white light:text-zinc-600 light:hover:text-black'
                      }`}
                    >
                      ARNOLD SPLIT
                    </button>
                  </div>
                </div>
              </div>

              {/* 7-Day Scheduler Board Grid */}
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {Object.keys(customPlan).map((dayKey) => {
                  const dayObj = customPlan[dayKey];
                  const isSelected = selectedDayKey === dayKey;
                  return (
                    <div
                      key={dayKey}
                      onClick={() => setSelectedDayKey(dayKey)}
                      className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[170px] relative ${
                        isSelected
                          ? 'bg-[#0b0b0d] border-gold-500 ring-1 ring-gold-500'
                          : 'bg-[#0b0b0d]/50 light:bg-white border-zinc-900 light:border-zinc-200 hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start border-b border-zinc-900 light:border-zinc-200 pb-2 mb-2">
                          <span className="font-display font-black text-xs uppercase text-white light:text-black">
                            {dayKey.toUpperCase()}
                          </span>
                          <span className={`text-[8px] font-mono px-1 py-0.5 rounded uppercase font-bold ${
                            dayObj.isRest ? 'bg-zinc-900 light:bg-zinc-200 text-zinc-500' : 'bg-gold-500/10 text-gold-500'
                          }`}>
                            {dayObj.isRest ? 'REST' : 'ACTIVE'}
                          </span>
                        </div>

                        <h4 className="font-mono text-[10px] font-black text-gold-500 uppercase tracking-tight">
                          {dayObj.target}
                        </h4>

                        {/* Exercise brief preview */}
                        <div className="space-y-1.5 mt-2.5">
                          {dayObj.isRest ? (
                            <p className="text-[9px] font-mono text-zinc-600 uppercase italic">
                              Reconstituting cellular stores. Hydration and alignment target.
                            </p>
                          ) : (
                            dayObj.exercises.slice(0, 3).map((ex, exIdx) => (
                              <div key={exIdx} className="flex justify-between items-center text-[9px] font-mono text-zinc-400 light:text-zinc-600">
                                <span className="truncate max-w-[80%]">↳ {ex.name}</span>
                                <span className="text-[8px] text-zinc-500">{ex.sets}x{ex.reps}</span>
                              </div>
                            ))
                          )}
                          {dayObj.exercises.length > 3 && (
                            <span className="text-[8px] font-mono text-zinc-500 block">
                              + {dayObj.exercises.length - 3} MORE LIFTS
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-zinc-900/60 light:border-zinc-200 mt-3 flex justify-between items-center text-[8px] font-mono text-zinc-500">
                        <span>{dayObj.exercises.length} Exercises</span>
                        <span className="underline hover:text-white">EDIT</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Day Editor Workspace */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* List & Edit exercises on selected Day (7 cols) */}
                <div className="lg:col-span-7 bg-[#0b0b0d]/90 light:bg-white rounded-3xl border border-zinc-900 light:border-zinc-200 p-6 shadow-xl space-y-5">
                  <div className="flex justify-between items-center border-b border-zinc-900 light:border-zinc-200 pb-3">
                    <div>
                      <span className="text-[9px] font-mono text-gold-500 uppercase block font-bold">EDITOR DESK</span>
                      <h4 className="font-display font-black text-base uppercase text-white light:text-black">
                        {selectedDayKey.toUpperCase()} — {customPlan[selectedDayKey].target}
                      </h4>
                    </div>

                    <button
                      onClick={() => handleToggleRestDay(selectedDayKey)}
                      className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg font-mono text-[9px] text-zinc-400 uppercase cursor-pointer"
                    >
                      TOGGLE REST DAY STATE
                    </button>
                  </div>

                  {customPlan[selectedDayKey].isRest ? (
                    <div className="py-12 text-center space-y-2">
                      <p className="text-xs font-mono text-zinc-500 uppercase font-semibold">
                        This day is marked as an active recovery/rest cycle.
                      </p>
                      <p className="text-[10px] text-zinc-600 font-mono">
                        No skeletal muscle stimulation programmed. Click below to add exercises and activate muscle growth pathways.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {customPlan[selectedDayKey].exercises.length === 0 ? (
                        <p className="text-xs font-mono text-zinc-500 uppercase italic py-4 text-center">
                          No exercises added for this training block yet. Use the quick additions desk on the right!
                        </p>
                      ) : (
                        customPlan[selectedDayKey].exercises.map((ex, idx) => (
                          <div 
                            key={idx} 
                            className="p-3 bg-[#050505] light:bg-zinc-50 border border-zinc-900 light:border-zinc-200 rounded-xl flex justify-between items-center"
                          >
                            <div className="space-y-1">
                              <h5 className="font-display font-black text-xs text-white light:text-black uppercase">
                                {idx + 1}. {ex.name}
                              </h5>
                              <p className="text-[9px] font-mono text-zinc-500 uppercase">
                                {ex.sets} sets x {ex.reps} reps • {ex.rpe} • {ex.notes || 'No extra notes'}
                              </p>
                            </div>

                            <button
                              onClick={() => handleRemoveExerciseFromPlan(selectedDayKey, idx)}
                              className="p-1.5 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors cursor-pointer"
                              title="Delete Exercise"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>

                {/* Quick Add Exercise Form Desk (5 cols) */}
                <div className="lg:col-span-5 bg-[#0b0b0d]/90 light:bg-white rounded-3xl border border-zinc-900 light:border-zinc-200 p-6 shadow-xl">
                  <h4 className="font-display font-black text-sm uppercase text-white light:text-black border-b border-zinc-900 light:border-zinc-200 pb-3 mb-4">
                    QUICK ADDITION DESK
                  </h4>

                  <form onSubmit={handleAddExerciseToPlan} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">EXERCISE NAME</label>
                      <input
                        type="text"
                        placeholder="e.g. Incline Bench Press, Leg Curls"
                        value={newExName}
                        onChange={(e) => setNewExName(e.target.value)}
                        className="w-full bg-[#050505] border border-zinc-900 rounded-xl px-3 py-2 text-xs text-white"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">SETS</label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={newExSets}
                          onChange={(e) => setNewExSets(parseInt(e.target.value) || 3)}
                          className="w-full bg-[#050505] border border-zinc-900 rounded-xl px-3 py-2 text-xs text-white"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">REPS</label>
                        <input
                          type="text"
                          placeholder="e.g. 10 or 8-12"
                          value={newExReps}
                          onChange={(e) => setNewExReps(e.target.value)}
                          className="w-full bg-[#050505] border border-zinc-900 rounded-xl px-3 py-2 text-xs text-white"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">TARGET RPE</label>
                        <select
                          value={newExRpe}
                          onChange={(e) => setNewExRpe(e.target.value)}
                          className="w-full bg-[#050505] border border-zinc-900 rounded-xl px-2 py-2 text-xs text-white"
                        >
                          <option value="6">RPE 6 (Light)</option>
                          <option value="7">RPE 7 (Warmup)</option>
                          <option value="8">RPE 8 (Moderate)</option>
                          <option value="8.5">RPE 8.5 (Hard)</option>
                          <option value="9">RPE 9 (Very Hard)</option>
                          <option value="9.5">RPE 9.5 (Near Fail)</option>
                          <option value="10">RPE 10 (Failure)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">COACH NOTES (OPTIONAL)</label>
                      <input
                        type="text"
                        placeholder="e.g. Squeeze 2s at peak, slow negative"
                        value={newExNotes}
                        onChange={(e) => setNewExNotes(e.target.value)}
                        className="w-full bg-[#050505] border border-zinc-900 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gold-500 hover:bg-gold-600 text-black font-display font-black text-xs tracking-widest uppercase rounded-xl transition-all shadow-md cursor-pointer mt-1"
                    >
                      + ADD EXERCISE TO SCHEDULE
                    </button>
                  </form>
                </div>

              </div>
            </motion.div>
          )}


          {/* TAB 3: MULTI-WEEK TIMELINE ROADMAP AND VOLUME LOGS */}
          {activeTab === 'programs' && (
            <motion.div
              key="programs-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column (4 cols): Program Selection & Statistics Dial */}
              <div className="lg:col-span-4 bg-[#0b0b0d]/90 light:bg-white border border-zinc-900 light:border-zinc-200 p-5 rounded-3xl shadow-xl space-y-6 text-center md:text-left">
                <div className="border-b border-zinc-900 light:border-zinc-200 pb-3 text-left">
                  <span className="text-[9px] font-mono text-zinc-500 font-bold uppercase block">ACTIVE TIMETABLE MATRIX</span>
                  <h4 className="font-display font-black text-sm uppercase text-white light:text-black">TRANSFORMATION PROGRAMS</h4>
                </div>

                <div className="space-y-3.5 text-left">
                  <button
                    onClick={() => {
                      setSelectedProgramId('p1');
                    }}
                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedProgramId === 'p1'
                        ? 'bg-gold-500/10 border-gold-500 text-gold-500'
                        : 'bg-transparent border-zinc-900 light:border-zinc-200 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-900 light:bg-zinc-200 text-zinc-400">
                      12 WEEKS • MASS BUILD
                    </span>
                    <h5 className="font-display font-black text-sm uppercase text-white light:text-black mt-2">
                      12-WEEK HYPERTROPHY OVERHAUL
                    </h5>
                    <p className="text-[9px] font-mono text-zinc-500 uppercase mt-0.5">3 Progressive Volume phases</p>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedProgramId('p2');
                    }}
                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedProgramId === 'p2'
                        ? 'bg-gold-500/10 border-gold-500 text-gold-500'
                        : 'bg-transparent border-zinc-900 light:border-zinc-200 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-900 light:bg-zinc-200 text-zinc-400">
                      6 WEEKS • SHRED LIMITS
                    </span>
                    <h5 className="font-display font-black text-sm uppercase text-white light:text-black mt-2">
                      6-WEEK SHRED CORE MATRIX
                    </h5>
                    <p className="text-[9px] font-mono text-zinc-500 uppercase mt-0.5">Aggressive caloric partitioning</p>
                  </button>
                </div>

                {/* Progress Gauges */}
                <div className="bg-[#050505] light:bg-zinc-50 border border-zinc-900 light:border-zinc-200 rounded-2xl p-5 flex flex-col items-center">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase font-black tracking-wider block mb-4">
                    PROGRAM ADHERENCE SCALE
                  </span>
                  
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* background track */}
                      <circle cx="50" cy="50" r="40" stroke="#18181b" strokeWidth="6" fill="transparent" />
                      {/* progress circle */}
                      <circle 
                        cx="50" cy="50" r="40" 
                        stroke="#d4a359" strokeWidth="6" fill="transparent"
                        strokeDasharray="251.2"
                        strokeDashoffset={251.2 - (251.2 * progPct) / 100}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="font-mono text-xl font-black text-white light:text-black block">{progPct}%</span>
                      <span className="text-[8px] font-mono text-zinc-500 uppercase block">DONE</span>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <span className="text-[10px] font-mono text-zinc-400 light:text-zinc-700 block uppercase font-bold">
                      {completedWeeksCount} OF {totalWeeks} WEEKS COMPLETED
                    </span>
                    <span className="text-[8px] font-mono text-zinc-500 uppercase mt-0.5 block leading-relaxed">
                      Sustained motor units and compliance recorded inside system.
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column (8 cols): Roadmap Timeline and Interactive Completion log */}
              <div className="lg:col-span-8 bg-[#0b0b0d]/90 light:bg-white border border-zinc-900 light:border-zinc-200 p-6 rounded-3xl shadow-xl space-y-6">
                <div className="border-b border-zinc-900 light:border-zinc-200 pb-3 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] font-mono text-gold-500 font-bold block uppercase">
                      ACTIVE PATHWAY TIMELINE
                    </span>
                    <h3 className="font-display font-black text-lg text-white light:text-black uppercase">
                      {selectedProgramId === 'p1' ? '12-WEEK HYPERTROPHY OVERHAUL' : '6-WEEK SHRED CARDIO CORE'}
                    </h3>
                  </div>

                  <span className="text-[9px] font-mono text-zinc-500 uppercase">PROGRESSIVE OVERLOAD</span>
                </div>

                {/* Vertical interactive timeline */}
                <div className="space-y-4">
                  {Array.from({ length: totalWeeks }).map((_, idx) => {
                    const weekNum = idx + 1;
                    const isWeekDone = progProgress[`${selectedProgramId}-week-${weekNum}`];
                    
                    // Determine phase
                    let phaseLabel = 'PHASE 1: VOLUME INTAKE';
                    let desc = 'Focus on building neural stamina and metabolic accumulation with medium-high repetitions.';
                    if (selectedProgramId === 'p1') {
                      if (weekNum > 4 && weekNum <= 8) {
                        phaseLabel = 'PHASE 2: INTENSITY MAX';
                        desc = 'Introduce mechanical tension. Increase sets weight while decreasing reps to 6-8 per work set.';
                      } else if (weekNum > 8) {
                        phaseLabel = 'PHASE 3: PEAK OVERLOAD';
                        desc = 'Intense neurological stimulation. Rest pause, drop-sets, and targeting direct absolute failures.';
                      }
                    } else {
                      if (weekNum > 3) {
                        phaseLabel = 'PHASE 2: FAT OXIDATION';
                        desc = 'Aggressive glycogen depletion, short rest intervals, and steady state LISS cardio cycles.';
                      }
                    }

                    return (
                      <div 
                        key={weekNum}
                        className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                          isWeekDone
                            ? 'bg-emerald-500/5 border-emerald-500/20'
                            : 'bg-[#050505] light:bg-zinc-50 border-zinc-900 light:border-zinc-200'
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <button
                            onClick={() => handleToggleWeek(weekNum)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                              isWeekDone
                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                : 'bg-transparent border-zinc-800 text-zinc-500 hover:border-gold-500'
                            }`}
                          >
                            {isWeekDone ? <Check className="h-4.5 w-4.5 stroke-[3]" /> : <span className="font-mono text-xs">{weekNum}</span>}
                          </button>

                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-display font-black text-xs text-white light:text-black">
                                WEEK {weekNum}
                              </span>
                              <span className="text-[8px] font-mono text-gold-500 uppercase">{phaseLabel}</span>
                            </div>
                            <p className="text-[10px] text-zinc-400 light:text-zinc-600 max-w-lg leading-relaxed">
                              {desc}
                            </p>
                          </div>
                        </div>

                        {/* Interactive log stats for this week */}
                        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end border-t sm:border-t-0 border-zinc-900/60 light:border-zinc-200 pt-3 sm:pt-0">
                          <div className="text-right">
                            <span className="text-[8px] font-mono text-zinc-500 uppercase block">WEEKLY BW</span>
                            <span className="font-mono text-[10px] font-black text-white light:text-black">
                              {weeklyWeightLogs[weekNum] ? `${weeklyWeightLogs[weekNum]} LBS` : 'UNLOGGED'}
                            </span>
                          </div>
                          <button
                            onClick={() => setSelectedWeekLog(weekNum)}
                            className="p-1.5 rounded bg-zinc-900 hover:bg-gold-500 hover:text-black text-zinc-400 transition-colors cursor-pointer text-[8px] font-mono font-bold uppercase"
                          >
                            LOG
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* Metric Log entry form popover inside programs */}
                <div className="p-4 bg-[#050505] light:bg-zinc-50 border border-zinc-900 light:border-zinc-200 rounded-2xl">
                  <h4 className="font-display font-black text-xs text-white light:text-black uppercase mb-3 flex items-center gap-1">
                    <Activity className="h-3.5 w-3.5 text-gold-500" />
                    RECORD WEIGHT &amp; CALORIC COMPLIANCE FOR WEEK {selectedWeekLog}
                  </h4>
                  <form onSubmit={handleAddWeightLog} className="flex flex-col sm:flex-row items-end gap-4">
                    <div className="space-y-1 w-full">
                      <label className="text-[8px] font-mono text-zinc-500 uppercase block">BODYWEIGHT (LBS)</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="e.g. 182.4"
                        value={newLogWeight}
                        onChange={(e) => setNewLogWeight(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="py-2 px-4 bg-gold-500 hover:bg-gold-600 text-black font-display font-black text-[10px] tracking-widest uppercase rounded-lg transition-all cursor-pointer whitespace-nowrap"
                    >
                      ✓ LOG WEEK {selectedWeekLog} BW
                    </button>
                  </form>
                </div>

              </div>
            </motion.div>
          )}


          {/* TAB 4: MILITARY STYLE GRIT CHALLENGES + ACTIVE STOPWATCH */}
          {activeTab === 'challenges' && (
            <motion.div
              key="challenges-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Panel (4 cols): Select challenge & stats */}
              <div className="lg:col-span-4 bg-[#0b0b0d]/90 light:bg-white border border-zinc-900 light:border-zinc-200 p-5 rounded-3xl shadow-xl space-y-6">
                <div className="border-b border-zinc-900 light:border-zinc-200 pb-3">
                  <span className="text-[9px] font-mono text-zinc-500 font-bold uppercase block">GRIT MATRIX STATIONS</span>
                  <h4 className="font-display font-black text-sm uppercase text-white light:text-black">CHOOSE GRIT TEST</h4>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setSelectedChallengeId('c1');
                      handleResetChallengeStopwatch();
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                      selectedChallengeId === 'c1'
                        ? 'bg-gold-500/10 border-gold-500 text-gold-500'
                        : 'bg-[#050505] border-zinc-900 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/20 uppercase font-black">
                      ELITE STAMINA
                    </span>
                    <h3 className="font-display font-black text-xs uppercase text-white light:text-black mt-2">
                      THE CENTURY SQUAT GRIT TEST
                    </h3>
                    <p className="text-[8px] font-mono text-zinc-500 uppercase mt-0.5">100 Contiguous reps load</p>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedChallengeId('c2');
                      handleResetChallengeStopwatch();
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                      selectedChallengeId === 'c2'
                        ? 'bg-gold-500/10 border-gold-500 text-gold-500'
                        : 'bg-[#050505] border-zinc-900 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/20 uppercase font-black">
                      ELITE POWER
                    </span>
                    <h3 className="font-display font-black text-xs uppercase text-white light:text-black mt-2">
                      10K LB DEADLIFT DASH
                    </h3>
                    <p className="text-[8px] font-mono text-zinc-500 uppercase mt-0.5">Cumulative absolute volume metric</p>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedChallengeId('c3');
                      handleResetChallengeStopwatch();
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                      selectedChallengeId === 'c3'
                        ? 'bg-gold-500/10 border-gold-500 text-gold-500'
                        : 'bg-[#050505] border-zinc-900 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 uppercase font-black">
                      ELITE ENDURANCE
                    </span>
                    <h3 className="font-display font-black text-xs uppercase text-white light:text-black mt-2">
                      THE IRON MURPH
                    </h3>
                    <p className="text-[8px] font-mono text-zinc-500 uppercase mt-0.5">1 Mile, 100 Pulls, 200 Pushes, 300 Squats</p>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedChallengeId('c4');
                      handleResetChallengeStopwatch();
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                      selectedChallengeId === 'c4'
                        ? 'bg-gold-500/10 border-gold-500 text-gold-500'
                        : 'bg-[#050505] border-zinc-900 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/20 uppercase font-black">
                      BRUTE STRENGTH
                    </span>
                    <h3 className="font-display font-black text-xs uppercase text-white light:text-black mt-2">
                      1000 LBS CLUB QUALIFIER
                    </h3>
                    <p className="text-[8px] font-mono text-zinc-500 uppercase mt-0.5">Bench + Squat + Deadlift = 1000+</p>
                  </button>
                </div>

                {/* Badge Case */}
                <div className="pt-4 border-t border-zinc-900 light:border-zinc-200">
                  <h4 className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-3 text-center sm:text-left">
                    UNLOCKED GRIT BADGES ({unlockedBadges.length})
                  </h4>
                  {unlockedBadges.length === 0 ? (
                    <p className="text-[9px] font-mono text-zinc-600 uppercase italic text-center sm:text-left">
                      No badges unlocked yet. Complete challenges or quizzes to display achievements.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {unlockedBadges.map((badge) => (
                        <div key={badge} className="p-2 bg-[#050505] border border-zinc-900 rounded-xl text-center space-y-1">
                          <Award className="h-5 w-5 text-gold-500 mx-auto" />
                          <span className="text-[8px] font-mono text-white block uppercase leading-tight truncate">
                            {badge.replace('_', ' ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Panel (8 cols): Large Interactive Calc, active stopwatch and logs */}
              <div className="lg:col-span-8 bg-[#0b0b0d]/90 light:bg-white border border-zinc-900 light:border-zinc-200 p-6 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/[0.02] rounded-full blur-3xl pointer-events-none" />

                <div className="border-b border-zinc-900 pb-4">
                  <span className="text-[9px] font-mono text-red-500 font-bold block uppercase tracking-widest">
                    ⚠️ CRITICAL TEST OF PATHWAY STRESS
                  </span>
                  <h3 className="font-display font-black text-xl text-white light:text-black uppercase mt-1">
                    {selectedChallengeId === 'c1' ? 'THE CENTURY SQUAT GRIT TEST' : 
                     selectedChallengeId === 'c2' ? '10K LB DEADLIFT DASH' :
                     selectedChallengeId === 'c3' ? 'THE IRON MURPH' :
                     '1000 LBS CLUB QUALIFIER'}
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono mt-0.5">
                    {selectedChallengeId === 'c1' 
                      ? 'Perform as few sets as possible to reach 100 deep parallel reps with absolute control.' 
                      : selectedChallengeId === 'c2'
                      ? 'Complete 10,000 lbs of total deadlift volume in under 10 minutes.'
                      : selectedChallengeId === 'c3'
                      ? 'Run 1 Mile, 100 Pull-ups, 200 Push-ups, 300 Squats, Run 1 Mile with a 20lb vest.'
                      : 'Combined 1RM of Bench Press, Back Squat, and Deadlift must total at least 1,000 lbs.'}
                  </p>
                </div>

                {/* Auto Dynamic Calculator */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#050505] light:bg-zinc-50 border border-zinc-900 light:border-zinc-200 p-5 rounded-2xl">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-gold-500 uppercase block font-bold">
                      ENTER YOUR BODYWEIGHT (LBS)
                    </span>
                    <input
                      type="number"
                      value={bodyweightInput}
                      onChange={(e) => setBodyweightInput(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white w-full"
                    />
                    <p className="text-[8px] font-mono text-zinc-500 uppercase">
                      Required for specific targeted compound percentages.
                    </p>
                  </div>

                  <div className="p-3 bg-zinc-950 border border-zinc-900/60 rounded-xl flex flex-col justify-center">
                    <span className="text-[8px] font-mono text-zinc-500 uppercase block">CALCULATED TARGET GOAL:</span>
                    <span className="font-mono text-base font-black text-white mt-1 uppercase">
                      {selectedChallengeId === 'c1'
                        ? `${Math.round((parseInt(bodyweightInput) || 180) * 0.5)} LBS FOR 100 TOTAL REPS`
                        : selectedChallengeId === 'c2'
                        ? `10,000 LBS VOLUME (e.g. 225 LBS x 45 REPS)`
                        : selectedChallengeId === 'c3'
                        ? `600 TOTAL REPS + 2 MILES (VEST: 20 LBS)`
                        : `1000 LBS TOTAL COMBINED 1RM`}
                    </span>
                  </div>
                </div>

                {/* Interactive Stopwatch */}
                <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-3.5">
                    <div className="h-12 w-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                      <Clock className={`h-6 w-6 ${challengeRunning ? 'animate-pulse' : ''}`} />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 block uppercase font-bold">CHALLENGE STOPWATCH TIMER</span>
                      <span className="font-mono text-2xl font-black text-white">
                        {formatStopwatchTime(challengeTime)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setChallengeRunning(!challengeRunning)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-mono font-bold uppercase cursor-pointer ${
                        challengeRunning ? 'bg-red-500 text-white' : 'bg-gold-500 text-black'
                      }`}
                    >
                      {challengeRunning ? 'PAUSE CLOCK' : 'START CLOCK'}
                    </button>
                    <button
                      onClick={handleResetChallengeStopwatch}
                      className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Grit Badge unlocks */}
                <div className="space-y-4">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                    UNLOCABLE RECORD STATIONS
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-3">
                      <div>
                        <span className="font-display font-black text-xs text-white uppercase block">
                          LEVEL 1: COMPLIANCE REQUISITE
                        </span>
                        <p className="text-[9px] font-mono text-zinc-500 uppercase">
                          Complete the workout target safely with absolute control.
                        </p>
                      </div>
                      <button
                        onClick={() => handleUnlockBadge(
                          selectedChallengeId === 'c1' ? 'SQUAT_CENTURION' : 
                          selectedChallengeId === 'c2' ? 'DEADLIFT_TITAN' :
                          selectedChallengeId === 'c3' ? 'MURPH_SURVIVOR' :
                          'CLUB_1000_INITIATE'
                        )}
                        className="py-1.5 w-full bg-zinc-900 hover:bg-gold-500 hover:text-black text-[9px] font-mono font-bold uppercase rounded-lg transition-colors cursor-pointer"
                      >
                        CLAIM STANDARD MEDAL
                      </button>
                    </div>

                    <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-3">
                      <div>
                        <span className="font-display font-black text-xs text-white uppercase block">
                          LEVEL 2: ELITE GRIT
                        </span>
                        <p className="text-[9px] font-mono text-zinc-500 uppercase">
                          {selectedChallengeId === 'c1' ? 'Finish below 8 minutes for Squats.' :
                           selectedChallengeId === 'c2' ? 'Finish below 6 minutes for Deadlift.' :
                           selectedChallengeId === 'c3' ? 'Finish the entire Murph in under 40 minutes.' :
                           'Total combined 1RM exceeds 1,500 lbs.'}
                        </p>
                      </div>
                      <button
                        onClick={() => handleUnlockBadge(
                          selectedChallengeId === 'c1' ? 'IRON_WILL_SQUATS' : 
                          selectedChallengeId === 'c2' ? 'TITANIC_FORCE' :
                          selectedChallengeId === 'c3' ? 'MURPH_ELITE_SUB_40' :
                          'LIFTER_SUPREME_1500'
                        )}
                        className="py-1.5 w-full bg-zinc-900 hover:bg-gold-500 hover:text-black text-[9px] font-mono font-bold uppercase rounded-lg transition-colors cursor-pointer"
                      >
                        CLAIM ELITE MEDAL
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
            </>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
}
