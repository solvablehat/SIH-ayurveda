import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  Share2, 
  Calendar, 
  User, 
  Leaf,
  Clock,
  Utensils,
  Star
} from "lucide-react";

export default function GeneratedDietChart() {
  const navigate = useNavigate();
  const location = useLocation();
  const { patientId } = useParams();
  
  const { plan, patient } = location.state || {};

  if (!plan || !patient) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Utensils className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Diet Plan Not Found</h3>
          <p className="text-muted-foreground mb-4">Please generate a diet plan first.</p>
          <Button onClick={() => navigate('/diet-plan/generator')}>
            Generate Diet Plan
          </Button>
        </div>
      </div>
    );
  }

  const getPrimaryDosha = () => {
    if (patient.dosha.vata >= patient.dosha.pitta && patient.dosha.vata >= patient.dosha.kapha) return 'Vata';
    if (patient.dosha.pitta >= patient.dosha.vata && patient.dosha.pitta >= patient.dosha.kapha) return 'Pitta';
    return 'Kapha';
  };

  const getDoshaDescription = () => {
    const primary = getPrimaryDosha();
    const descriptions = {
      Vata: "Air + Space • Light, Dry, Cold, Mobile",
      Pitta: "Fire + Water • Hot, Sharp, Light, Oily", 
      Kapha: "Earth + Water • Heavy, Cold, Moist, Stable"
    };
    return descriptions[primary as keyof typeof descriptions];
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert("PDF download functionality would be implemented here using libraries like jsPDF or Puppeteer");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Diet Chart for ${patient.name}`,
        text: `Personalized Ayurvedic Diet Plan for ${patient.name}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between print:hidden">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      {/* Diet Chart Content */}
      <div className="max-w-5xl mx-auto bg-white print:shadow-none" id="diet-chart">
        {/* Header */}
        <div className="text-center mb-8 p-8 bg-gradient-to-r from-green-50 to-yellow-50 print:bg-white">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-green-800 font-['Playfair_Display'] mb-2">
            Personalized Ayurvedic Diet Chart
          </h1>
          <p className="text-lg text-green-700 mb-1">
            Prepared for {patient.name}
          </p>
          <p className="text-sm text-green-600">
            Generated on {new Date().toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Patient Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 px-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Patient Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{patient.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age:</span>
                <span className="font-medium">{patient.age} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gender:</span>
                <span className="font-medium">{patient.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Primary Dosha:</span>
                <Badge variant="secondary" className="font-medium">
                  {getPrimaryDosha()}
                </Badge>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-muted-foreground">Constitution:</span>
                <span className="font-medium text-right text-sm">
                  {getDoshaDescription()}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Health Conditions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {patient.conditions && patient.conditions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {patient.conditions.map((condition: string, index: number) => (
                    <Badge key={index} variant="destructive" className="text-sm">
                      {condition}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No specific conditions noted</p>
              )}
              
              {patient.medications && patient.medications.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-medium text-sm mb-2">Current Medications:</h5>
                  <div className="space-y-1">
                    {patient.medications.map((med: string, index: number) => (
                      <p key={index} className="text-sm text-muted-foreground">• {med}</p>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Daily Meal Plan */}
        <div className="px-8 mb-8">
          <h2 className="text-2xl font-bold font-['Playfair_Display'] mb-6 text-center">
            Daily Meal Plan
          </h2>
          
          <div className="space-y-6">
            {/* Morning */}
            <Card>
              <CardHeader className="bg-orange-50 print:bg-gray-50">
                <CardTitle className="flex items-center space-x-2 text-orange-800">
                  <Clock className="h-5 w-5" />
                  <span>Morning (6:00 AM - 10:00 AM)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-orange-800 mb-3">Meal Components</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">Main Grain:</span>
                        <span className="text-orange-700 font-medium">{plan.morning.main}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">Protein:</span>
                        <span className="text-orange-700 font-medium">{plan.morning.protein}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">Vegetables:</span>
                        <span className="text-orange-700 font-medium">{plan.morning.vegetables}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="font-medium text-sm">Recommended Spices:</span>
                        <span className="text-orange-700 font-medium text-right">{plan.morning.spices.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-orange-800 mb-3">Preparation & Benefits</h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-sm text-orange-700 mb-1">Preparation Method:</h5>
                        <p className="text-sm text-muted-foreground leading-relaxed">{plan.morning.preparation}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm text-orange-700 mb-1">Ayurvedic Benefits:</h5>
                        <p className="text-sm text-green-600 leading-relaxed">💡 {plan.morning.ayurvedicNote}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Afternoon */}
            <Card>
              <CardHeader className="bg-blue-50 print:bg-gray-50">
                <CardTitle className="flex items-center space-x-2 text-blue-800">
                  <Clock className="h-5 w-5" />
                  <span>Afternoon (12:00 PM - 2:00 PM)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-blue-800 mb-3">Main Meal Components</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">Main Grain:</span>
                        <span className="text-blue-700 font-medium">{plan.afternoon.main}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">Protein:</span>
                        <span className="text-blue-700 font-medium">{plan.afternoon.protein}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">Vegetables:</span>
                        <span className="text-blue-700 font-medium">{plan.afternoon.vegetables}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="font-medium text-sm">Digestive Spices:</span>
                        <span className="text-blue-700 font-medium text-right">{plan.afternoon.spices.join(', ')}</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded">
                      <p className="text-xs text-blue-700">
                        <strong>Note:</strong> This should be your largest meal of the day when digestive fire is strongest.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-blue-800 mb-3">Preparation & Benefits</h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-sm text-blue-700 mb-1">Cooking Instructions:</h5>
                        <p className="text-sm text-muted-foreground leading-relaxed">{plan.afternoon.preparation}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm text-blue-700 mb-1">Ayurvedic Benefits:</h5>
                        <p className="text-sm text-green-600 leading-relaxed">💡 {plan.afternoon.ayurvedicNote}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Evening */}
            <Card>
              <CardHeader className="bg-purple-50 print:bg-gray-50">
                <CardTitle className="flex items-center space-x-2 text-purple-800">
                  <Clock className="h-5 w-5" />
                  <span>Evening (6:00 PM - 8:00 PM)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-purple-800 mb-3">Light Evening Meal</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">Main Grain:</span>
                        <span className="text-purple-700 font-medium">{plan.evening.main}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">Protein:</span>
                        <span className="text-purple-700 font-medium">{plan.evening.protein}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">Vegetables:</span>
                        <span className="text-purple-700 font-medium">{plan.evening.vegetables}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="font-medium text-sm">Calming Spices:</span>
                        <span className="text-purple-700 font-medium text-right">{plan.evening.spices.join(', ')}</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-purple-50 rounded">
                      <p className="text-xs text-purple-700">
                        <strong>Important:</strong> Keep dinner light and finish eating 3 hours before bedtime for optimal digestion.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-purple-800 mb-3">Preparation & Benefits</h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-sm text-purple-700 mb-1">Evening Preparation:</h5>
                        <p className="text-sm text-muted-foreground leading-relaxed">{plan.evening.preparation}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm text-purple-700 mb-1">Ayurvedic Benefits:</h5>
                        <p className="text-sm text-green-600 leading-relaxed">💡 {plan.evening.ayurvedicNote}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Nutritional Summary & Ayurvedic Principles */}
        <div className="px-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Nutritional Summary */}
            <Card>
              <CardHeader className="bg-blue-50 print:bg-gray-50">
                <CardTitle className="flex items-center space-x-2 text-blue-800">
                  <Utensils className="h-5 w-5" />
                  <span>Daily Nutritional Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded">
                      <div className="text-2xl font-bold text-blue-700">{plan.nutritionalSummary.calories}</div>
                      <div className="text-sm text-blue-600">Daily Calories</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded">
                      <div className="text-2xl font-bold text-green-700">{plan.nutritionalSummary.protein}</div>
                      <div className="text-sm text-green-600">Protein</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-yellow-50 rounded">
                      <div className="text-2xl font-bold text-yellow-700">{plan.nutritionalSummary.carbs}</div>
                      <div className="text-sm text-yellow-600">Carbohydrates</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded">
                      <div className="text-2xl font-bold text-purple-700">{plan.nutritionalSummary.fat}</div>
                      <div className="text-sm text-purple-600">Healthy Fats</div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <h5 className="font-medium text-sm mb-2">Dosha Analysis:</h5>
                    <p className="text-sm text-muted-foreground">{plan.doshaAnalysis.constitution}</p>
                    <p className="text-sm font-medium text-blue-600 mt-1">Primary: {plan.doshaAnalysis.primary.toUpperCase()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ayurvedic Principles */}
            <Card>
              <CardHeader className="bg-green-50 print:bg-gray-50">
                <CardTitle className="flex items-center space-x-2 text-green-800">
                  <Leaf className="h-5 w-5" />
                  <span>Ayurvedic Dietary Guidelines</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-3">
                      For {getPrimaryDosha()} Constitution:
                    </h4>
                    <ul className="space-y-2">
                      {plan.ayurvedicPrinciples.map((guideline: string, index: number) => (
                        <li key={index} className="text-sm flex items-start space-x-2">
                          <span className="text-green-500 mt-1">•</span>
                          <span>{guideline}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 rounded">
                    <h5 className="font-medium text-sm text-green-800 mb-2">Key Recommendations:</h5>
                    {plan.doshaAnalysis.recommendations.map((rec: string, index: number) => (
                      <p key={index} className="text-xs text-green-700 mb-1">• {rec}</p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* General Guidelines */}
          <Card>
            <CardHeader className="bg-yellow-50 print:bg-gray-50">
              <CardTitle className="text-yellow-800">General Ayurvedic Eating Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>Eat in a calm, peaceful environment without distractions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>Chew food thoroughly and eat mindfully</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>Maintain regular meal timings daily</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>Eat only when genuinely hungry</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>Avoid drinking cold water with meals</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>Use fresh, seasonal ingredients when possible</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>Cook with love and positive intention</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>Rest briefly after meals before activity</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8 text-center border-t pt-6 print:border-gray-300">
          <div className="text-center p-6 bg-gradient-to-r from-green-50 to-yellow-50 print:bg-gray-50 rounded-lg border">
            <p className="text-sm text-muted-foreground mb-2">
              This personalized diet chart has been prepared based on Ayurvedic principles and your individual constitution.
            </p>
            <p className="text-xs text-muted-foreground">
              For best results, follow consistently and consult with your Ayurvedic practitioner for any adjustments.
            </p>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <Leaf className="h-4 w-4 text-green-600" />
              <span className="text-xs font-semibold text-green-800">AyurPractice Digital Platform</span>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Generated on {new Date().toLocaleDateString('en-IN')} • Valid for 30 days • Follow up recommended in 2 weeks
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
