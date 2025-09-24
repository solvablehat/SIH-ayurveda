export const doshaAssessmentQuestions = [
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
    text: "How is your appetite and digestion?",
    category: "digestion",
    options: [
      { 
        value: "vata", 
        text: "Irregular appetite, gas and bloating",
        description: "Sometimes very hungry, sometimes no appetite"
      },
      { 
        value: "pitta", 
        text: "Strong appetite, good digestion",
        description: "Get irritable when hungry, can eat large quantities"
      },
      { 
        value: "kapha", 
        text: "Steady appetite, slow digestion",
        description: "Can skip meals easily, feel heavy after eating"
      }
    ]
  },
  {
    id: 3,
    text: "What is your sleep pattern like?",
    category: "sleep",
    options: [
      { 
        value: "vata", 
        text: "Light sleeper, difficulty falling asleep",
        description: "5-7 hours sleep, wake up frequently during night"
      },
      { 
        value: "pitta", 
        text: "Moderate sleeper, fall asleep easily",
        description: "6-8 hours sleep, occasional vivid dreams"
      },
      { 
        value: "kapha", 
        text: "Deep sleeper, need 8+ hours",
        description: "Heavy sleep, difficulty waking up in morning"
      }
    ]
  },
  {
    id: 4,
    text: "How do you handle stress and emotions?",
    category: "mental",
    options: [
      { 
        value: "vata", 
        text: "Get anxious and worried quickly",
        description: "Mind races, difficulty concentrating under stress"
      },
      { 
        value: "pitta", 
        text: "Become angry or irritated",
        description: "Critical thinking, can be judgmental when stressed"
      },
      { 
        value: "kapha", 
        text: "Remain calm and steady",
        description: "Withdraw or become lethargic when overwhelmed"
      }
    ]
  },
  {
    id: 5,
    text: "What is your energy level throughout the day?",
    category: "energy",
    options: [
      { 
        value: "vata", 
        text: "High bursts followed by fatigue",
        description: "Very active in spurts, then need to rest"
      },
      { 
        value: "pitta", 
        text: "Consistent, moderate to high energy",
        description: "Steady energy, peak performance in afternoon"
      },
      { 
        value: "kapha", 
        text: "Steady, slow to start but good endurance",
        description: "Lower energy mornings, steady throughout day"
      }
    ]
  },
  {
    id: 6,
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
