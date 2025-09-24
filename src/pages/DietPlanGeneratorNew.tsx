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
import { patientService, Patient } from "@/services/patientService";
import { foodDatabase, ayurvedicPrinciples } from "@/data/foods";

// Patient Selector Component
function PatientSelector({ selectedPatient, onSelect }: { 
  selectedPatient: any; 
  onSelect: (patient: any) => void; 
}) {
  const [showPatients, setShowPatients] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const data = await patientService.getAllPatients();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

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
                  selectedPatient.dosha ? (
                    selectedPatient.dosha.vata >= selectedPatient.dosha.pitta && 
                    selectedPatient.dosha.vata >= selectedPatient.dosha.kapha ? 'Vata' :
                    selectedPatient.dosha.pitta >= selectedPatient.dosha.kapha ? 'Pitta' : 'Kapha'
                  ) : 'Not assessed'
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
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading patients...</div>
            ) : patients.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No patients found</div>
            ) : (
              patients.map(patient => (
                <div
                  key={patient._id}
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
              ))
            )}
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
            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
              <h4 className="font-semibold text-orange-800 mb-3">Morning Meal Plan</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-orange-700">Main:</span>
                  <span className="text-sm text-orange-800">{plan.morning.main}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-orange-700">Protein:</span>
                  <span className="text-sm text-orange-800">{plan.morning.protein}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-orange-700">Vegetables:</span>
                  <span className="text-sm text-orange-800">{plan.morning.vegetables}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-orange-700">Spices:</span>
                  <span className="text-sm text-orange-800">{plan.morning.spices.join(', ')}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-orange-200">
                <p className="text-xs text-orange-700 italic">{plan.morning.preparation}</p>
                <p className="text-xs text-orange-600 mt-1">💡 {plan.morning.ayurvedicNote}</p>
              </div>
            </div>
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
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <h4 className="font-semibold text-blue-800 mb-3">Afternoon Meal Plan</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-blue-700">Main:</span>
                  <span className="text-sm text-blue-800">{plan.afternoon.main}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-blue-700">Protein:</span>
                  <span className="text-sm text-blue-800">{plan.afternoon.protein}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-blue-700">Vegetables:</span>
                  <span className="text-sm text-blue-800">{plan.afternoon.vegetables}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-blue-700">Spices:</span>
                  <span className="text-sm text-blue-800">{plan.afternoon.spices.join(', ')}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="text-xs text-blue-700 italic">{plan.afternoon.preparation}</p>
                <p className="text-xs text-blue-600 mt-1">💡 {plan.afternoon.ayurvedicNote}</p>
              </div>
            </div>
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
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
              <h4 className="font-semibold text-purple-800 mb-3">Evening Meal Plan</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-purple-700">Main:</span>
                  <span className="text-sm text-purple-800">{plan.evening.main}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-purple-700">Protein:</span>
                  <span className="text-sm text-purple-800">{plan.evening.protein}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-purple-700">Vegetables:</span>
                  <span className="text-sm text-purple-800">{plan.evening.vegetables}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-purple-700">Spices:</span>
                  <span className="text-sm text-purple-800">{plan.evening.spices.join(', ')}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-purple-200">
                <p className="text-xs text-purple-700 italic">{plan.evening.preparation}</p>
                <p className="text-xs text-purple-600 mt-1">💡 {plan.evening.ayurvedicNote}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nutritional Summary & Ayurvedic Principles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nutritional Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ChefHat className="h-5 w-5 text-blue-500" />
              <span>Nutritional Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Daily Calories:</span>
                <span className="text-sm text-blue-600 font-semibold">{plan.nutritionalSummary.calories}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Protein:</span>
                <span className="text-sm text-blue-600 font-semibold">{plan.nutritionalSummary.protein}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Carbohydrates:</span>
                <span className="text-sm text-blue-600 font-semibold">{plan.nutritionalSummary.carbs}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Healthy Fats:</span>
                <span className="text-sm text-blue-600 font-semibold">{plan.nutritionalSummary.fat}</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700">
                <strong>Dosha Analysis:</strong> {plan.doshaAnalysis.constitution}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Primary: <strong>{plan.doshaAnalysis.primary.toUpperCase()}</strong> constitution
              </p>
            </div>
          </CardContent>
        </Card>

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
              {plan.ayurvedicPrinciples.map((guideline: string, index: number) => (
                <p key={index} className="text-sm flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>{guideline}</span>
                </p>
              ))}
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <h4 className="text-sm font-semibold text-green-800 mb-2">Key Recommendations:</h4>
              {plan.doshaAnalysis.recommendations.map((rec: string, index: number) => (
                <p key={index} className="text-xs text-green-700">• {rec}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button 
          onClick={() => navigate(`/diet-chart/${patient._id}/generated`, { 
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
    const fetchPatient = async () => {
      if (patientId) {
        try {
          const patient = await patientService.getPatientById(patientId);
          setSelectedPatient(patient);
        } catch (error) {
          console.error('Error fetching patient:', error);
        }
      }
    };
    fetchPatient();
  }, [patientId]);

  const getPrimaryDosha = (dosha: any) => {
    if (dosha.vata >= dosha.pitta && dosha.vata >= dosha.kapha) return 'vata';
    if (dosha.pitta >= dosha.vata && dosha.pitta >= dosha.kapha) return 'pitta';
    return 'kapha';
  };

  // Smart meal generation based on dosha compatibility
  const generateMeals = (timeOfDay: string, dosha: any, preferences: any) => {
    const primaryDosha = getPrimaryDosha(dosha);
    
    // Filter foods based on dosha compatibility (70% threshold as per spec)
    const suitableFoods = foodDatabase.filter(food => 
      food.doshaEffects[primaryDosha as keyof typeof food.doshaEffects] >= 0.7
    );

    // Further filter based on dietary preferences
    let filteredFoods = suitableFoods;
    if (preferences.allergies?.includes('Dairy')) {
      filteredFoods = filteredFoods.filter(f => f.category !== 'dairy');
    }
    if (preferences.allergies?.includes('Nuts')) {
      filteredFoods = filteredFoods.filter(f => f.category !== 'nuts');
    }
    if (preferences.allergies?.includes('Gluten')) {
      filteredFoods = filteredFoods.filter(f => f.name !== 'Wheat');
    }

    const grains = filteredFoods.filter(f => f.category === 'grains');
    const proteins = filteredFoods.filter(f => f.category === 'proteins');
    const vegetables = filteredFoods.filter(f => f.category === 'vegetables');
    const spices = filteredFoods.filter(f => f.category === 'spices');
    const fruits = filteredFoods.filter(f => f.category === 'fruits');

    // Select random suitable foods for variety
    const selectRandomFood = (foods: any[], count = 1) => {
      if (foods.length === 0) return [];
      const shuffled = [...foods].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const getRecommendedSpices = (dosha: string, time: string) => {
      const doshaSpices = {
        vata: ['Ginger', 'Cinnamon', 'Cardamom', 'Cumin'],
        pitta: ['Coriander', 'Fennel', 'Mint', 'Cumin'],
        kapha: ['Black Pepper', 'Ginger', 'Turmeric', 'Mustard Seeds']
      };
      return doshaSpices[dosha as keyof typeof doshaSpices] || [];
    };

    if (timeOfDay === 'morning') {
      const selectedGrain = selectRandomFood(grains)[0];
      const selectedSpices = getRecommendedSpices(primaryDosha, 'morning');
      
      return {
        main: selectedGrain?.name || "Oats",
        protein: "Soaked almonds (5-6)",
        vegetables: selectRandomFood(vegetables, 1)[0]?.name || "Seasonal vegetables",
        spices: selectedSpices.slice(0, 2),
        preparation: `Cook ${selectedGrain?.name || 'oats'} with ${selectedSpices.join(', ')} and ghee. ${selectedGrain?.preparationTips || 'Serve warm'}.`,
        ayurvedicNote: `${selectedGrain?.ayurvedicBenefits || 'Provides sustained energy'} - Perfect for ${primaryDosha} constitution.`
      };
    }

    if (timeOfDay === 'afternoon') {
      const selectedGrain = selectRandomFood(grains.filter(g => g.name !== 'Oats'))[0];
      const selectedProtein = selectRandomFood(proteins)[0];
      const selectedVegetables = selectRandomFood(vegetables, 2);
      
      return {
        main: selectedGrain?.name || "Basmati Rice",
        protein: selectedProtein?.name || "Mung Dal", 
        vegetables: selectedVegetables.map(v => v.name).join(' and ') || "Seasonal vegetables",
        spices: getRecommendedSpices(primaryDosha, 'afternoon').slice(0, 3),
        preparation: `${selectedProtein?.preparationTips || 'Cook well with spices'}. ${selectedGrain?.preparationTips || 'Serve with ghee'}.`,
        ayurvedicNote: `${selectedProtein?.ayurvedicBenefits || 'Provides essential proteins'} Main meal should be largest of the day.`
      };
    }

    // Evening
    const selectedGrain = selectRandomFood(grains.filter(g => g.gunas?.includes('Light')))[0];
    const selectedProtein = selectRandomFood(proteins.filter(p => p.category === 'proteins'))[0];
    const selectedVegetables = selectRandomFood(vegetables, 1);
    
    return {
      main: `Light ${selectedGrain?.name || 'grain'} preparation`,
      protein: `${selectedProtein?.name || 'Dal'} soup`,
      vegetables: selectedVegetables[0]?.name + ' (steamed)' || 'Steamed vegetables',
      spices: getRecommendedSpices(primaryDosha, 'evening').slice(0, 2),
      preparation: "Keep dinner light and easily digestible. Finish 3 hours before bedtime.",
      ayurvedicNote: "Light evening meal promotes good sleep and proper digestion."
    };
  };

  const calculateNutrition = (dosha: any) => {
    const primaryDosha = getPrimaryDosha(dosha);
    const baseCalories = primaryDosha === 'vata' ? 2000 : primaryDosha === 'pitta' ? 2200 : 1800;
    
    return {
      calories: `${baseCalories - 200} - ${baseCalories + 200} per day`,
      protein: `${Math.round(baseCalories * 0.15 / 4)} - ${Math.round(baseCalories * 0.20 / 4)}g per day`,
      carbs: `${Math.round(baseCalories * 0.45 / 4)} - ${Math.round(baseCalories * 0.65 / 4)}g per day`,
      fat: `${Math.round(baseCalories * 0.20 / 9)} - ${Math.round(baseCalories * 0.35 / 9)}g per day`
    };
  };

  const generateDietPlan = async () => {
    if (!selectedPatient) return;

    setIsGenerating(true);
    
    // Simulate AI processing time (2 seconds as per spec)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const primaryDosha = getPrimaryDosha(selectedPatient.dosha);
    
    const plan = {
      morning: generateMeals('morning', selectedPatient.dosha, preferences),
      afternoon: generateMeals('afternoon', selectedPatient.dosha, preferences),
      evening: generateMeals('evening', selectedPatient.dosha, preferences),
      ayurvedicPrinciples: ayurvedicPrinciples[primaryDosha as keyof typeof ayurvedicPrinciples],
      nutritionalSummary: calculateNutrition(selectedPatient.dosha),
      doshaAnalysis: {
        primary: primaryDosha,
        constitution: `${selectedPatient.dosha.vata}% Vata, ${selectedPatient.dosha.pitta}% Pitta, ${selectedPatient.dosha.kapha}% Kapha`,
        recommendations: ayurvedicPrinciples[primaryDosha as keyof typeof ayurvedicPrinciples].slice(0, 3)
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
