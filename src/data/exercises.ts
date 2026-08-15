export interface Exercise {
  id: string;
  name: string;
  category: 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core' | 'Full Body';
  primaryMuscle: string;
  secondaryMuscles: string[];
  equipment: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  instructions: string[];
  tips: string[];
  videoUrl?: string;
  imageUrl?: string;
}

export const exercisesDatabase: Exercise[] = [
  {
    "id": "Alternating_Floor_Press",
    "name": "Alternating Floor Press",
    "category": "Chest",
    "primaryMuscle": "chest",
    "secondaryMuscles": [
      "abdominals",
      "shoulders",
      "triceps"
    ],
    "equipment": "kettlebells",
    "difficulty": "Beginner",
    "instructions": [
      "Lie on the floor with two kettlebells next to your shoulders.",
      "Position one in place on your chest and then the other, gripping the kettlebells on the handle with the palms facing forward.",
      "Extend both arms, so that the kettlebells are being held above your chest. Lower one kettlebell, bringing it to your chest and turn the wrist in the direction of the locked out kettlebell.",
      "Raise the kettlebell and repeat on the opposite side."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternating_Floor_Press%2F0.jpg"
  },
  {
    "id": "Around_The_Worlds",
    "name": "Around The Worlds",
    "category": "Chest",
    "primaryMuscle": "chest",
    "secondaryMuscles": [
      "shoulders"
    ],
    "equipment": "dumbbell",
    "difficulty": "Intermediate",
    "instructions": [
      "Lay down on a flat bench holding a dumbbell in each hand with the palms of the hands facing towards the ceiling. Tip: Your arms should be parallel to the floor and next to your thighs. To avoid injury, make sure that you keep your elbows slightly bent. This will be your starting position.",
      "Now move the dumbbells by creating a semi-circle as you displace them from the initial position to over the head. All of the movement should happen with the arms parallel to the floor at all times. Breathe in as you perform this portion of the movement.",
      "Reverse the movement to return the weight to the starting position as you exhale."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Around_The_Worlds%2F0.jpg"
  },
  {
    "id": "Barbell_Bench_Press_-_Medium_Grip",
    "name": "Barbell Bench Press - Medium Grip",
    "category": "Chest",
    "primaryMuscle": "chest",
    "secondaryMuscles": [
      "shoulders",
      "triceps"
    ],
    "equipment": "barbell",
    "difficulty": "Beginner",
    "instructions": [
      "Lie back on a flat bench. Using a medium width grip (a grip that creates a 90-degree angle in the middle of the movement between the forearms and the upper arms), lift the bar from the rack and hold it straight over you with your arms locked. This will be your starting position.",
      "From the starting position, breathe in and begin coming down slowly until the bar touches your middle chest.",
      "After a brief pause, push the bar back to the starting position as you breathe out. Focus on pushing the bar using your chest muscles. Lock your arms and squeeze your chest in the contracted position at the top of the motion, hold for a second and then start coming down slowly again. Tip: Ideally, lowering the weight should take about twice as long as raising it.",
      "Repeat the movement for the prescribed amount of repetitions.",
      "When you are done, place the bar back in the rack."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press_-_Medium_Grip%2F0.jpg"
  },
  {
    "id": "Barbell_Guillotine_Bench_Press",
    "name": "Barbell Guillotine Bench Press",
    "category": "Chest",
    "primaryMuscle": "chest",
    "secondaryMuscles": [
      "shoulders",
      "triceps"
    ],
    "equipment": "barbell",
    "difficulty": "Intermediate",
    "instructions": [
      "Using a medium width grip (a grip that creates a 90-degree angle in the middle of the movement between the forearms and the upper arms), lift the bar from the rack and hold it straight over your neck with your arms locked. This will be your starting position.",
      "As you breathe in, bring the bar down slowly until it is about 1 inch from your neck.",
      "After a second pause, bring the bar back to the starting position as you breathe out and push the bar using your chest muscles. Lock your arms and squeeze your chest in the contracted position, hold for a second and then start coming down slowly again. It should take at least twice as long to go down than to come up.",
      "Repeat the movement for the prescribed amount of repetitions.",
      "When you are done, place the bar back in the rack."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Guillotine_Bench_Press%2F0.jpg"
  },
  {
    "id": "Barbell_Incline_Bench_Press_-_Medium_Grip",
    "name": "Barbell Incline Bench Press - Medium Grip",
    "category": "Chest",
    "primaryMuscle": "chest",
    "secondaryMuscles": [
      "shoulders",
      "triceps"
    ],
    "equipment": "barbell",
    "difficulty": "Beginner",
    "instructions": [
      "Lie back on an incline bench. Using a medium-width grip (a grip that creates a 90-degree angle in the middle of the movement between the forearms and the upper arms), lift the bar from the rack and hold it straight over you with your arms locked. This will be your starting position.",
      "As you breathe in, come down slowly until you feel the bar on you upper chest.",
      "After a second pause, bring the bar back to the starting position as you breathe out and push the bar using your chest muscles. Lock your arms in the contracted position, squeeze your chest, hold for a second and then start coming down slowly again. Tip: it should take at least twice as long to go down than to come up.",
      "Repeat the movement for the prescribed amount of repetitions.",
      "When you are done, place the bar back in the rack."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Incline_Bench_Press_-_Medium_Grip%2F0.jpg"
  },
  {
    "id": "Behind_Head_Chest_Stretch",
    "name": "Behind Head Chest Stretch",
    "category": "Chest",
    "primaryMuscle": "chest",
    "secondaryMuscles": [
      "shoulders"
    ],
    "equipment": "other",
    "difficulty": "Advanced",
    "instructions": [
      "Sit upright on the floor with your partner behind you.",
      "Place your hands behind your hand, and push your elbows back as far as you can. Your partner should hold your elbows. This will be your starting position.",
      "Gently attempt to pull your elbows forward with your hands still behind your head for 10 or more seconds. Your partner should prevent your elbows from moving.",
      "Now, relax your muscles and have your partner gently pull the elbows back as far as it comfortable for you. Be sure to let your partner know when the stretch is adequate to prevent overstretching or injury."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Behind_Head_Chest_Stretch%2F0.jpg"
  },
  {
    "id": "Bench_Press_-_With_Bands",
    "name": "Bench Press - With Bands",
    "category": "Chest",
    "primaryMuscle": "chest",
    "secondaryMuscles": [
      "shoulders",
      "triceps"
    ],
    "equipment": "bands",
    "difficulty": "Beginner",
    "instructions": [
      "Using a flat bench secure a band under the leg of the bench that is nearest to your head.",
      "Once the band is secure, grab it by both handles and lie down on the bench.",
      "Extend your arms so that you are holding the band handles in front of you at shoulder width.",
      "Once at shoulder width, rotate your wrists forward so that the palms of your hands are facing away from you. This will be your starting position.",
      "Bring down the handles slowly until your elbow forms a 90 degree angle. Keep full control at all times.",
      "As you breathe out, bring the handles up using your pectoral muscles. Lock your arms in the contracted position, squeeze your chest, hold for a second and then start coming down slowly. Tip: It should take at least twice as long to go down than to come up.",
      "Repeat the movement for the prescribed amount of repetitions of your training program."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Press_-_With_Bands%2F0.jpg"
  },
  {
    "id": "Bent-Arm_Dumbbell_Pullover",
    "name": "Bent-Arm Dumbbell Pullover",
    "category": "Chest",
    "primaryMuscle": "chest",
    "secondaryMuscles": [
      "lats",
      "shoulders",
      "triceps"
    ],
    "equipment": "dumbbell",
    "difficulty": "Intermediate",
    "instructions": [
      "Place a dumbbell standing up on a flat bench.",
      "Ensuring that the dumbbell stays securely placed at the top of the bench, lie perpendicular to the bench (torso across it as in forming a cross) with only your shoulders lying on the surface. Hips should be below the bench and legs bent with feet firmly on the floor. The head will be off the bench as well.",
      "Grasp the dumbbell with both hands and hold it straight over your chest with a bend in your arms. Both palms should be pressing against the underside one of the sides of the dumbbell. This will be your starting position. Caution: Always ensure that the dumbbell used for this exercise is secure. Using a dumbbell with loose plates can result in the dumbbell falling apart and falling on your face.",
      "While keeping your arms locked in the bent arm position, lower the weight slowly in an arc behind your head while breathing in until you feel a stretch on the chest.",
      "At that point, bring the dumbbell back to the starting position using the arc through which the weight was lowered and exhale as you perform this movement.",
      "Hold the weight on the initial position for a second and repeat the motion for the prescribed number of repetitions."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent-Arm_Dumbbell_Pullover%2F0.jpg"
  },
  {
    "id": "Bodyweight_Flyes",
    "name": "Bodyweight Flyes",
    "category": "Chest",
    "primaryMuscle": "chest",
    "secondaryMuscles": [
      "abdominals",
      "shoulders",
      "triceps"
    ],
    "equipment": "e-z curl bar",
    "difficulty": "Intermediate",
    "instructions": [
      "Position two equally loaded EZ bars on the ground next to each other. Ensure they are able to roll.",
      "Assume a push-up position over the bars, supporting your weight on your toes and hands with your arms extended and body straight.",
      "Place your hands on the bars. This will be your starting position.",
      "Using a slow and controlled motion, move your hands away from the midline of your body, rolling the bars apart. Inhale during this portion of the motion.",
      "After moving the bars as far apart as you can, return to the starting position by pulling them back together. Exhale as you perform this movement."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Flyes%2F0.jpg"
  },
  {
    "id": "Butterfly",
    "name": "Butterfly",
    "category": "Chest",
    "primaryMuscle": "chest",
    "secondaryMuscles": [],
    "equipment": "machine",
    "difficulty": "Beginner",
    "instructions": [
      "Sit on the machine with your back flat on the pad.",
      "Take hold of the handles. Tip: Your upper arms should be positioned parallel to the floor; adjust the machine accordingly. This will be your starting position.",
      "Push the handles together slowly as you squeeze your chest in the middle. Breathe out during this part of the motion and hold the contraction for a second.",
      "Return back to the starting position slowly as you inhale until your chest muscles are fully stretched.",
      "Repeat for the recommended amount of repetitions."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Butterfly%2F0.jpg"
  },
  {
    "id": "Alternating_Kettlebell_Row",
    "name": "Alternating Kettlebell Row",
    "category": "Back",
    "primaryMuscle": "middle back",
    "secondaryMuscles": [
      "biceps",
      "lats"
    ],
    "equipment": "kettlebells",
    "difficulty": "Intermediate",
    "instructions": [
      "Place two kettlebells in front of your feet. Bend your knees slightly and push your butt out as much as possible. As you bend over to get into the starting position grab both kettlebells by the handles.",
      "Pull one kettlebell off of the floor while holding on to the other kettlebell. Retract the shoulder blade of the working side, as you flex the elbow, drawing the kettlebell towards your stomach or rib cage.",
      "Lower the kettlebell in the working arm and repeat with your other arm."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternating_Kettlebell_Row%2F0.jpg"
  },
  {
    "id": "Alternating_Renegade_Row",
    "name": "Alternating Renegade Row",
    "category": "Back",
    "primaryMuscle": "middle back",
    "secondaryMuscles": [
      "abdominals",
      "biceps",
      "chest",
      "lats",
      "triceps"
    ],
    "equipment": "kettlebells",
    "difficulty": "Advanced",
    "instructions": [
      "Place two kettlebells on the floor about shoulder width apart. Position yourself on your toes and your hands as though you were doing a pushup, with the body straight and extended. Use the handles of the kettlebells to support your upper body. You may need to position your feet wide for support.",
      "Push one kettlebell into the floor and row the other kettlebell, retracting the shoulder blade of the working side as you flex the elbow, pulling it to your side.",
      "Then lower the kettlebell to the floor and begin the kettlebell in the opposite hand. Repeat for several reps."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternating_Renegade_Row%2F0.jpg"
  },
  {
    "id": "Band_Assisted_Pull-Up",
    "name": "Band Assisted Pull-Up",
    "category": "Back",
    "primaryMuscle": "lats",
    "secondaryMuscles": [
      "abdominals",
      "forearms",
      "middle back"
    ],
    "equipment": "other",
    "difficulty": "Beginner",
    "instructions": [
      "Choke the band around the center of the pullup bar. You can use different bands to provide varying levels of assistance.",
      "Pull the end of the band down, and place one bent knee into the loop, ensuring it won't slip out. Take a medium to wide grip on the bar. This will be your starting position.",
      "Pull yourself upward by contracting the lats as you flex the elbow. The elbow should be driven to your side. Pull to the front, attempting to get your chin over the bar. Avoid swinging or jerking movements.",
      "After a brief pause, return to the starting position."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Assisted_Pull-Up%2F0.jpg"
  },
  {
    "id": "Barbell_Deadlift",
    "name": "Barbell Deadlift",
    "category": "Back",
    "primaryMuscle": "lower back",
    "secondaryMuscles": [
      "calves",
      "forearms",
      "glutes",
      "hamstrings",
      "lats",
      "middle back",
      "quadriceps",
      "traps"
    ],
    "equipment": "barbell",
    "difficulty": "Intermediate",
    "instructions": [
      "Stand in front of a loaded barbell.",
      "While keeping the back as straight as possible, bend your knees, bend forward and grasp the bar using a medium (shoulder width) overhand grip. This will be the starting position of the exercise. Tip: If it is difficult to hold on to the bar with this grip, alternate your grip or use wrist straps.",
      "While holding the bar, start the lift by pushing with your legs while simultaneously getting your torso to the upright position as you breathe out. In the upright position, stick your chest out and contract the back by bringing the shoulder blades back. Think of how the soldiers in the military look when they are in standing in attention.",
      "Go back to the starting position by bending at the knees while simultaneously leaning the torso forward at the waist while keeping the back straight. When the weights on the bar touch the floor you are back at the starting position and ready to perform another repetition.",
      "Perform the amount of repetitions prescribed in the program."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Deadlift%2F0.jpg"
  },
  {
    "id": "Barbell_Shrug",
    "name": "Barbell Shrug",
    "category": "Back",
    "primaryMuscle": "traps",
    "secondaryMuscles": [],
    "equipment": "barbell",
    "difficulty": "Beginner",
    "instructions": [
      "Stand up straight with your feet at shoulder width as you hold a barbell with both hands in front of you using a pronated grip (palms facing the thighs). Tip: Your hands should be a little wider than shoulder width apart. You can use wrist wraps for this exercise for a better grip. This will be your starting position.",
      "Raise your shoulders up as far as you can go as you breathe out and hold the contraction for a second. Tip: Refrain from trying to lift the barbell by using your biceps.",
      "Slowly return to the starting position as you breathe in.",
      "Repeat for the recommended amount of repetitions."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Shrug%2F0.jpg"
  },
  {
    "id": "Barbell_Shrug_Behind_The_Back",
    "name": "Barbell Shrug Behind The Back",
    "category": "Back",
    "primaryMuscle": "traps",
    "secondaryMuscles": [
      "forearms",
      "middle back"
    ],
    "equipment": "barbell",
    "difficulty": "Beginner",
    "instructions": [
      "Stand up straight with your feet at shoulder width as you hold a barbell with both hands behind your back using a pronated grip (palms facing back). Tip: Your hands should be a little wider than shoulder width apart. You can use wrist wraps for this exercise for better grip. This will be your starting position.",
      "Raise your shoulders up as far as you can go as you breathe out and hold the contraction for a second. Tip: Refrain from trying to lift the barbell by using your biceps. The arms should remain stretched out at all times.",
      "Slowly return to the starting position as you breathe in.",
      "Repeat for the recommended amount of repetitions."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Shrug_Behind_The_Back%2F0.jpg"
  },
  {
    "id": "Bent-Arm_Barbell_Pullover",
    "name": "Bent-Arm Barbell Pullover",
    "category": "Back",
    "primaryMuscle": "lats",
    "secondaryMuscles": [
      "chest",
      "lats",
      "shoulders",
      "triceps"
    ],
    "equipment": "barbell",
    "difficulty": "Intermediate",
    "instructions": [
      "Lie on a flat bench with a barbell using a shoulder grip width.",
      "Hold the bar straight over your chest with a bend in your arms. This will be your starting position.",
      "While keeping your arms in the bent arm position, lower the weight slowly in an arc behind your head while breathing in until you feel a stretch on the chest.",
      "At that point, bring the barbell back to the starting position using the arc through which the weight was lowered and exhale as you perform this movement.",
      "Hold the weight on the initial position for a second and repeat the motion for the prescribed number of repetitions."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent-Arm_Barbell_Pullover%2F0.jpg"
  },
  {
    "id": "Bent_Over_Barbell_Row",
    "name": "Bent Over Barbell Row",
    "category": "Back",
    "primaryMuscle": "middle back",
    "secondaryMuscles": [
      "biceps",
      "lats",
      "shoulders"
    ],
    "equipment": "barbell",
    "difficulty": "Beginner",
    "instructions": [
      "Holding a barbell with a pronated grip (palms facing down), bend your knees slightly and bring your torso forward, by bending at the waist, while keeping the back straight until it is almost parallel to the floor. Tip: Make sure that you keep the head up. The barbell should hang directly in front of you as your arms hang perpendicular to the floor and your torso. This is your starting position.",
      "Now, while keeping the torso stationary, breathe out and lift the barbell to you. Keep the elbows close to the body and only use the forearms to hold the weight. At the top contracted position, squeeze the back muscles and hold for a brief pause.",
      "Then inhale and slowly lower the barbell back to the starting position.",
      "Repeat for the recommended amount of repetitions."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Barbell_Row%2F0.jpg"
  },
  {
    "id": "Bent_Over_One-Arm_Long_Bar_Row",
    "name": "Bent Over One-Arm Long Bar Row",
    "category": "Back",
    "primaryMuscle": "middle back",
    "secondaryMuscles": [
      "biceps",
      "lats",
      "lower back",
      "traps"
    ],
    "equipment": "barbell",
    "difficulty": "Beginner",
    "instructions": [
      "Put weight on one of the ends of an Olympic barbell. Make sure that you either place the other end of the barbell in the corner of two walls; or put a heavy object on the ground so the barbell cannot slide backward.",
      "Bend forward until your torso is as close to parallel with the floor as you can and keep your knees slightly bent.",
      "Now grab the bar with one arm just behind the plates on the side where the weight was placed and put your other hand on your knee. This will be your starting position.",
      "Pull the bar straight up with your elbow in (to maximize back stimulation) until the plates touch your lower chest. Squeeze the back muscles as you lift the weight up and hold for a second at the top of the movement. Breathe out as you lift the weight. Tip: Do not allow for any swinging of the torso. Only the arm should move.",
      "Slowly lower the bar to the starting position getting a nice stretch on the lats. Tip: Do not let the plates touch the floor. To ensure the best range of motion, I recommend using small plates (25-lb ones) as opposed to larger plates (like 35-45lb ones).",
      "Repeat for the recommended amount of repetitions and switch arms."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_One-Arm_Long_Bar_Row%2F0.jpg"
  },
  {
    "id": "Bent_Over_Two-Arm_Long_Bar_Row",
    "name": "Bent Over Two-Arm Long Bar Row",
    "category": "Back",
    "primaryMuscle": "middle back",
    "secondaryMuscles": [
      "biceps",
      "lats"
    ],
    "equipment": "barbell",
    "difficulty": "Intermediate",
    "instructions": [
      "Put weight on one of the ends of an Olympic barbell. Make sure that you either place the other end of the barbell in the corner of two walls; or put a heavy object on the ground so the barbell cannot slide backward.",
      "Bend forward until your torso is as close to parallel with the floor as you can and keep your knees slightly bent.",
      "Now grab the bar with both arms just behind the plates on the side where the weight was placed and put your other hand on your knee. This will be your starting position.",
      "Pull the bar straight up with your elbows in (to maximize back stimulation) until the plates touch your lower chest. Squeeze the back muscles as you lift the weight up and hold for a second at the top of the movement. Breathe out as you lift the weight. Tip: Use a stirrup or double handle cable attachment by hooking it under the end of the bar.",
      "Slowly lower the bar to the starting position getting a nice stretch on the lats. Tip: Do not let the plates touch the floor. To ensure the best range of motion, I recommend using small plates (25-lb ones) as opposed to larger plates (like 35-45lb ones).",
      "Repeat for the recommended amount of repetitions."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Two-Arm_Long_Bar_Row%2F0.jpg"
  },
  {
    "id": "90_90_Hamstring",
    "name": "90/90 Hamstring",
    "category": "Legs",
    "primaryMuscle": "hamstrings",
    "secondaryMuscles": [
      "calves"
    ],
    "equipment": "body only",
    "difficulty": "Beginner",
    "instructions": [
      "Lie on your back, with one leg extended straight out.",
      "With the other leg, bend the hip and knee to 90 degrees. You may brace your leg with your hands if necessary. This will be your starting position.",
      "Extend your leg straight into the air, pausing briefly at the top. Return the leg to the starting position.",
      "Repeat for 10-20 repetitions, and then switch to the other leg."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/90_90_Hamstring%2F0.jpg"
  },
  {
    "id": "All_Fours_Quad_Stretch",
    "name": "All Fours Quad Stretch",
    "category": "Legs",
    "primaryMuscle": "quadriceps",
    "secondaryMuscles": [
      "quadriceps"
    ],
    "equipment": "body only",
    "difficulty": "Intermediate",
    "instructions": [
      "Start off on your hands and knees, then lift your leg off the floor and hold the foot with your hand.",
      "Use your hand to hold the foot or ankle, keeping the knee fully flexed, stretching the quadriceps and hip flexors.",
      "Focus on extending your hips, thrusting them towards the floor. Hold for 10-20 seconds and then switch sides."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/All_Fours_Quad_Stretch%2F0.jpg"
  },
  {
    "id": "Alternate_Leg_Diagonal_Bound",
    "name": "Alternate Leg Diagonal Bound",
    "category": "Legs",
    "primaryMuscle": "quadriceps",
    "secondaryMuscles": [
      "abductors",
      "adductors",
      "calves",
      "glutes",
      "hamstrings"
    ],
    "equipment": "None",
    "difficulty": "Beginner",
    "instructions": [
      "Assume a comfortable stance with one foot slightly in front of the other.",
      "Begin by pushing off with the front leg, driving the opposite knee forward and as high as possible before landing. Attempt to cover as much distance to each side with each bound.",
      "It may help to use a line on the ground to guage distance from side to side.",
      "Repeat the sequence with the other leg."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternate_Leg_Diagonal_Bound%2F0.jpg"
  },
  {
    "id": "Alternating_Hang_Clean",
    "name": "Alternating Hang Clean",
    "category": "Legs",
    "primaryMuscle": "hamstrings",
    "secondaryMuscles": [
      "biceps",
      "calves",
      "forearms",
      "glutes",
      "lower back",
      "traps"
    ],
    "equipment": "kettlebells",
    "difficulty": "Intermediate",
    "instructions": [
      "Place two kettlebells between your feet. To get in the starting position, push your butt back and look straight ahead.",
      "Clean one kettlebell to your shoulder and hold on to the other kettlebell in a hanging position. Clean the kettlebell to your shoulder by extending through the legs and hips as you pull the kettlebell towards your shoulders. Rotate your wrist as you do so.",
      "Lower the cleaned kettlebell to a hanging position and clean the alternate kettlebell. Repeat."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternating_Hang_Clean%2F0.jpg"
  },
  {
    "id": "Ankle_Circles",
    "name": "Ankle Circles",
    "category": "Legs",
    "primaryMuscle": "calves",
    "secondaryMuscles": [],
    "equipment": "None",
    "difficulty": "Beginner",
    "instructions": [
      "Use a sturdy object like a squat rack to hold yourself.",
      "Lift the right leg in the air (just around 2 inches from the floor) and perform a circular motion with the big toe. Pretend that you are drawing a big circle with it. Tip: One circle equals 1 repetition. Breathe normally as you perform the movement.",
      "When you are done with the right foot, then repeat with the left leg."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Ankle_Circles%2F0.jpg"
  },
  {
    "id": "Ankle_On_The_Knee",
    "name": "Ankle On The Knee",
    "category": "Legs",
    "primaryMuscle": "glutes",
    "secondaryMuscles": [],
    "equipment": "None",
    "difficulty": "Beginner",
    "instructions": [
      "From a lying position, bend your knees and keep your feet on the floor.",
      "Place your ankle of one foot on your opposite knee.",
      "Grasp the thigh or knee of the bottom leg and pull both of your legs into the chest. Relax your neck and shoulders. Hold for 10-20 seconds and then switch sides."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Ankle_On_The_Knee%2F0.jpg"
  },
  {
    "id": "Anterior_Tibialis-SMR",
    "name": "Anterior Tibialis-SMR",
    "category": "Legs",
    "primaryMuscle": "calves",
    "secondaryMuscles": [],
    "equipment": "other",
    "difficulty": "Intermediate",
    "instructions": [
      "Begin seated on the ground with your legs bent and your feet on the floor.",
      "Using a Muscle Roller or a rolling pin, apply pressure to the muscles on the outside of your shins. Work from just below the knee to above the ankle, pausing at points of tension for 10-30 seconds. Repeat on the other leg."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Anterior_Tibialis-SMR%2F0.jpg"
  },
  {
    "id": "Balance_Board",
    "name": "Balance Board",
    "category": "Legs",
    "primaryMuscle": "calves",
    "secondaryMuscles": [
      "hamstrings",
      "quadriceps"
    ],
    "equipment": "other",
    "difficulty": "Beginner",
    "instructions": [
      "Place a balance board in front of you.",
      "Stand up on it and try to balance yourself.",
      "Hold the balance for as long as desired."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Balance_Board%2F0.jpg"
  },
  {
    "id": "Ball_Leg_Curl",
    "name": "Ball Leg Curl",
    "category": "Legs",
    "primaryMuscle": "hamstrings",
    "secondaryMuscles": [
      "calves",
      "glutes"
    ],
    "equipment": "exercise ball",
    "difficulty": "Beginner",
    "instructions": [
      "Begin on the floor laying on your back with your feet on top of the ball.",
      "Position the ball so that when your legs are extended your ankles are on top of the ball. This will be your starting position.",
      "Raise your hips off of the ground, keeping your weight on the shoulder blades and your feet.",
      "Flex the knees, pulling the ball as close to you as you can, contracting the hamstrings.",
      "After a brief pause, return to the starting position."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Ball_Leg_Curl%2F0.jpg"
  },
  {
    "id": "Band_Good_Morning",
    "name": "Band Good Morning",
    "category": "Legs",
    "primaryMuscle": "hamstrings",
    "secondaryMuscles": [
      "glutes",
      "lower back"
    ],
    "equipment": "bands",
    "difficulty": "Beginner",
    "instructions": [
      "Using a 41 inch band, stand on one end, spreading your feet a small amount. Bend at the hips to loop the end of the band behind your neck. This will be your starting position.",
      "Keeping your legs straight, extend through the hips to come to a near vertical position.",
      "Ensure that you do not round your back as you go down back to the starting position."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Good_Morning%2F0.jpg"
  },
  {
    "id": "Alternating_Cable_Shoulder_Press",
    "name": "Alternating Cable Shoulder Press",
    "category": "Shoulders",
    "primaryMuscle": "shoulders",
    "secondaryMuscles": [
      "triceps"
    ],
    "equipment": "cable",
    "difficulty": "Beginner",
    "instructions": [
      "Move the cables to the bottom of the tower and select an appropriate weight.",
      "Grasp the cables and hold them at shoulder height, palms facing forward. This will be your starting position.",
      "Keeping your head and chest up, extend through the elbow to press one side directly over head.",
      "After pausing at the top, return to the starting position and repeat on the opposite side."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternating_Cable_Shoulder_Press%2F0.jpg"
  },
  {
    "id": "Alternating_Deltoid_Raise",
    "name": "Alternating Deltoid Raise",
    "category": "Shoulders",
    "primaryMuscle": "shoulders",
    "secondaryMuscles": [],
    "equipment": "dumbbell",
    "difficulty": "Beginner",
    "instructions": [
      "In a standing position, hold a pair of dumbbells at your side.",
      "Keeping your elbows slightly bent, raise the weights directly in front of you to shoulder height, avoiding any swinging or cheating.",
      "Return the weights to your side.",
      "On the next repetition, raise the weights laterally, raising them out to your side to about shoulder height.",
      "Return the weights to the starting position and continue alternating to the front and side."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternating_Deltoid_Raise%2F0.jpg"
  },
  {
    "id": "Alternating_Kettlebell_Press",
    "name": "Alternating Kettlebell Press",
    "category": "Shoulders",
    "primaryMuscle": "shoulders",
    "secondaryMuscles": [
      "triceps"
    ],
    "equipment": "kettlebells",
    "difficulty": "Intermediate",
    "instructions": [
      "Clean two kettlebells to your shoulders. Clean the kettlebells to your shoulders by extending through the legs and hips as you pull the kettlebells towards your shoulders. Rotate your wrists as you do so.",
      "Press one directly overhead by extending through the elbow, turning it so the palm faces forward while holding the other kettlebell stationary .",
      "Lower the pressed kettlebell to the starting position and immediately press with your other arm."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternating_Kettlebell_Press%2F0.jpg"
  },
  {
    "id": "Anti-Gravity_Press",
    "name": "Anti-Gravity Press",
    "category": "Shoulders",
    "primaryMuscle": "shoulders",
    "secondaryMuscles": [
      "middle back",
      "traps",
      "triceps"
    ],
    "equipment": "barbell",
    "difficulty": "Beginner",
    "instructions": [
      "Place a bar on the ground behind the head of an incline bench.",
      "Lay on the bench face down. With a pronated grip, pick the barbell up from the floor. Flex the elbows, performing a reverse curl to bring the bar near your chest. This will be your starting position.",
      "To begin, press the barbell out in front of your head by extending your elbows. Keep your arms parallel to the ground throughout the movement.",
      "Return to the starting position and repeat to complete the set."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Anti-Gravity_Press%2F0.jpg"
  },
  {
    "id": "Arm_Circles",
    "name": "Arm Circles",
    "category": "Shoulders",
    "primaryMuscle": "shoulders",
    "secondaryMuscles": [
      "traps"
    ],
    "equipment": "None",
    "difficulty": "Beginner",
    "instructions": [
      "Stand up and extend your arms straight out by the sides. The arms should be parallel to the floor and perpendicular (90-degree angle) to your torso. This will be your starting position.",
      "Slowly start to make circles of about 1 foot in diameter with each outstretched arm. Breathe normally as you perform the movement.",
      "Continue the circular motion of the outstretched arms for about ten seconds. Then reverse the movement, going the opposite direction."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Arm_Circles%2F0.jpg"
  },
  {
    "id": "Arnold_Dumbbell_Press",
    "name": "Arnold Dumbbell Press",
    "category": "Shoulders",
    "primaryMuscle": "shoulders",
    "secondaryMuscles": [
      "triceps"
    ],
    "equipment": "dumbbell",
    "difficulty": "Intermediate",
    "instructions": [
      "Sit on an exercise bench with back support and hold two dumbbells in front of you at about upper chest level with your palms facing your body and your elbows bent. Tip: Your arms should be next to your torso. The starting position should look like the contracted portion of a dumbbell curl.",
      "Now to perform the movement, raise the dumbbells as you rotate the palms of your hands until they are facing forward.",
      "Continue lifting the dumbbells until your arms are extended above you in straight arm position. Breathe out as you perform this portion of the movement.",
      "After a second pause at the top, begin to lower the dumbbells to the original position by rotating the palms of your hands towards you. Tip: The left arm will be rotated in a counter clockwise manner while the right one will be rotated clockwise. Breathe in as you perform this portion of the movement.",
      "Repeat for the recommended amount of repetitions."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Arnold_Dumbbell_Press%2F0.jpg"
  },
  {
    "id": "Back_Flyes_-_With_Bands",
    "name": "Back Flyes - With Bands",
    "category": "Shoulders",
    "primaryMuscle": "shoulders",
    "secondaryMuscles": [
      "middle back",
      "triceps"
    ],
    "equipment": "bands",
    "difficulty": "Beginner",
    "instructions": [
      "Run a band around a stationary post like that of a squat rack.",
      "Grab the band by the handles and stand back so that the tension in the band rises.",
      "Extend and lift the arms straight in front of you. Tip: Your arms should be straight and parallel to the floor while perpendicular to your torso. Your feet should be firmly planted on the floor spread at shoulder width. This will be your starting position.",
      "As you exhale, move your arms to the sides and back. Keep your arms extended and parallel to the floor. Continue the movement until the arms are extended to your sides.",
      "After a pause, go back to the original position as you inhale.",
      "Repeat for the recommended amount of repetitions."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Back_Flyes_-_With_Bands%2F0.jpg"
  },
  {
    "id": "Backward_Medicine_Ball_Throw",
    "name": "Backward Medicine Ball Throw",
    "category": "Shoulders",
    "primaryMuscle": "shoulders",
    "secondaryMuscles": [],
    "equipment": "medicine ball",
    "difficulty": "Beginner",
    "instructions": [
      "This exercise is best done with a partner. If you lack a partner, the ball can be thrown and retrieved or thrown against a wall.",
      "Begin standing a few meters in front of your partner, both facing the same direction. Begin holding the ball between your legs.",
      "Squat down and then forcefully reverse direction, coming to full extension and you toss the ball over your head to your partner.",
      "Your partner can then roll the ball back to you. Repeat for the desired number of repetitions."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Backward_Medicine_Ball_Throw%2F0.jpg"
  },
  {
    "id": "Band_Pull_Apart",
    "name": "Band Pull Apart",
    "category": "Shoulders",
    "primaryMuscle": "shoulders",
    "secondaryMuscles": [
      "middle back",
      "traps"
    ],
    "equipment": "bands",
    "difficulty": "Beginner",
    "instructions": [
      "Begin with your arms extended straight out in front of you, holding the band with both hands.",
      "Initiate the movement by performing a reverse fly motion, moving your hands out laterally to your sides.",
      "Keep your elbows extended as you perform the movement, bringing the band to your chest. Ensure that you keep your shoulders back during the exercise.",
      "Pause as you complete the movement, returning to the starting position under control."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Pull_Apart%2F0.jpg"
  },
  {
    "id": "Barbell_Incline_Shoulder_Raise",
    "name": "Barbell Incline Shoulder Raise",
    "category": "Shoulders",
    "primaryMuscle": "shoulders",
    "secondaryMuscles": [
      "chest"
    ],
    "equipment": "barbell",
    "difficulty": "Beginner",
    "instructions": [
      "Lie back on an Incline Bench. Using a medium width grip (a grip that is slightly wider than shoulder width), lift the bar from the rack and hold it straight over you with your arms straight. This will be your starting position.",
      "While keeping the arms straight, lift the bar by protracting your shoulder blades, raising the shoulders from the bench as you breathe out.",
      "Bring back the bar to the starting position as you breathe in.",
      "Repeat for the recommended amount of repetitions."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Incline_Shoulder_Raise%2F0.jpg"
  },
  {
    "id": "Alternate_Hammer_Curl",
    "name": "Alternate Hammer Curl",
    "category": "Arms",
    "primaryMuscle": "biceps",
    "secondaryMuscles": [
      "forearms"
    ],
    "equipment": "dumbbell",
    "difficulty": "Beginner",
    "instructions": [
      "Stand up with your torso upright and a dumbbell in each hand being held at arms length. The elbows should be close to the torso.",
      "The palms of the hands should be facing your torso. This will be your starting position.",
      "While holding the upper arm stationary, curl the right weight forward while contracting the biceps as you breathe out. Continue the movement until your biceps is fully contracted and the dumbbells are at shoulder level. Hold the contracted position for a second as you squeeze the biceps. Tip: Only the forearms should move.",
      "Slowly begin to bring the dumbbells back to starting position as your breathe in.",
      "Repeat the movement with the left hand. This equals one repetition.",
      "Continue alternating in this manner for the recommended amount of repetitions."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternate_Hammer_Curl%2F0.jpg"
  },
  {
    "id": "Alternate_Incline_Dumbbell_Curl",
    "name": "Alternate Incline Dumbbell Curl",
    "category": "Arms",
    "primaryMuscle": "biceps",
    "secondaryMuscles": [
      "forearms"
    ],
    "equipment": "dumbbell",
    "difficulty": "Beginner",
    "instructions": [
      "Sit down on an incline bench with a dumbbell in each hand being held at arms length. Tip: Keep the elbows close to the torso.This will be your starting position.",
      "While holding the upper arm stationary, curl the right weight forward while contracting the biceps as you breathe out. As you do so, rotate the hand so that the palm is facing up. Continue the movement until your biceps is fully contracted and the dumbbells are at shoulder level. Hold the contracted position for a second as you squeeze the biceps. Tip: Only the forearms should move.",
      "Slowly begin to bring the dumbbell back to starting position as your breathe in.",
      "Repeat the movement with the left hand. This equals one repetition.",
      "Continue alternating in this manner for the recommended amount of repetitions."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternate_Incline_Dumbbell_Curl%2F0.jpg"
  },
  {
    "id": "Band_Skull_Crusher",
    "name": "Band Skull Crusher",
    "category": "Arms",
    "primaryMuscle": "triceps",
    "secondaryMuscles": [],
    "equipment": "bands",
    "difficulty": "Beginner",
    "instructions": [
      "Secure a band to the base of a rack or the bench. Lay on the bench so that the band is lined up with your head.",
      "Take hold of the band, raising your elbows so that the upper arm is perpendicular to the floor. With the elbow flexed, the band should be above your head. This will be your starting position.",
      "Extend through the elbow to straighten your arm, keeping your upper arm in place. Pause at the top of the motion, and return to the starting position."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Skull_Crusher%2F0.jpg"
  },
  {
    "id": "Barbell_Curl",
    "name": "Barbell Curl",
    "category": "Arms",
    "primaryMuscle": "biceps",
    "secondaryMuscles": [
      "forearms"
    ],
    "equipment": "barbell",
    "difficulty": "Beginner",
    "instructions": [
      "Stand up with your torso upright while holding a barbell at a shoulder-width grip. The palm of your hands should be facing forward and the elbows should be close to the torso. This will be your starting position.",
      "While holding the upper arms stationary, curl the weights forward while contracting the biceps as you breathe out. Tip: Only the forearms should move.",
      "Continue the movement until your biceps are fully contracted and the bar is at shoulder level. Hold the contracted position for a second and squeeze the biceps hard.",
      "Slowly begin to bring the bar back to starting position as your breathe in.",
      "Repeat for the recommended amount of repetitions."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Curl%2F0.jpg"
  },
  {
    "id": "Barbell_Curls_Lying_Against_An_Incline",
    "name": "Barbell Curls Lying Against An Incline",
    "category": "Arms",
    "primaryMuscle": "biceps",
    "secondaryMuscles": [],
    "equipment": "barbell",
    "difficulty": "Beginner",
    "instructions": [
      "Lie against an incline bench, with your arms holding a barbell and hanging down in a horizontal line. This will be your starting position.",
      "While keeping the upper arms stationary, curl the weight up as high as you can while squeezing the biceps. Breathe out as you perform this portion of the movement. Tip: Only the forearms should move. Do not swing the arms.",
      "After a second contraction, slowly go back to the starting position as you inhale. Tip: Make sure that you go all of the way down.",
      "Repeat for the recommended amount of repetitions."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Curls_Lying_Against_An_Incline%2F0.jpg"
  },
  {
    "id": "Bench_Dips",
    "name": "Bench Dips",
    "category": "Arms",
    "primaryMuscle": "triceps",
    "secondaryMuscles": [
      "chest",
      "shoulders"
    ],
    "equipment": "body only",
    "difficulty": "Beginner",
    "instructions": [
      "For this exercise you will need to place a bench behind your back. With the bench perpendicular to your body, and while looking away from it, hold on to the bench on its edge with the hands fully extended, separated at shoulder width. The legs will be extended forward, bent at the waist and perpendicular to your torso. This will be your starting position.",
      "Slowly lower your body as you inhale by bending at the elbows until you lower yourself far enough to where there is an angle slightly smaller than 90 degrees between the upper arm and the forearm. Tip: Keep the elbows as close as possible throughout the movement. Forearms should always be pointing down.",
      "Using your triceps to bring your torso up again, lift yourself back to the starting position.",
      "Repeat for the recommended amount of repetitions."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Dips%2F0.jpg"
  },
  {
    "id": "Bench_Press_-_Powerlifting",
    "name": "Bench Press - Powerlifting",
    "category": "Arms",
    "primaryMuscle": "triceps",
    "secondaryMuscles": [
      "chest",
      "forearms",
      "lats",
      "shoulders"
    ],
    "equipment": "barbell",
    "difficulty": "Intermediate",
    "instructions": [
      "Begin by lying on the bench, getting your head beyond the bar if possible. Tuck your feet underneath you and arch your back. Using the bar to help support your weight, lift your shoulder off the bench and retract them, squeezing the shoulder blades together. Use your feet to drive your traps into the bench. Maintain this tight body position throughout the movement.",
      "However wide your grip, it should cover the ring on the bar. Pull the bar out of the rack without protracting your shoulders. Focus on squeezing the bar and trying to pull it apart.",
      "Lower the bar to your lower chest or upper stomach. The bar, wrist, and elbow should stay in line at all times.",
      "Pause when the barbell touches your torso, and then drive the bar up with as much force as possible. The elbows should be tucked in until lockout."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Press_-_Powerlifting%2F0.jpg"
  },
  {
    "id": "Bench_Press_with_Chains",
    "name": "Bench Press with Chains",
    "category": "Arms",
    "primaryMuscle": "triceps",
    "secondaryMuscles": [
      "chest",
      "lats",
      "shoulders"
    ],
    "equipment": "barbell",
    "difficulty": "Advanced",
    "instructions": [
      "Adjust the leader chain, shortening it to the desired length.Place the chains on the sleeves of the bar.",
      "Lying on the bench, get your head beyond the bar if possible. Tuck your feet underneath you and arch your back. Using the bar to help support your weight, lift your shoulder off the bench and retract them, squeezing the shoulder blades together. Use your feet to drive your traps into the bench. Maintain this tight body position throughout the movement. However wide your grip, it should cover the ring on the bar.",
      "Pull the bar out of the rack without protracting your shoulders. Focus on squeezing the bar and trying to pull it apart. Lower the bar to your lower chest or upper stomach. The bar, wrist, and elbow should stay in line at all times.",
      "Pause when the barbell touches your torso, and then drive the bar up with as much force as possible. The elbows should be tucked in until lockout."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Press_with_Chains%2F0.jpg"
  },
  {
    "id": "Board_Press",
    "name": "Board Press",
    "category": "Arms",
    "primaryMuscle": "triceps",
    "secondaryMuscles": [
      "chest",
      "forearms",
      "lats",
      "shoulders"
    ],
    "equipment": "barbell",
    "difficulty": "Intermediate",
    "instructions": [
      "Begin by lying on the bench, getting your head beyond the bar if possible. One to five boards, made out of 2x6's, can be screwed together and held in place by a training partner, bands, or just tucked under your shirt.",
      "Tuck your feet underneath you and arch your back. Using the bar to help support your weight, lift your shoulder off the bench and retract them, squeezing the shoulder blades together. Use your feet to drive your traps into the bench. Maintain this tight body position throughout the movement.",
      "You can take a standard bench grip, or shoulder width to focus on the triceps. Pull the bar out of the rack without protracting your shoulders. The bar, wrist, and elbow should stay in line at all times. Focus on squeezing the bar and trying to pull it apart.",
      "Lower the bar to the boards, and then drive the bar up with as much force as possible. The elbows should be tucked in until lockout."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Board_Press%2F0.jpg"
  },
  {
    "id": "Body-Up",
    "name": "Body-Up",
    "category": "Arms",
    "primaryMuscle": "triceps",
    "secondaryMuscles": [
      "abdominals",
      "forearms"
    ],
    "equipment": "body only",
    "difficulty": "Intermediate",
    "instructions": [
      "Assume a plank position on the ground. You should be supporting your bodyweight on your toes and forearms, keeping your torso straight. Your forearms should be shoulder-width apart. This will be your starting position.",
      "Pressing your palms firmly into the ground, extend through the elbows to raise your body from the ground. Keep your torso rigid as you perform the movement.",
      "Slowly lower your forearms back to the ground by allowing the elbows to flex.",
      "Repeat."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Body-Up%2F0.jpg"
  },
  {
    "id": "3_4_Sit-Up",
    "name": "3/4 Sit-Up",
    "category": "Core",
    "primaryMuscle": "abdominals",
    "secondaryMuscles": [],
    "equipment": "body only",
    "difficulty": "Beginner",
    "instructions": [
      "Lie down on the floor and secure your feet. Your legs should be bent at the knees.",
      "Place your hands behind or to the side of your head. You will begin with your back on the ground. This will be your starting position.",
      "Flex your hips and spine to raise your torso toward your knees.",
      "At the top of the contraction your torso should be perpendicular to the ground. Reverse the motion, going only ¾ of the way down.",
      "Repeat for the recommended amount of repetitions."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/3_4_Sit-Up%2F0.jpg"
  },
  {
    "id": "Ab_Crunch_Machine",
    "name": "Ab Crunch Machine",
    "category": "Core",
    "primaryMuscle": "abdominals",
    "secondaryMuscles": [],
    "equipment": "machine",
    "difficulty": "Intermediate",
    "instructions": [
      "Select a light resistance and sit down on the ab machine placing your feet under the pads provided and grabbing the top handles. Your arms should be bent at a 90 degree angle as you rest the triceps on the pads provided. This will be your starting position.",
      "At the same time, begin to lift the legs up as you crunch your upper torso. Breathe out as you perform this movement. Tip: Be sure to use a slow and controlled motion. Concentrate on using your abs to move the weight while relaxing your legs and feet.",
      "After a second pause, slowly return to the starting position as you breathe in.",
      "Repeat the movement for the prescribed amount of repetitions."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Ab_Crunch_Machine%2F0.jpg"
  },
  {
    "id": "Ab_Roller",
    "name": "Ab Roller",
    "category": "Core",
    "primaryMuscle": "abdominals",
    "secondaryMuscles": [
      "shoulders"
    ],
    "equipment": "other",
    "difficulty": "Intermediate",
    "instructions": [
      "Hold the Ab Roller with both hands and kneel on the floor.",
      "Now place the ab roller on the floor in front of you so that you are on all your hands and knees (as in a kneeling push up position). This will be your starting position.",
      "Slowly roll the ab roller straight forward, stretching your body into a straight position. Tip: Go down as far as you can without touching the floor with your body. Breathe in during this portion of the movement.",
      "After a pause at the stretched position, start pulling yourself back to the starting position as you breathe out. Tip: Go slowly and keep your abs tight at all times."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Ab_Roller%2F0.jpg"
  },
  {
    "id": "Advanced_Kettlebell_Windmill",
    "name": "Advanced Kettlebell Windmill",
    "category": "Core",
    "primaryMuscle": "abdominals",
    "secondaryMuscles": [
      "glutes",
      "hamstrings",
      "shoulders"
    ],
    "equipment": "kettlebells",
    "difficulty": "Intermediate",
    "instructions": [
      "Clean and press a kettlebell overhead with one arm.",
      "Keeping the kettlebell locked out at all times, push your butt out in the direction of the locked out kettlebell. Keep the non-working arm behind your back and turn your feet out at a forty-five degree angle from the arm with the kettlebell.",
      "Lower yourself as far as possible.",
      "Pause for a second and reverse the motion back to the starting position."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Advanced_Kettlebell_Windmill%2F0.jpg"
  },
  {
    "id": "Air_Bike",
    "name": "Air Bike",
    "category": "Core",
    "primaryMuscle": "abdominals",
    "secondaryMuscles": [],
    "equipment": "body only",
    "difficulty": "Beginner",
    "instructions": [
      "Lie flat on the floor with your lower back pressed to the ground. For this exercise, you will need to put your hands beside your head. Be careful however to not strain with the neck as you perform it. Now lift your shoulders into the crunch position.",
      "Bring knees up to where they are perpendicular to the floor, with your lower legs parallel to the floor. This will be your starting position.",
      "Now simultaneously, slowly go through a cycle pedal motion kicking forward with the right leg and bringing in the knee of the left leg. Bring your right elbow close to your left knee by crunching to the side, as you breathe out.",
      "Go back to the initial position as you breathe in.",
      "Crunch to the opposite side as you cycle your legs and bring closer your left elbow to your right knee and exhale.",
      "Continue alternating in this manner until all of the recommended repetitions for each side have been completed."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Air_Bike%2F0.jpg"
  },
  {
    "id": "Alternate_Heel_Touchers",
    "name": "Alternate Heel Touchers",
    "category": "Core",
    "primaryMuscle": "abdominals",
    "secondaryMuscles": [],
    "equipment": "body only",
    "difficulty": "Beginner",
    "instructions": [
      "Lie on the floor with the knees bent and the feet on the floor around 18-24 inches apart. Your arms should be extended by your side. This will be your starting position.",
      "Crunch over your torso forward and up about 3-4 inches to the right side and touch your right heel as you hold the contraction for a second. Exhale while performing this movement.",
      "Now go back slowly to the starting position as you inhale.",
      "Now crunch over your torso forward and up around 3-4 inches to the left side and touch your left heel as you hold the contraction for a second. Exhale while performing this movement and then go back to the starting position as you inhale. Now that both heels have been touched, that is considered 1 repetition.",
      "Continue alternating sides in this manner until all prescribed repetitions are done."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternate_Heel_Touchers%2F0.jpg"
  },
  {
    "id": "Barbell_Ab_Rollout",
    "name": "Barbell Ab Rollout",
    "category": "Core",
    "primaryMuscle": "abdominals",
    "secondaryMuscles": [
      "lower back",
      "shoulders"
    ],
    "equipment": "barbell",
    "difficulty": "Intermediate",
    "instructions": [
      "For this exercise you will need to get into a pushup position, but instead of having your hands of the floor, you will be grabbing on to an Olympic barbell (loaded with 5-10 lbs on each side) instead. This will be your starting position.",
      "While keeping a slight arch on your back, lift your hips and roll the barbell towards your feet as you exhale. Tip: As you perform the movement, your glutes should be coming up, you should be keeping the abs tight and should maintain your back posture at all times. Also your arms should be staying perpendicular to the floor throughout the movement. If you don't, you will work out your shoulders and back more than the abs.",
      "After a second contraction at the top, start to roll the barbell back forward to the starting position slowly as you inhale.",
      "Repeat for the recommended amount of repetitions."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Ab_Rollout%2F0.jpg"
  },
  {
    "id": "Barbell_Ab_Rollout_-_On_Knees",
    "name": "Barbell Ab Rollout - On Knees",
    "category": "Core",
    "primaryMuscle": "abdominals",
    "secondaryMuscles": [
      "lower back",
      "shoulders"
    ],
    "equipment": "barbell",
    "difficulty": "Advanced",
    "instructions": [
      "Hold an Olympic barbell loaded with 5-10lbs on each side and kneel on the floor.",
      "Now place the barbell on the floor in front of you so that you are on all your hands and knees (as in a kneeling push up position). This will be your starting position.",
      "Slowly roll the barbell straight forward, stretching your body into a straight position. Tip: Go down as far as you can without touching the floor with your body. Breathe in during this portion of the movement.",
      "After a second pause at the stretched position, start pulling yourself back to the starting position as you breathe out. Tip: Go slowly and keep your abs tight at all times."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Ab_Rollout_-_On_Knees%2F0.jpg"
  },
  {
    "id": "Barbell_Rollout_from_Bench",
    "name": "Barbell Rollout from Bench",
    "category": "Core",
    "primaryMuscle": "abdominals",
    "secondaryMuscles": [
      "glutes",
      "hamstrings",
      "lats",
      "shoulders"
    ],
    "equipment": "barbell",
    "difficulty": "Intermediate",
    "instructions": [
      "Place a loaded barbell on the ground, near the end of a bench. Kneel with both legs on the bench, and take a medium to narrow grip on the barbell. This will be your starting position.",
      "To begin, extend through the hips to slowly roll the bar forward. As you roll out, flex the shoulder to roll the bar above your head. Ensure that your arms remain extended throughout the movement.",
      "When the bar has been moved as far forward as possible, return to the starting position."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Rollout_from_Bench%2F0.jpg"
  },
  {
    "id": "Barbell_Side_Bend",
    "name": "Barbell Side Bend",
    "category": "Core",
    "primaryMuscle": "abdominals",
    "secondaryMuscles": [
      "lower back"
    ],
    "equipment": "barbell",
    "difficulty": "Beginner",
    "instructions": [
      "Stand up straight while holding a barbell placed on the back of your shoulders (slightly below the neck). Your feet should be shoulder width apart. This will be your starting position.",
      "While keeping your back straight and your head up, bend only at the waist to the right as far as possible. Breathe in as you bend to the side. Then hold for a second and come back up to the starting position as you exhale. Tip: Keep the rest of the body stationary.",
      "Now repeat the movement but bending to the left instead. Hold for a second and come back to the starting position.",
      "Repeat for the recommended amount of repetitions."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Side_Bend%2F0.jpg"
  },
  {
    "id": "Atlas_Stone_Trainer",
    "name": "Atlas Stone Trainer",
    "category": "Full Body",
    "primaryMuscle": "lower back",
    "secondaryMuscles": [
      "biceps",
      "forearms",
      "glutes",
      "hamstrings",
      "quadriceps"
    ],
    "equipment": "other",
    "difficulty": "Intermediate",
    "instructions": [
      "This trainer is effective for developing Atlas Stone strength for those who don't have access to stones, and are typically made from bar ends or heavy pipe.",
      "Begin by loading the desired weight onto the bar. Straddle the weight, wrapping your arms around the implement, bending at the hips.",
      "Begin by pulling the weight up past the knees, extending through the hips. As the weight clears the knees, it can be lapped by resting it on your thighs and sitting back, hugging it tightly to your chest.",
      "Finish the movement by extending through your hips and knees to raise the weight as high as possible. The weight can be returned to the lap or to the ground for successive repetitions."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Atlas_Stone_Trainer%2F0.jpg"
  },
  {
    "id": "Atlas_Stones",
    "name": "Atlas Stones",
    "category": "Full Body",
    "primaryMuscle": "lower back",
    "secondaryMuscles": [
      "abdominals",
      "adductors",
      "biceps",
      "calves",
      "forearms",
      "glutes",
      "hamstrings",
      "middle back",
      "quadriceps",
      "traps"
    ],
    "equipment": "other",
    "difficulty": "Advanced",
    "instructions": [
      "Begin with the atlas stone between your feet. Bend at the hips to wrap your arms vertically around the Atlas Stone, attempting to get your fingers underneath the stone. Many stones will have a small flat portion on the bottom, which will make the stone easier to hold.",
      "Pulling the stone into your torso, drive through the back half of your feet to pull the stone from the ground.",
      "As the stone passes the knees, lap it by sitting backward, pulling the stone on top of your thighs.",
      "Sit low, getting the stone high onto your chest as you change your grip to reach over the stone. Stand, driving through with your hips. Close distance to the loading platform, and lean back, extending the hips to get the stone as high as possible."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Atlas_Stones%2F0.jpg"
  },
  {
    "id": "Axle_Deadlift",
    "name": "Axle Deadlift",
    "category": "Full Body",
    "primaryMuscle": "lower back",
    "secondaryMuscles": [
      "forearms",
      "glutes",
      "hamstrings",
      "middle back",
      "quadriceps",
      "traps"
    ],
    "equipment": "other",
    "difficulty": "Intermediate",
    "instructions": [
      "Approach the bar so that it is centered over your feet. You feet should be about hip width apart. Bend at the hip to grip the bar at shoulder width, allowing your shoulder blades to protract. Typically, you would use an over/under grip.",
      "With your feet and your grip set, take a big breath and then lower your hips and flex the knees until your shins contact the bar. Look forward with your head, keep your chest up and your back arched, and begin driving through the heels to move the weight upward.",
      "After the bar passes the knees, aggressively pull the bar back, pulling your shoulder blades together as you drive your hips forward into the bar.",
      "Lower the bar by bending at the hips and guiding it to the floor."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Axle_Deadlift%2F0.jpg"
  },
  {
    "id": "Backward_Drag",
    "name": "Backward Drag",
    "category": "Full Body",
    "primaryMuscle": "quadriceps",
    "secondaryMuscles": [
      "calves",
      "forearms",
      "glutes",
      "hamstrings",
      "lower back"
    ],
    "equipment": "other",
    "difficulty": "Beginner",
    "instructions": [
      "Load a sled with the desired weight, attaching a rope or straps to the sled that you can hold onto.",
      "Begin the exercise by moving backwards for a given distance. Leaning back, extend through the legs for short steps to move as quickly as possible."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Backward_Drag%2F0.jpg"
  },
  {
    "id": "Car_Deadlift",
    "name": "Car Deadlift",
    "category": "Full Body",
    "primaryMuscle": "quadriceps",
    "secondaryMuscles": [
      "forearms",
      "glutes",
      "hamstrings",
      "lower back",
      "traps"
    ],
    "equipment": "other",
    "difficulty": "Intermediate",
    "instructions": [
      "This event apparatus typically has neutral grip handles, however some have a straight bar that you can approach like a normal deadlift. The apparatus can be loaded with a vehicle or other heavy objects such as tractor tires or kegs.",
      "Center yourself between the handles if you are a strong squatter, or back a couple inches if you are a strong deadlifter. You feet should be about hip width apart. Bend at the hip to grip the handles. With your feet and your grip set, take a big breath and then lower your hips and flex the knees.",
      "Look forward with your head, keep your chest up and your back arched, and begin driving through the heels to move the weight upward. As the weight comes up, pull your shoulder blades together as you drive your hips forward.",
      "Lower the weight by bending at the hips and guiding it to the floor."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Car_Deadlift%2F0.jpg"
  },
  {
    "id": "Clean",
    "name": "Clean",
    "category": "Full Body",
    "primaryMuscle": "hamstrings",
    "secondaryMuscles": [
      "calves",
      "forearms",
      "glutes",
      "lower back",
      "quadriceps",
      "shoulders",
      "traps"
    ],
    "equipment": "barbell",
    "difficulty": "Intermediate",
    "instructions": [
      "With a barbell on the floor close to the shins, take an overhand (or hook) grip just outside the legs. Lower your hips with the weight focused on the heels, back straight, head facing forward, chest up, with your shoulders just in front of the bar. This will be your starting position.",
      "",
      "Begin the first pull by driving through the heels, extending your knees. Your back angle should stay the same, and your arms should remain straight. Move the weight with control as you continue to above the knees.",
      "Next comes the second pull, the main source of acceleration for the clean. As the bar approaches the mid-thigh position, begin extending through the hips. In a jumping motion, accelerate by extending the hips, knees, and ankles, using speed to move the bar upward. There should be no need to actively pull through the arms to accelerate the weight; at the end of the second pull, the body should be fully extended, leaning slightly back, with the arms still extended.",
      "As full extension is achieved, transition into the third pull by aggressively shrugging and flexing the arms with the elbows up and out. At peak extension, aggressively pull yourself down, rotating your elbows under the bar as you do so. Receive the bar in a front squat position, the depth of which is dependent upon the height of the bar at the end of the third pull. The bar should be racked onto the protracted shoulders, lightly touching the throat with the hands relaxed. Continue to descend to the bottom squat position, which will help in the recovery.",
      "Immediately recover by driving through the heels, keeping the torso upright and elbows up. Continue until you have risen to a standing position."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Clean%2F0.jpg"
  },
  {
    "id": "Clean_Deadlift",
    "name": "Clean Deadlift",
    "category": "Full Body",
    "primaryMuscle": "hamstrings",
    "secondaryMuscles": [
      "forearms",
      "glutes",
      "lower back",
      "middle back",
      "quadriceps",
      "traps"
    ],
    "equipment": "barbell",
    "difficulty": "Beginner",
    "instructions": [
      "Begin standing with a barbell close to your shins. Your feet should be directly under your hips with your feet turned out slightly. Grip the bar with a double overhand grip or hook grip, about shoulder width apart. Squat down to the bar. Your spine should be in full extension, with a back angle that places your shoulders in front of the bar and your back as vertical as possible.",
      "Begin by driving through the floor through the front of your heels. As the bar travels upward, maintain a constant back angle. Flare your knees out to the side to help keep them out of the bar's path.",
      "After the bar crosses the knees, complete the lift by driving the hips into the bar until your hips and knees are extended."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Clean_Deadlift%2F0.jpg"
  },
  {
    "id": "Clean_Pull",
    "name": "Clean Pull",
    "category": "Full Body",
    "primaryMuscle": "quadriceps",
    "secondaryMuscles": [
      "forearms",
      "glutes",
      "hamstrings",
      "lower back",
      "traps"
    ],
    "equipment": "barbell",
    "difficulty": "Intermediate",
    "instructions": [
      "With a barbell on the floor close to the shins, take an overhand or hook grip just outside the legs. Lower your hips with the weight focused on the heels, back straight, head facing forward, chest up, with your shoulders just in front of the bar. This will be your starting position.",
      "Begin the first pull by driving through the heels, extending your knees. Your back angle should stay the same, and your arms should remain straight and elbows out. Move the weight with control as you continue to above the knees.",
      "Next comes the second pull, the main source of acceleration for the clean. As the bar approaches the mid-thigh position, begin extending through the hips. In a jumping motion, accelerate by extending the hips, knees, and ankles, using speed to move the bar upward. There should be no need to actively pull through the arms to accelerate the weight; at the end of the second pull, the body should be fully extended, leaning slightly back, with the arms still extended. Full extension should be violent and abrupt, and ensure that you do not prolong the extension for longer than necessary."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Clean_Pull%2F0.jpg"
  },
  {
    "id": "Clean_Shrug",
    "name": "Clean Shrug",
    "category": "Full Body",
    "primaryMuscle": "traps",
    "secondaryMuscles": [
      "forearms",
      "shoulders"
    ],
    "equipment": "barbell",
    "difficulty": "Beginner",
    "instructions": [
      "Begin with a shoulder width, double overhand or hook grip, with the bar hanging at the mid thigh position. Your back should be straight and inclined slightly forward.",
      "Shrug your shoulders towards your ears. While this exercise can usually by loaded with heavier weight than a clean, avoid overloading to the point that the execution slows down."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Clean_Shrug%2F0.jpg"
  },
  {
    "id": "Clean_from_Blocks",
    "name": "Clean from Blocks",
    "category": "Full Body",
    "primaryMuscle": "quadriceps",
    "secondaryMuscles": [
      "calves",
      "glutes",
      "hamstrings",
      "shoulders",
      "traps"
    ],
    "equipment": "barbell",
    "difficulty": "Intermediate",
    "instructions": [
      "With a barbell on boxes or stands of the desired height, take an overhand or hook grip just outside the legs. Lower your hips with the weight focused on the heels, back straight, head facing forward, chest up, with your shoulders just in front of the bar. This will be your starting position.",
      "Begin the first pull by driving through the heels, extending your knees. Your back angle should stay the same, and your arms should remain straight with the elbows pointed out.",
      "As full extension is achieved, transition into the receiving position by aggressively shrugging and flexing the arms with the elbows up and out. Aggressively pull yourself down, rotating your elbows under the bar as you do so. Receive the bar in a front squat position, the depth of which is dependent upon the height of the bar at the end of the third pull. The bar should be racked onto the protracted shoulders, lightly touching the throat with the hands relaxed. Continue to descend to the bottom squat position, which will help in the recovery.",
      "Immediately recover by driving through the heels, keeping the torso upright and elbows up. Continue until you have risen to a standing position. Return the weight to the boxes for the next rep."
    ],
    "tips": [],
    "imageUrl": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Clean_from_Blocks%2F0.jpg"
  }
];
