import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  User, 
  Utensils, 
  Sparkles, 
  Clock,
  ChefHat,
  Leaf
} from "lucide-react";
import { demoPatients } from "@/data/patients";
import { foodDatabase, ayurvedicPrinciples } from "@/data/foods";

// Patient Selector Component
function PatientSelector({ selectedPatient, onSelect }: { 
  selectedPatient: any; 
  onSelect: (patient: any) => void; 
}) {
  const [showPatients, setShowPatients] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Select Patient</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selectedPatient ? (
          <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
            <Avatar>
              <AvatarImage src={selectedPatient.photo} />
              <AvatarFallback>
                {selectedPatient.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium">{selectedPatient.name}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedPatient.age} years • Primary Dosha: {
                  selectedPatient.dosha.vata >= selectedPatient.dosha.pitta && 
                  selectedPatient.dosha.vata >= selectedPatient.dosha.kapha ? 'Vata' :
                  selectedPatient.dosha.pitta >= selectedPatient.dosha.kapha ? 'Pitta' : 'Kapha'
                }
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowPatients(!showPatients)}
            >
              Change
            </Button>
          </div>
        ) : (
          <Button 
            variant="outline" 
            onClick={() => setShowPatients(!showPatients)}
            className="w-full"
          >
            Choose Patient
          </Button>
        )}

        {showPatients && (
          <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
            {demoPatients.map(patient => (
              <div
                key={patient.id}
                className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50"
                onClick={() => {
                  onSelect(patient);
                  setShowPatients(false);
                }}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={patient.photo} />
                  <AvatarFallback>
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-xs text-muted-foreground">{patient.age} years</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Preferences Form Component
function PreferencesForm({ preferences, onChange }: { 
  preferences: any; 
  onChange: (prefs: any) => void; 
}) {
  const commonAllergies = ["Nuts", "Dairy", "Gluten", "Soy", "Eggs"];
  const dietaryPreferences = ["Vegetarian", "Vegan", "Jain", "No Onion/Garlic"];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Utensils className="h-5 w-5" />
          <span>Dietary Preferences</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dietary Type */}
        <div>
          <Label className="text-base font-medium mb-3 block">Dietary Type</Label>
          <div className="grid grid-cols-2 gap-2">
            {dietaryPreferences.map(pref => (
              <div key={pref} className="flex items-center space-x-2">
                <Checkbox
                  id={pref}
                  checked={preferences.dietaryType?.includes(pref)}
                  onCheckedChange={(checked) => {
                    const current = preferences.dietaryType || [];
                    if (checked) {
                      onChange({
                        ...preferences,
                        dietaryType: [...current, pref]
                      });
                    } else {
                      onChange({
                        ...preferences,
                        dietaryType: current.filter((item: string) => item !== pref)
                      });
                    }
                  }}
                />
                <Label htmlFor={pref} className="text-sm">{pref}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div>
          <Label className="text-base font-medium mb-3 block">Allergies</Label>
          <div className="grid grid-cols-2 gap-2">
            {commonAllergies.map(allergy => (
              <div key={allergy} className="flex items-center space-x-2">
                <Checkbox
                  id={allergy}
                  checked={preferences.allergies?.includes(allergy)}
                  onCheckedChange={(checked) => {
                    const current = preferences.allergies || [];
                    if (checked) {
                      onChange({
                        ...preferences,
                        allergies: [...current, allergy]
                      });
                    } else {
                      onChange({
                        ...preferences,
                        allergies: current.filter((item: string) => item !== allergy)
                      });
                    }
                  }}
                />
                <Label htmlFor={allergy} className="text-sm">{allergy}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Food Dislikes */}
        <div>
          <Label htmlFor="dislikes" className="text-base font-medium">Food Dislikes</Label>
          <Input
            id="dislikes"
            placeholder="e.g., bitter gourd, broccoli (comma separated)"
            value={preferences.dislikes?.join(', ') || ''}
            onChange={(e) => {
              const dislikes = e.target.value.split(',').map(item => item.trim()).filter(Boolean);
              onChange({ ...preferences, dislikes });
            }}
            className="mt-2"
          />
        </div>

        {/* Special Requirements */}
        <div>
          <Label htmlFor="requirements" className="text-base font-medium">Special Requirements</Label>
          <Input
            id="requirements"
            placeholder="e.g., low sodium, high protein"
            value={preferences.specialRequirements || ''}
            onChange={(e) => onChange({ ...preferences, specialRequirements: e.target.value })}
            className="mt-2"
          />
        </div>
      </CardContent>
    </Card>
  );
}

// Generated Plan Display Component
function GeneratedPlanDisplay({ plan, patient }: { plan: any; patient: any }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Plan Header */}
      <Card className="bg-gradient-to-r from-green-50 to-yellow-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-800">
            <Sparkles className="h-6 w-6" />
            <span>Personalized Ayurvedic Diet Plan</span>
          </CardTitle>
          <p className="text-green-700">
            Generated for {patient.name} based on {
              patient.dosha.vata >= patient.dosha.pitta && patient.dosha.vata >= patient.dosha.kapha ? 'Vata' :
              patient.dosha.pitta >= patient.dosha.kapha ? 'Pitta' : 'Kapha'
            } constitution
          </p>
        </CardHeader>
      </Card>

      {/* Daily Meal Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Morning */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <span>Morning (6:00 AM - 10:00 AM)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {plan.morning.meals.map((meal: any, index: number) => (
              <div key={index} className="p-3 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-2">{meal.name}</h4>
                <div className="space-y-1">
                  {meal.items.map((item: string, i: number) => (
                    <p key={i} className="text-sm text-orange-700">• {item}</p>
                  ))}
                </div>
                {meal.preparation && (
                  <p className="text-xs text-orange-600 mt-2 italic">{meal.preparation}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Afternoon */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span>Afternoon (12:00 PM - 2:00 PM)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {plan.afternoon.meals.map((meal: any, index: number) => (
              <div key={index} className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">{meal.name}</h4>
                <div className="space-y-1">
                  {meal.items.map((item: string, i: number) => (
                    <p key={i} className="text-sm text-blue-700">• {item}</p>
                  ))}
                </div>
                {meal.preparation && (
                  <p className="text-xs text-blue-600 mt-2 italic">{meal.preparation}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Evening */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-500" />
              <span>Evening (6:00 PM - 8:00 PM)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {plan.evening.meals.map((meal: any, index: number) => (
              <div key={index} className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">{meal.name}</h4>
                <div className="space-y-1">
                  {meal.items.map((item: string, i: number) => (
                    <p key={i} className="text-sm text-purple-700">• {item}</p>
                  ))}
                </div>
                {meal.preparation && (
                  <p className="text-xs text-purple-600 mt-2 italic">{meal.preparation}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Ayurvedic Principles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Leaf className="h-5 w-5 text-green-500" />
            <span>Ayurvedic Guidelines</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {plan.ayurvedicGuidelines.map((guideline: string, index: number) => (
              <p key={index} className="text-sm flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>{guideline}</span>
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button 
          onClick={() => navigate(`/diet-chart/${patient.id}/generated`, { 
            state: { plan, patient } 
          })}
          className="flex items-center space-x-2"
        >
          <ChefHat className="h-4 w-4" />
          <span>View Full Diet Chart</span>
        </Button>
        <Button variant="outline">
          Save to Patient Records
        </Button>
        <Button variant="outline">
          Generate New Plan
        </Button>
      </div>
    </div>
  );
}

export default function DietPlanGenerator() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const location = useLocation();
  
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [preferences, setPreferences] = useState({
    dietaryType: [],
    allergies: [],
    dislikes: [],
    specialRequirements: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  // Initialize with patient from URL parameter
  useEffect(() => {
    if (patientId) {
      const patient = demoPatients.find(p => p.id === parseInt(patientId));
      if (patient) {
        setSelectedPatient(patient);
      }
    }
  }, [patientId]);

  const getPrimaryDosha = (dosha: any) => {
    if (dosha.vata >= dosha.pitta && dosha.vata >= dosha.kapha) return 'vata';
    if (dosha.pitta >= dosha.vata && dosha.pitta >= dosha.kapha) return 'pitta';
    return 'kapha';
  };

  const generateMeals = (timeOfDay: string, dosha: any) => {
    const primaryDosha = getPrimaryDosha(dosha);
    
    // Filter foods suitable for the dosha
    const suitableFoods = foodDatabase.filter(food => 
      food.doshaEffects[primaryDosha as keyof typeof food.doshaEffects] >= 0.7
    );

    const grains = suitableFoods.filter(f => f.category === 'grains');
    const proteins = suitableFoods.filter(f => f.category === 'proteins');
    const vegetables = suitableFoods.filter(f => f.category === 'vegetables');
    const spices = suitableFoods.filter(f => f.category === 'spices');

    if (timeOfDay === 'morning') {
      return {
        meals: [
          {
            name: "Early Morning",
            items: ["Warm water with lemon and ginger", "1 tsp honey (optional)"],
            preparation: "Drink on empty stomach to kindle digestive fire"
          },
          {
            name: "Breakfast",
            items: [
              grains[0]?.name + " porridge" || "Oats porridge",
              "Soaked almonds (5-6)",
              vegetables[0]?.name + " cooked" || "Cooked vegetables",
              spices[0]?.name + " powder" || "Warming spices"
            ],
            preparation: "Cook with ghee and warming spices for better digestion"
          }
        ]
      };
    }

    if (timeOfDay === 'afternoon') {
      return {
        meals: [
          {
            name: "Lunch (Main Meal)",
            items: [
              grains[1]?.name || "Rice",
              proteins[0]?.name || "Dal",
              vegetables[1]?.name + " sabzi" || "Seasonal vegetables",
              "Fresh buttermilk with cumin",
              "Small portion of pickle or chutney"
            ],
            preparation: "Eat largest meal at midday when digestive fire is strongest"
          }
        ]
      };
    }

    return {
      meals: [
        {
          name: "Evening Meal",
          items: [
            "Light " + (grains[0]?.name || "grain") + " preparation",
            proteins[0]?.name + " soup" || "Light dal soup",
            vegetables[2]?.name + " cooked" || "Steamed vegetables",
            "Herbal tea with digestive spices"
          ],
          preparation: "Keep dinner light and finish 3 hours before bedtime"
        }
      ]
    };
  };

  const generateDietPlan = async () => {
    if (!selectedPatient) return;

    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));

    const primaryDosha = getPrimaryDosha(selectedPatient.dosha);
    
    const plan = {
      morning: generateMeals('morning', selectedPatient.dosha),
      afternoon: generateMeals('afternoon', selectedPatient.dosha),
      evening: generateMeals('evening', selectedPatient.dosha),
      ayurvedicGuidelines: ayurvedicPrinciples[primaryDosha as keyof typeof ayurvedicPrinciples],
      nutritionalSummary: {
        calories: "1800-2200 per day",
        protein: "60-80g per day", 
        carbs: "250-300g per day",
        fat: "60-80g per day"
      }
    };

    setGeneratedPlan(plan);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold font-['Playfair_Display']">
              Diet Plan Generator
            </h1>
            <p className="text-muted-foreground">
              Create personalized Ayurvedic diet plans based on dosha constitution
            </p>
          </div>
        </div>
      </div>

      {!generatedPlan ? (
        <div className="space-y-6">
          {/* Patient Selection */}
          <PatientSelector 
            selectedPatient={selectedPatient}
            onSelect={setSelectedPatient}
          />

          {/* Preferences Form */}
          {selectedPatient && (
            <PreferencesForm 
              preferences={preferences}
              onChange={setPreferences}
            />
          )}

          {/* Generate Button */}
          {selectedPatient && (
            <Card>
              <CardContent className="p-6 text-center">
                <Button
                  onClick={generateDietPlan}
                  disabled={isGenerating}
                  size="lg"
                  className="w-full max-w-md h-12"
                >
                  {isGenerating ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Generating Personalized Plan...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-5 w-5" />
                      <span>Generate Ayurvedic Diet Plan</span>
                    </div>
                  )}
                </Button>
                {isGenerating && (
                  <p className="text-sm text-muted-foreground mt-3">
                    Analyzing dosha constitution and creating optimal meal combinations...
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <GeneratedPlanDisplay plan={generatedPlan} patient={selectedPatient} />
      )}
    </div>
  );
}
