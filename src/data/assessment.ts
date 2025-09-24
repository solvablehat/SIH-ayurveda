export const doshaAssessmentQuestions = [
  // --- Physical Characteristics ---
  {
    id: 1,
    text: "How would you describe your physical build?",
    category: "physical",
    options: [
      { 
        value: "vata", 
        text: "Thin, light frame with prominent joints",
        description: "Small bones, low body weight, difficulty gaining weight"
      },
      { 
        value: "pitta", 
        text: "Medium, well-proportioned build",
        description: "Moderate bone structure, medium muscle development"
      },
      { 
        value: "kapha", 
        text: "Large, heavy frame with good muscle development",
        description: "Large bones, tendency to gain weight easily"
      }
    ]
  },
  {
    id: 2,
    text: "How is your skin and hair?",
    category: "physical",
    options: [
      { 
        value: "vata", 
        text: "Dry skin, thin hair",
        description: "Rough, dry skin that cracks easily, coarse hair"
      },
      { 
        value: "pitta", 
        text: "Warm, oily skin, fine hair",
        description: "Sensitive skin, tendency to redness, early graying"
      },
      { 
        value: "kapha", 
        text: "Smooth, oily skin, thick hair",
        description: "Soft, moist skin, lustrous thick hair"
      }
    ]
  },
  {
    id: 3,
    text: "How do you typically react to weather?",
    category: "physical",
    options: [
      { 
        value: "vata", 
        text: "I dislike cold and wind intensely",
        description: "I prefer warm, humid climates and layer up in the cold"
      },
      { 
        value: "pitta", 
        text: "I can't stand extreme heat or sun",
        description: "I prefer cooler environments and can get overheated easily"
      },
      { 
        value: "kapha", 
        text: "I dislike cold, damp, and cloudy weather",
        description: "I feel sluggish in damp weather and energized by warmth"
      }
    ]
  },
  {
    id: 4,
    text: "How would you describe your eyes?",
    category: "physical",
    options: [
      {
        value: "vata",
        text: "Small, active, and somewhat dry",
        description: "Tendency for dark circles, quick eye movements"
      },
      {
        value: "pitta",
        text: "Sharp, piercing, and medium-sized",
        description: "Penetrating gaze, can be sensitive to light, may have reddish whites"
      },
      {
        value: "kapha",
        text: "Large, calm, and well-lubricated",
        description: "Thick eyelashes, a loving or gentle gaze, whites are very white"
      }
    ]
  },
    {
    id: 5,
    text: "What is your typical sweating pattern?",
    category: "physical",
    options: [
      {
        value: "vata",
        text: "Minimal sweat, even during exercise",
        description: "I rarely sweat much, and it has little to no odor"
      },
      {
        value: "pitta",
        text: "I sweat easily and profusely, especially when hot",
        description: "My sweat can be hot and have a strong, sharp odor"
      },
      {
        value: "kapha",
        text: "Moderate sweat during exertion, but slow to start",
        description: "My sweat is cool and has a pleasant or mild odor"
      }
    ]
  },
  // --- Digestion & Appetite ---
  {
    id: 6,
    text: "How is your appetite and digestion?",
    category: "digestion",
    options: [
      { 
        value: "vata", 
        text: "Irregular appetite, gas and bloating",
        description: "Sometimes very hungry, sometimes I forget to eat"
      },
      { 
        value: "pitta", 
        text: "Strong appetite, good digestion",
        description: "I get irritable or 'hangry' if I miss a meal"
      },
      { 
        value: "kapha", 
        text: "Steady appetite, slow digestion",
        description: "I can skip meals easily and feel heavy after eating"
      }
    ]
  },
  {
    id: 7,
    text: "What are your typical bowel movements like?",
    category: "digestion",
    options: [
      {
        value: "vata",
        text: "Dry, hard, and infrequent; prone to constipation",
        description: "Tendency for small, irregular movements and gas"
      },
      {
        value: "pitta",
        text: "Frequent, soft, and sometimes loose",
        description: "Often more than once a day, may be urgent or have a burning sensation"
      },
      {
        value: "kapha",
        text: "Slow, regular, but can be heavy and thick",
        description: "Usually once a day, well-formed but may feel sluggish"
      }
    ]
  },
  // --- Mental & Emotional State ---
  {
    id: 8,
    text: "How do you handle stress and emotions?",
    category: "mental",
    options: [
      { 
        value: "vata", 
        text: "I get anxious and worried quickly",
        description: "My mind races, and I find it hard to concentrate under stress"
      },
      { 
        value: "pitta", 
        text: "I become angry, critical, or irritated",
        description: "I can be sharp-tongued or judgmental when stressed"
      },
      { 
        value: "kapha", 
        text: "I remain calm but may withdraw or shut down",
        description: "I become lethargic and unmotivated when overwhelmed"
      }
    ]
  },
  {
    id: 9,
    text: "What is your memory and learning style like?",
    category: "mental",
    options: [
      { 
        value: "vata", 
        text: "I learn very quickly, but also forget quickly",
        description: "Great short-term memory, but struggle with long-term recall"
      },
      { 
        value: "pitta", 
        text: "My mind is sharp and I learn systematically",
        description: "I have a focused, penetrating intellect and good memory"
      },
      { 
        value: "kapha", 
        text: "I learn slowly and methodically, but never forget",
        description: "Excellent long-term memory once a concept is understood"
      }
    ]
  },
  {
    id: 10,
    text: "How do you approach new situations or change?",
    category: "mental",
    options: [
      {
        value: "vata",
        text: "I get excited by newness but also become anxious easily",
        description: "I love spontaneity but can feel ungrounded by too much change"
      },
      {
        value: "pitta",
        text: "I take charge and create a plan to manage it",
        description: "I see change as a challenge to conquer and organize"
      },
      {
        value: "kapha",
        text: "I resist change and prefer stability and routine",
        description: "I am slow to adapt and value the comfort of the familiar"
      }
    ]
  },
  {
    id: 11,
    text: "What is your communication style?",
    category: "mental",
    options: [
      {
        value: "vata",
        text: "Fast, talkative, and enthusiastic, jumping between topics",
        description: "I love to chat, and my thoughts can sometimes be scattered"
      },
      {
        value: "pitta",
        text: "Precise, articulate, and direct; I get to the point",
        description: "My speech is focused and persuasive, but can be sharp or critical"
      },
      {
        value: "kapha",
        text: "Calm, thoughtful, and a good listener; I speak slowly",
        description: "I choose my words carefully and offer a comforting presence"
      }
    ]
  },
  // --- Energy & Sleep ---
  {
    id: 12,
    text: "What is your energy level throughout the day?",
    category: "energy",
    options: [
      { 
        value: "vata", 
        text: "High bursts followed by fatigue",
        description: "My energy comes in spurts; I'm not a marathon runner"
      },
      { 
        value: "pitta", 
        text: "Consistent, moderate to high energy",
        description: "I have strong, focused energy, especially in the afternoon"
      },
      { 
        value: "kapha", 
        text: "Steady, slow to start but good endurance",
        description: "Lower energy in the mornings, but steady throughout the day"
      }
    ]
  },
    {
    id: 13,
    text: "What is your general pace of activity (walking, performing tasks)?",
    category: "energy",
    options: [
      {
        value: "vata",
        text: "Quick and fast-paced, always on the move",
        description: "I tend to do everything quickly, sometimes in a rush"
      },
      {
        value: "pitta",
        text: "Purposeful and intense, with a clear goal in mind",
        description: "I move with determination and dislike wasting time or motion"
      },
      {
        value: "kapha",
        text: "Slow, steady, and methodical",
        description: "I prefer a relaxed, unhurried pace and enjoy the process"
      }
    ]
  },
  {
    id: 14,
    text: "What is your sleep pattern like?",
    category: "sleep",
    options: [
      { 
        value: "vata", 
        text: "Light sleeper, difficulty falling asleep",
        description: "I often have interrupted sleep and an active mind at night"
      },
      { 
        value: "pitta", 
        text: "Moderate sleeper, fall asleep easily",
        description: "I sleep soundly but can wake up feeling hot or with intense dreams"
      },
      { 
        value: "kapha", 
        text: "Deep, heavy sleeper, need 8+ hours",
        description: "I love to sleep and have a very hard time waking up"
      }
    ]
  },
  {
    id: 15,
    text: "What are your dreams usually like?",
    category: "sleep",
    options: [
      {
        value: "vata",
        text: "Active, anxious dreams; flying, running, or being chased",
        description: "My dreams are often vivid, imaginative, and sometimes fearful"
      },
      {
        value: "pitta",
        text: "Intense, problem-solving, or confrontational dreams",
        description: "I often dream about conflicts, arguments, fire, or achieving goals"
      },
      {
        value: "kapha",
        text: "Calm, romantic, or watery dreams; lakes, oceans, clouds",
        description: "My dreams are peaceful, serene, and often pleasant"
      }
    ]
  }
];

export const doshaDescriptions = {
  vata: {
    name: "Vata",
    element: "Air + Space",
    qualities: ["Light", "Dry", "Cold", "Rough", "Mobile"],
    characteristics: [
      "Quick thinking and action",
      "Creative and enthusiastic", 
      "Variable appetite and mood",
      "Light sleep, active mind"
    ],
    imbalanceSymptoms: [
      "Anxiety and worry",
      "Digestive issues", 
      "Insomnia",
      "Dry skin and constipation"
    ],
    balancingFoods: [
      "Warm, cooked foods",
      "Sweet, sour, salty tastes",
      "Ghee and oils",
      "Regular meal times"
    ]
  },
  pitta: {
    name: "Pitta", 
    element: "Fire + Water",
    qualities: ["Hot", "Sharp", "Light", "Oily", "Liquid"],
    characteristics: [
      "Strong digestion and appetite",
      "Sharp intellect and focus",
      "Natural leadership qualities", 
      "Moderate sleep needs"
    ],
    imbalanceSymptoms: [
      "Anger and irritability",
      "Acidity and heartburn",
      "Inflammation",
      "Skin rashes and sensitivity"
    ],
    balancingFoods: [
      "Cool, refreshing foods",
      "Sweet, bitter, astringent tastes", 
      "Fresh fruits and vegetables",
      "Avoid spicy and oily foods"
    ]
  },
  kapha: {
    name: "Kapha",
    element: "Earth + Water", 
    qualities: ["Heavy", "Cold", "Moist", "Oily", "Stable"],
    characteristics: [
      "Strong immunity and stamina",
      "Calm and steady nature",
      "Good long-term memory",
      "Deep, restful sleep"
    ],
    imbalanceSymptoms: [
      "Weight gain and sluggishness",
      "Depression and attachment",
      "Congestion and mucus",
      "Slow digestion"
    ],
    balancingFoods: [
      "Light, warm foods",
      "Pungent, bitter, astringent tastes",
      "Spices and herbs",
      "Avoid heavy, oily foods"
    ]
  }
};
