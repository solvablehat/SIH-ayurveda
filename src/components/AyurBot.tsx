import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

// Type declarations for Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Bot, 
  User, 
  Sparkles,
  Loader2,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { geminiChatService } from '@/services/chatGemini';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
  selectedQuestion?: string;
  onQuestionProcessed?: () => void;
  isFullScreen?: boolean;
}

export default function AyurBot({ 
  isOpen, 
  onClose, 
  isMinimized, 
  onToggleMinimize,
  selectedQuestion = '',
  onQuestionProcessed,
  isFullScreen = false
}: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setCurrentMessage(transcript);
        setIsListening(false);
      };
      
      recognitionInstance.onerror = () => {
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }

    // Add welcome message
    if (messages.length === 0) {
      addWelcomeMessage();
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle selected question from AyurBot page
  useEffect(() => {
    if (selectedQuestion && selectedQuestion !== currentMessage) {
      setCurrentMessage(selectedQuestion);
      if (onQuestionProcessed) {
        onQuestionProcessed();
      }
    }
  }, [selectedQuestion, currentMessage, onQuestionProcessed]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addWelcomeMessage = () => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content: `Hello! I am **AyurBot**, your AI assistant for Ayurvedic wisdom. 🌿

I can help you quickly find information and generate ideas. You can ask me questions in plain language.

Here are a few examples of what you can ask:

🔎 **Quick Food & Herb Lookups**
• "What are the Ayurvedic properties of turmeric?"
• "Tell me the Rasa, Virya, and Vipaka of moong dal."
• "Is ginger good for a Kapha imbalance?"

💡 **Meal & Ingredient Suggestions**
• "Suggest a cooling breakfast for a Pitta type."
• "What are some good vegetables for reducing Vata?"
• "Give me three dinner ideas for a Kapha-pacifying diet."

📚 **Concept Explanations**
• "Explain the concept of 'Agni' in simple terms for a patient."
• "What is the difference between Prakriti and Vikriti?"
• "Summarize the daily routine (Dinacharya)."

🍲 **Recipe Ideas**
• "Give me a simple recipe for kitchari."
• "How do you make CCF (Cumin, Coriander, Fennel) tea?"

Feel free to ask me anything about Ayurveda! You can type or use the microphone to speak your questions.`,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  };

  const sendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      // Call the real Gemini API through our service
      const response = await geminiChatService.sendMessage(currentMessage);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateGeminiResponse = async (message: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple pattern matching for demo - in real app, this would be Gemini API
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('turmeric')) {
      return `**Turmeric (Haridra)** is one of the most revered herbs in Ayurveda! 🌟

**Ayurvedic Properties:**
• **Rasa (Taste):** Bitter, Pungent
• **Virya (Energy):** Heating
• **Vipaka (Post-digestive effect):** Pungent
• **Gunas (Qualities):** Light, Dry, Sharp

**Dosha Effects:**
• **Vata:** Neutral to slightly aggravating in excess
• **Pitta:** Can aggravate if used excessively
• **Kapha:** Highly beneficial - reduces Kapha

**Benefits:**
• Natural antibiotic and anti-inflammatory
• Supports immunity and liver function
• Helps with skin conditions and wound healing
• Aids digestion when used appropriately

**Usage Tips:**
• Use with black pepper for better absorption
• Add to warm milk for immunity
• Best used in cooking rather than raw
• Avoid excessive amounts if you have high Pitta`;
    }
    
    if (lowerMessage.includes('vata') && lowerMessage.includes('breakfast')) {
      return `Here are some **Vata-pacifying breakfast ideas** that are warm, grounding, and nourishing:

🥣 **Warm Porridge Options:**
• **Oats with ghee, cinnamon, and dates** - deeply nourishing
• **Rice pudding with cardamom and almonds** - easy to digest
• **Quinoa porridge with warm spices** - protein-rich option

🍳 **Warm & Substantial:**
• **Scrambled eggs with turmeric and ghee** - grounding protein
• **Warm milk with soaked almonds** - brain tonic
• **Kitchari with extra ghee** - complete meal

🌿 **Preparation Tips:**
• Always eat warm, never cold foods
• Add healthy fats like ghee or coconut oil
• Include sweet, sour, and salty tastes
• Eat in a calm environment
• Add warming spices like ginger, cinnamon, cardamom

**Avoid:** Cold cereals, raw fruits, ice-cold drinks, or skipping breakfast entirely.

Would you like a specific recipe for any of these options?`;
    }
    
    if (lowerMessage.includes('agni')) {
      return `**Agni** is one of the most fundamental concepts in Ayurveda! 🔥

**Simple Explanation:**
Agni literally means "fire" and represents your digestive fire - not just stomach digestion, but your body's ability to process and transform everything: food, experiences, emotions, and thoughts.

**The Four Types of Agni:**
• **Sama Agni** (Balanced) - Perfect digestion, good health
• **Vishama Agni** (Irregular) - Variable digestion, Vata imbalance
• **Tikshna Agni** (Sharp) - Too strong, burns through food quickly, Pitta excess
• **Manda Agni** (Slow) - Weak digestion, heaviness after eating, Kapha excess

**Signs of Strong Agni:**
• Regular appetite and elimination
• Energy after meals (not drowsiness)
• Clear skin and bright eyes
• Emotional stability and mental clarity

**How to Strengthen Agni:**
• Eat when truly hungry
• Sip warm water during meals
• Use digestive spices (ginger, cumin, fennel)
• Avoid overeating or eating too fast
• Practice mindful eating

**Patient Education Tip:** "Think of Agni as your inner campfire - it needs the right fuel, proper timing, and shouldn't be overwhelmed or neglected!"`;
    }
    
    return `Thank you for your question about "${message}". As AyurBot, I'd be happy to help with Ayurvedic guidance!

However, I'm currently in demo mode. In the full implementation, I would:
• Analyze your question using advanced AI
• Provide detailed Ayurvedic insights
• Reference classical texts and modern applications
• Offer practical recommendations

For now, try asking about:
• Specific herbs or foods (like "turmeric properties")  
• Dosha-specific meal ideas (like "Vata breakfast suggestions")
• Ayurvedic concepts (like "explain Agni")

Would you like to try one of these examples?`;
  };

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const speakMessage = (text: string) => {
    if (speechSynthesis) {
      // Stop any current speech
      speechSynthesis.cancel();
      
      // Clean the text (remove markdown)
      const cleanText = text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/•/g, '');
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('**') && line.endsWith('**')) {
          return <h4 key={index} className="font-semibold text-primary mt-3 mb-1">{line.slice(2, -2)}</h4>;
        }
        if (line.startsWith('• ')) {
          return <li key={index} className="ml-4 mb-1">{line.slice(2)}</li>;
        }
        if (line.includes('**')) {
          const parts = line.split('**');
          return (
            <p key={index} className="mb-2">
              {parts.map((part, i) => 
                i % 2 === 1 ? <strong key={i} className="font-semibold">{part}</strong> : part
              )}
            </p>
          );
        }
        return line ? <p key={index} className="mb-2">{line}</p> : <br key={index} />;
      });
  };

  if (!isOpen) return null;

  if (isFullScreen) {
    return (
      <div className="h-full w-full flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.type === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.type === 'bot' && (
                <div className="p-2 bg-primary rounded-full self-start">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              
              <div
                className={cn(
                  "max-w-[80%] rounded-lg p-3 text-sm",
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground ml-12'
                    : 'bg-muted'
                )}
              >
                {message.type === 'bot' ? (
                  <div className="space-y-1">
                    {formatMessage(message.content)}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => isSpeaking ? stopSpeaking() : speakMessage(message.content)}
                        className="h-6 w-6 p-0"
                      >
                        {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>{message.content}</p>
                    <span className="text-xs opacity-70 block mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                )}
              </div>
              
              {message.type === 'user' && (
                <div className="p-2 bg-primary rounded-full self-start">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className="p-2 bg-primary rounded-full">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="bg-muted rounded-lg p-3 flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">AyurBot is thinking...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask AyurBot anything about Ayurveda..."
                disabled={isLoading}
                className="pr-12"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={isListening ? stopListening : startListening}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                disabled={isLoading}
              >
                {isListening ? (
                  <MicOff className="h-4 w-4 text-red-500" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            <Button 
              onClick={sendMessage} 
              disabled={!currentMessage.trim() || isLoading}
              size="sm"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {isListening && (
            <div className="mt-2 flex items-center justify-center">
              <Badge variant="secondary" className="animate-pulse">
                <Mic className="h-3 w-3 mr-1" />
                Listening...
              </Badge>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-50 transition-all duration-300",
      isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
    )}>
      <Card className="h-full shadow-2xl border-2 border-primary/20">
        {/* Header - Hide in full screen mode */}
        {!isFullScreen && (
          <CardHeader className="pb-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary rounded-full">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <span>AyurBot</span>
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {isLoading ? 'AyurBot is thinking...' : 'Your AI Ayurvedic Assistant'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleMinimize}
                  className="h-8 w-8 p-0"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        )}

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className={cn(
              "flex-1 overflow-y-auto p-4 space-y-4",
              isFullScreen ? "h-[calc(100vh-8rem)]" : "h-[400px]"
            )}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.type === 'bot' && (
                    <div className="p-2 bg-primary rounded-full self-start">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3 text-sm",
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground ml-12'
                        : 'bg-muted'
                    )}
                  >
                    {message.type === 'bot' ? (
                      <div className="space-y-1">
                        {formatMessage(message.content)}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => isSpeaking ? stopSpeaking() : speakMessage(message.content)}
                            className="h-6 w-6 p-0"
                          >
                            {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p>{message.content}</p>
                        <span className="text-xs opacity-70 block mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {message.type === 'user' && (
                    <div className="p-2 bg-primary rounded-full self-start">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3">
                  <div className="p-2 bg-primary rounded-full">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted rounded-lg p-3 flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">AyurBot is thinking...</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask AyurBot anything about Ayurveda..."
                    disabled={isLoading}
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={isListening ? stopListening : startListening}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    disabled={isLoading}
                  >
                    {isListening ? (
                      <MicOff className="h-4 w-4 text-red-500" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                <Button 
                  onClick={sendMessage} 
                  disabled={!currentMessage.trim() || isLoading}
                  size="sm"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {isListening && (
                <div className="mt-2 flex items-center justify-center">
                  <Badge variant="secondary" className="animate-pulse">
                    <Mic className="h-3 w-3 mr-1" />
                    Listening...
                  </Badge>
                </div>
              )}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}