import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Activity,
  Zap,
  Flame,
  Mountain
} from "lucide-react";
import { doshaAssessmentQuestions, doshaDescriptions } from "@/data/assessment";
import { demoPatients } from "@/data/patients";

// Question Card Component
function QuestionCard({ 
  question, 
  selectedAnswer, 
  onAnswer 
}: { 
  question: any; 
  selectedAnswer: string | null;
  onAnswer: (value: string) => void;
}) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-['Playfair_Display'] text-center">
          {question.text}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {question.options.map((option: any) => (
          <div
            key={option.value}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
              selectedAnswer === option.value
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => onAnswer(option.value)}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedAnswer === option.value
                  ? 'border-primary bg-primary'
                  : 'border-muted-foreground'
              }`}>
                {selectedAnswer === option.value && (
                  <CheckCircle className="h-4 w-4 text-white" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium mb-1">{option.text}</p>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// Results Component
function AssessmentResults({ 
  dosha, 
  onRestart,
  onComplete 
}: { 
  dosha: { vata: number; pitta: number; kapha: number };
  onRestart: () => void;
  onComplete: () => void;
}) {
  const getPrimaryDosha = () => {
    if (dosha.vata >= dosha.pitta && dosha.vata >= dosha.kapha) return 'vata';
    if (dosha.pitta >= dosha.vata && dosha.pitta >= dosha.kapha) return 'pitta';
    return 'kapha';
  };

  const primaryDosha = getPrimaryDosha();
  const doshaInfo = doshaDescriptions[primaryDosha as keyof typeof doshaDescriptions];

  const getDoshaIcon = (type: string) => {
    switch (type) {
      case 'vata': return <Zap className="h-8 w-8 text-blue-500" />;
      case 'pitta': return <Flame className="h-8 w-8 text-red-500" />;
      case 'kapha': return <Mountain className="h-8 w-8 text-green-500" />;
      default: return <Activity className="h-8 w-8" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Results Header */}
      <Card>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            {getDoshaIcon(primaryDosha)}
          </div>
          <CardTitle className="text-2xl font-['Playfair_Display']">
            Your Primary Dosha: {doshaInfo.name}
          </CardTitle>
          <p className="text-muted-foreground">
            {doshaInfo.element} constitution
          </p>
        </CardHeader>
        <CardContent>
          {/* Dosha Breakdown */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Vata</span>
              </div>
              <span className="text-lg font-semibold">{dosha.vata}%</span>
            </div>
            <Progress value={dosha.vata} className="h-3" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Flame className="h-5 w-5 text-red-500" />
                <span className="font-medium">Pitta</span>
              </div>
              <span className="text-lg font-semibold">{dosha.pitta}%</span>
            </div>
            <Progress value={dosha.pitta} className="h-3" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mountain className="h-5 w-5 text-green-500" />
                <span className="font-medium">Kapha</span>
              </div>
              <span className="text-lg font-semibold">{dosha.kapha}%</span>
            </div>
            <Progress value={dosha.kapha} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Dosha Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Characteristics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Key Characteristics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1 mb-3">
                {doshaInfo.qualities.map((quality, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {quality}
                  </Badge>
                ))}
              </div>
              <ul className="space-y-1">
                {doshaInfo.characteristics.map((char, index) => (
                  <li key={index} className="text-sm flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{char}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Imbalance Symptoms */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Watch for Imbalances</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {doshaInfo.imbalanceSymptoms.map((symptom, index) => (
                <li key={index} className="text-sm flex items-start space-x-2">
                  <div className="h-4 w-4 bg-yellow-500 rounded-full mt-0.5 flex-shrink-0" />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Dietary Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dietary Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-green-600 mb-2">Balancing Foods</h4>
              <ul className="space-y-1">
                {doshaInfo.balancingFoods.map((food, index) => (
                  <li key={index} className="text-sm flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{food}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button variant="outline" onClick={onRestart}>
          Retake Assessment
        </Button>
        <Button onClick={onComplete}>
          Generate Personalized Diet Plan
        </Button>
      </div>
    </div>
  );
}

export default function DoshaAssessment() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [doshaResults, setDoshaResults] = useState({ vata: 0, pitta: 0, kapha: 0 });

  const patient = patientId ? demoPatients.find(p => p.id === parseInt(patientId)) : null;

  const calculateDosha = () => {
    const scores = { vata: 0, pitta: 0, kapha: 0 };
    
    Object.values(answers).forEach(answer => {
      scores[answer as keyof typeof scores]++;
    });
    
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    
    if (total === 0) return { vata: 33, pitta: 33, kapha: 34 };
    
    return {
      vata: Math.round((scores.vata / total) * 100),
      pitta: Math.round((scores.pitta / total) * 100),
      kapha: Math.round((scores.kapha / total) * 100)
    };
  };

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < doshaAssessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Show results
      const results = calculateDosha();
      setDoshaResults(results);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setDoshaResults({ vata: 0, pitta: 0, kapha: 0 });
  };

  const handleComplete = () => {
    if (patientId) {
      navigate(`/patients/${patientId}/diet-chart/generator`, {
        state: { assessmentResults: doshaResults }
      });
    } else {
      navigate('/diet-plan/generator', {
        state: { assessmentResults: doshaResults }
      });
    }
  };

  if (showResults) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </div>
        
        <AssessmentResults 
          dosha={doshaResults}
          onRestart={handleRestart}
          onComplete={handleComplete}
        />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="absolute left-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Activity className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold font-['Playfair_Display'] mb-2">
          Dosha Assessment
        </h1>
        {patient && (
          <p className="text-muted-foreground">
            Assessment for {patient.name}
          </p>
        )}
      </div>

      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {doshaAssessmentQuestions.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(((currentQuestion + 1) / doshaAssessmentQuestions.length) * 100)}% Complete
          </span>
        </div>
        <Progress 
          value={((currentQuestion + 1) / doshaAssessmentQuestions.length) * 100} 
          className="h-2"
        />
      </div>

      {/* Question */}
      <QuestionCard
        question={doshaAssessmentQuestions[currentQuestion]}
        selectedAnswer={answers[currentQuestion] || null}
        onAnswer={handleAnswer}
      />

      {/* Navigation Buttons */}
      <div className="flex justify-between max-w-3xl mx-auto">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>

        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion]}
          className="flex items-center space-x-2"
        >
          <span>
            {currentQuestion === doshaAssessmentQuestions.length - 1 ? 'Show Results' : 'Next'}
          </span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
