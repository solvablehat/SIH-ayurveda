import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TopAppBar } from "@/components/ui/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Save,
  Wand2,
  Activity,
  Leaf,
  Sun,
  Snowflake,
  Zap,
  Users,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { patientService, Patient } from '@/services/patientService';

export default function DietPlanGenerator() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  
  const [selectedPatientId, setSelectedPatientId] = useState<string>(patientId || '');
  const [selectedDosha, setSelectedDosha] = useState<'Vata' | 'Pitta' | 'Kapha' | ''>('');
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedFoodCategories, setSelectedFoodCategories] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loadingPatients, setLoadingPatients] = useState(false);

  const doshas = [
    {
      name: 'Vata' as const,
      icon: Zap,
      color: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200',
      description: 'Air & Space elements',
      characteristics: ['Dry', 'Light', 'Cold', 'Rough', 'Subtle', 'Mobile']
    },
    {
      name: 'Pitta' as const,
      icon: Sun,
      color: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200',
      description: 'Fire & Water elements',
      characteristics: ['Hot', 'Sharp', 'Light', 'Liquid', 'Spreading', 'Oily']
    },
    {
      name: 'Kapha' as const,
      icon: Snowflake,
      color: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
      description: 'Earth & Water elements',
      characteristics: ['Heavy', 'Slow', 'Cold', 'Oily', 'Smooth', 'Dense']
    }
  ];

  const healthConditions = [
    'Diabetes', 'Hypertension', 'Digestive Issues', 'Stress & Anxiety',
    'Weight Management', 'Skin Conditions', 'Joint Pain', 'Sleep Disorders',
    'Respiratory Issues', 'Hormonal Imbalance'
  ];

  const foodCategories = [
    { name: 'Grains & Cereals', icon: '🌾' },
    { name: 'Vegetables', icon: '🥬' },
    { name: 'Fruits', icon: '🍎' },
    { name: 'Legumes & Beans', icon: '🫘' },
    { name: 'Dairy Products', icon: '🥛' },
    { name: 'Spices & Herbs', icon: '🌿' },
    { name: 'Nuts & Seeds', icon: '🥜' },
    { name: 'Oils & Fats', icon: '🫒' }
  ];

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoadingPatients(true);
        const data = await patientService.getAllPatients();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setLoadingPatients(false);
      }
    };
    
    fetchPatients();
  }, []);

  // Auto-populate dosha and conditions when patient is selected
  useEffect(() => {
    if (selectedPatientId && patients.length > 0) {
      const patient = patients.find(p => p._id === selectedPatientId);
      if (patient?.dosha) {
        // Find dominant dosha
        const { vata, pitta, kapha } = patient.dosha;
        if (vata >= pitta && vata >= kapha) setSelectedDosha('Vata');
        else if (pitta >= vata && pitta >= kapha) setSelectedDosha('Pitta');
        else setSelectedDosha('Kapha');
      }
      if (patient?.conditions) {
        setSelectedConditions(patient.conditions);
      }
    }
  }, [selectedPatientId, patients]);

  const handleGenerate = async () => {
    if (!selectedDosha) {
      alert('Please select a dosha profile');
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      navigate(`/patients/${patientId}/diet-chart/review`, {
        state: {
          dosha: selectedDosha,
          conditions: selectedConditions,
          categories: selectedFoodCategories
        }
      });
    }, 3000);
  };

  const handleSaveDraft = () => {
    navigate(`/patients/${patientId}`, {
      state: { message: 'Diet plan draft saved successfully' }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <TopAppBar 
        title="Generate Diet Plan"
        showBack
        onBack={() => navigate(`/patients/${patientId}/diet-chart/new`)}
        rightAction={
          <button 
            onClick={handleSaveDraft}
            className="p-2 hover:bg-primary/80 rounded-lg transition-colors"
          >
            <Save className="h-5 w-5 text-primary-foreground" />
          </button>
        }
      />
      
      <div className="p-6 space-y-8">
        {/* Patient Selection */}
        <div>
          <h3 className="text-lg font-playfair font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Choose Patient
          </h3>
          <div className="space-y-3">
            {loadingPatients ? (
              <div className="p-4 text-center text-gray-500">Loading patients...</div>
            ) : patients.length === 0 ? (
              <div className="p-4 text-center text-gray-500 flex items-center justify-center gap-2">
                <AlertCircle className="h-5 w-5" />
                No patients found
              </div>
            ) : (
              patients.map((patient) => (
                <button
                  key={patient._id}
                  onClick={() => setSelectedPatientId(patient._id || '')}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 transition-all duration-200 text-left",
                    selectedPatientId === patient._id
                      ? 'border-primary bg-primary/5 shadow-wellness scale-[1.02]'
                      : 'bg-card border-border hover:bg-muted'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{patient.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {patient.age} years, {patient.gender}
                      </p>
                    </div>
                    {patient.dosha && (
                      <div className="text-sm text-primary">
                        Has Dosha Profile
                      </div>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Patient Dosha Profile */}
        <div>
          <h3 className="text-lg font-playfair font-semibold text-foreground mb-4">
            Patient Dosha Profile
          </h3>
          <div className="space-y-3">
            {doshas.map((dosha) => {
              const IconComponent = dosha.icon;
              const isSelected = selectedDosha === dosha.name;
              
              return (
                <button
                  key={dosha.name}
                  onClick={() => setSelectedDosha(dosha.name)}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 transition-all duration-200 text-left",
                    isSelected 
                      ? dosha.color.replace('hover:', '') + ' shadow-wellness scale-[1.02]'
                      : 'bg-card border-border hover:bg-muted'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      isSelected ? "bg-white/80" : "bg-gradient-primary"
                    )}>
                      <IconComponent className={cn(
                        "h-5 w-5",
                        isSelected ? "text-primary" : "text-primary-foreground"
                      )} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-playfair font-semibold">{dosha.name}</h4>
                        <span className="text-sm font-poppins opacity-80">
                          {dosha.description}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {dosha.characteristics.map((char, index) => (
                          <span 
                            key={index}
                            className="text-xs px-2 py-1 rounded-full bg-white/50 font-poppins"
                          >
                            {char}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Health Conditions & Preferences */}
        <div>
          <h3 className="text-lg font-playfair font-semibold text-foreground mb-4">
            Health Conditions & Preferences
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {healthConditions.map((condition) => (
              <label 
                key={condition}
                className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border hover:bg-muted transition-colors cursor-pointer"
              >
                <Checkbox
                  checked={selectedConditions.includes(condition)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedConditions([...selectedConditions, condition]);
                    } else {
                      setSelectedConditions(selectedConditions.filter(c => c !== condition));
                    }
                  }}
                />
                <span className="text-sm font-poppins">{condition}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Food Categories */}
        <div>
          <h3 className="text-lg font-playfair font-semibold text-foreground mb-4">
            Food Categories
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {foodCategories.map((category) => (
              <label 
                key={category.name}
                className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border hover:bg-muted transition-colors cursor-pointer"
              >
                <Checkbox
                  checked={selectedFoodCategories.includes(category.name)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedFoodCategories([...selectedFoodCategories, category.name]);
                    } else {
                      setSelectedFoodCategories(selectedFoodCategories.filter(c => c !== category.name));
                    }
                  }}
                />
                <span className="text-lg mr-2">{category.icon}</span>
                <span className="text-sm font-poppins">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Diet Plan Preview */}
        {selectedDosha && (
          <div className="bg-gradient-wellness rounded-xl p-6 border border-border/30">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-playfair font-semibold text-foreground">
                Real-time Preview
              </h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                <span className="font-poppins text-foreground">Primary Dosha</span>
                <span className="font-playfair font-semibold text-primary">
                  {selectedDosha}
                </span>
              </div>
              
              {selectedConditions.length > 0 && (
                <div className="p-3 bg-white/50 rounded-lg">
                  <span className="font-poppins text-foreground block mb-2">
                    Health Focus Areas
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedConditions.map((condition) => (
                      <span 
                        key={condition}
                        className="text-xs px-2 py-1 bg-accent/20 text-accent-foreground rounded-full font-poppins"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedFoodCategories.length > 0 && (
                <div className="p-3 bg-white/50 rounded-lg">
                  <span className="font-poppins text-foreground block mb-2">
                    Include Categories
                  </span>
                  <div className="text-sm text-muted-foreground font-poppins">
                    {selectedFoodCategories.length} categories selected
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Ayurvedic Wisdom Quote */}
        <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
          <div className="flex items-start gap-3">
            <Leaf className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="font-playfair text-foreground italic mb-2">
                "When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need."
              </p>
              <p className="text-sm text-muted-foreground font-poppins">
                — Ancient Ayurvedic Principle
              </p>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="sticky bottom-6">
          <Button
            onClick={handleGenerate}
            disabled={!selectedDosha || isGenerating}
            className="w-full bg-gradient-primary text-primary-foreground py-6 text-lg font-poppins font-semibold hover:shadow-elevated disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                <span>Generating Personalized Plan...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                <span>Generate Diet Plan</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}