import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AyurBot from '@/components/AyurBot';
import { 
  ArrowLeft, 
  Bot, 
  Sparkles, 
  MessageCircle, 
  Mic, 
  Volume2,
  BookOpen,
  Lightbulb,
  Users,
  ChefHat
} from 'lucide-react';

export default function AyurBotPage() {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  const exampleQuestions = [
    {
      category: "Food & Herb Lookups",
      icon: <BookOpen className="h-5 w-5" />,
      color: "bg-green-100 text-green-800",
      questions: [
        "What are the Ayurvedic properties of turmeric?",
        "Tell me the Rasa, Virya, and Vipaka of moong dal.",
        "Is ginger good for a Kapha imbalance?",
        "What are the contraindications for honey?"
      ]
    },
    {
      category: "Meal Suggestions",
      icon: <ChefHat className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-800",
      questions: [
        "Suggest a cooling breakfast for a Pitta type.",
        "What are some good vegetables for reducing Vata?",
        "Give me three dinner ideas for a Kapha-pacifying diet.",
        "What spices should I recommend for digestion?"
      ]
    },
    {
      category: "Concept Explanations",
      icon: <Lightbulb className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-800",
      questions: [
        "Explain the concept of 'Agni' in simple terms for a patient.",
        "What is the difference between Prakriti and Vikriti?",
        "Summarize the daily routine (Dinacharya).",
        "How do the six tastes affect doshas?"
      ]
    },
    {
      category: "Recipe Ideas",
      icon: <Sparkles className="h-5 w-5" />,
      color: "bg-orange-100 text-orange-800",
      questions: [
        "Give me a simple recipe for kitchari.",
        "How do you make CCF (Cumin, Coriander, Fennel) tea?",
        "What's a good Vata-pacifying soup recipe?",
        "How to prepare Triphala properly?"
      ]
    }
  ];

  const handleExampleClick = (question: string) => {
    // This would trigger the chatbot to process the question
    // For now, we'll just open the chat
    setIsChatOpen(true);
    setIsMinimized(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate(-1)}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold font-['Playfair_Display'] flex items-center space-x-2">
                    <span>AyurBot</span>
                    <Sparkles className="h-5 w-5 text-yellow-500" />
                  </h1>
                  <p className="text-muted-foreground">Your AI Ayurvedic Assistant</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="flex items-center space-x-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{isChatOpen ? 'Hide Chat' : 'Show Chat'}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-['Playfair_Display'] text-green-800">
                Welcome to AyurBot - Your AI Ayurvedic Companion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-lg text-green-700">
                  Get instant, intelligent answers to your Ayurvedic questions using advanced AI technology.
                </p>
                
                <div className="flex justify-center space-x-8 mt-6">
                  <div className="flex items-center space-x-2 text-green-600">
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">Text Chat</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Mic className="h-5 w-5" />
                    <span className="font-medium">Voice Input</span>
                  </div>
                  <div className="flex items-center space-x-2 text-purple-600">
                    <Volume2 className="h-5 w-5" />
                    <span className="font-medium">Audio Responses</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Capabilities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-primary" />
                  <span>What AyurBot Can Do</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Instant Food & Herb Analysis</p>
                      <p className="text-sm text-muted-foreground">Get detailed Ayurvedic properties, benefits, and contraindications</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Personalized Meal Suggestions</p>
                      <p className="text-sm text-muted-foreground">Dosha-specific breakfast, lunch, and dinner recommendations</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Concept Explanations</p>
                      <p className="text-sm text-muted-foreground">Simple explanations of complex Ayurvedic principles for patients</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Recipe & Preparation Tips</p>
                      <p className="text-sm text-muted-foreground">Traditional recipes and modern preparation methods</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* How to Use */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>How to Use AyurBot</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <p className="font-medium">Ask Your Question</p>
                      <p className="text-sm text-muted-foreground">Type or speak your Ayurvedic query in natural language</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <p className="font-medium">Get Instant Answers</p>
                      <p className="text-sm text-muted-foreground">Receive detailed, evidence-based Ayurvedic information</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <p className="font-medium">Listen to Responses</p>
                      <p className="text-sm text-muted-foreground">Use the speaker icon to hear answers read aloud</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <p className="font-medium">Apply in Practice</p>
                      <p className="text-sm text-muted-foreground">Use insights for patient consultations and treatment planning</p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Example Questions */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-['Playfair_Display'] text-center">
              Try These Example Questions
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {exampleQuestions.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className={`flex items-center space-x-2 ${category.color} rounded-lg p-3`}>
                      {category.icon}
                      <span>{category.category}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {category.questions.map((question, qIndex) => (
                        <button
                          key={qIndex}
                          onClick={() => handleExampleClick(question)}
                          className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all text-sm"
                        >
                          "{question}"
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Security Notice */}
          <Card className="mt-8 bg-yellow-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
                  <p className="text-sm text-yellow-700">
                    AyurBot is designed as an educational and reference tool. It provides information based on traditional Ayurvedic knowledge and should not replace professional medical diagnosis or treatment. Always use your clinical judgment and consult classical texts when making treatment decisions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AyurBot Chat Component */}
      <AyurBot 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        isMinimized={isMinimized}
        onToggleMinimize={() => setIsMinimized(!isMinimized)}
      />
    </div>
  );
}