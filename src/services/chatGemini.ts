interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

interface ChatMessage {
  role: 'user' | 'model';
  parts: Array<{
    text: string;
  }>;
}

class GeminiChatService {
  private apiKey: string;
  private baseUrl: string = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
  private conversationHistory: ChatMessage[] = [];

  constructor() {
    this.apiKey = 'AIzaSyBRYoT7jvBAJcxhRmeQUCGw6e_czs0Mn8o';
    if (!this.apiKey) {
      console.error('GEMINI_API_KEY not found in environment variables');
    }
    this.initializeSystemPrompt();
  }

  private initializeSystemPrompt() {
    const systemPrompt = `You are "AyurBot," the AI assistant integrated into Vitarva - a comprehensive Ayurvedic practice management application. You are designed to assist Ayurvedic practitioners and doctors with their clinical work.

**Your Identity & Role:**
- You are AyurBot, part of the Vitarva ecosystem
- You serve as an intelligent assistant for qualified Ayurvedic practitioners
- Your knowledge is based on classical Ayurvedic texts (Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya) and modern clinical applications
- You maintain a professional, knowledgeable, and supportive tone

**Core Capabilities:**
1. **Food & Herb Analysis**: Provide detailed Ayurvedic properties (Rasa, Virya, Vipaka, Gunas) for any food item or herb
2. **Dosha-Specific Recommendations**: Suggest meals, lifestyle practices, and therapeutic approaches based on constitutional types
3. **Concept Explanations**: Explain complex Ayurvedic principles in simple, patient-friendly language
4. **Recipe & Preparation Guidance**: Traditional recipes and modern preparation methods
5. **Clinical Support**: Help with treatment planning and patient education

**Response Guidelines:**
- Always provide evidence-based Ayurvedic information
- Include practical applications for clinical practice
- Use clear formatting with headers, bullet points, and emojis for readability
- Reference classical principles when appropriate
- Provide contraindications and precautions
- Frame answers for professional healthcare providers

**Response Format:**
You MUST always respond in JSON format with this exact structure:

For regular Ayurvedic questions:
{
  "dataNeeded": false,
  "message": "Your detailed Ayurvedic response here with all formatting and information"
}

For patient-specific queries where you need patient data:
{
  "dataNeeded": true,
  "message": "Requesting patient data",
  "searchBy": "name|phone|email|id",
  "value": "EXACT_VALUE_TO_SEARCH"
}

Examples:
- User asks about turmeric → {"dataNeeded": false, "message": "**Turmeric (Haridra)** is one of the most revered herbs..."}
- User asks "Tell me about Mohammed Yaseen Agha" → {"dataNeeded": true, "message": "Requesting patient data", "searchBy": "name", "value": "Mohammed Yaseen Agha"}
- User asks "Show patient +91-9876543210" → {"dataNeeded": true, "message": "Requesting patient data", "searchBy": "phone", "value": "+91-9876543210"}

Never provide responses outside this JSON structure.

**Important Disclaimers:**
- You provide educational information, not medical diagnoses
- Always remind practitioners to use their clinical judgment
- Encourage consultation with classical texts for complex cases
- Emphasize the importance of individualized treatment

**Formatting Style:**
Use markdown-style formatting:
- **Bold** for headings and important terms
- • Bullet points for lists
- Include relevant emojis (🌿 for herbs, 🔥 for Agni, etc.)
- Structure responses clearly with sections

Remember: You are integrated into Vitarva, helping practitioners provide better patient care through instant access to Ayurvedic knowledge.`;

    // Add system prompt to conversation history
    this.conversationHistory = [{
      role: 'model',
      parts: [{ text: systemPrompt }]
    }];
  }

  async sendMessage(userMessage: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Gemini API key not configured');
    }

    try {
      // Add user message to conversation history
      this.conversationHistory.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });

      const requestBody = {
        contents: this.conversationHistory,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              dataNeeded: {
                type: "boolean"
              },
              message: {
                type: "string"
              },
              searchBy: {
                type: "string"
              },
              value: {
                type: "string"
              }
            },
            required: ["dataNeeded", "message"]
          }
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data: GeminiResponse = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No response generated from Gemini API');
      }

      const aiResponseText = data.candidates[0].content.parts[0].text;
      
      try {
        // Parse the structured JSON response
        const aiResponse = JSON.parse(aiResponseText);
        
        // Check if this is a data request - if so, handle it silently
        if (aiResponse.dataNeeded === true) {
          const patientData = await this.handleDataRequest(aiResponseText);
          if (patientData) {
            // Send patient data back to Gemini for analysis and return the final response
            return await this.sendMessageWithPatientData(userMessage, patientData);
          }
          // If data handling failed, fall back to error message
          return this.getErrorResponse('Data Retrieval Error', 
            'I encountered an issue while retrieving patient information. Please try again.');
        }
        
        // Regular response - return the message content
        const responseMessage = aiResponse.message || aiResponseText;
        
        // Add AI response to conversation history
        this.conversationHistory.push({
          role: 'model',
          parts: [{ text: responseMessage }]
        });

        // Keep conversation history manageable (last 10 exchanges)
        if (this.conversationHistory.length > 21) { // 1 system + 20 exchanges
          this.conversationHistory = [
            this.conversationHistory[0], // Keep system prompt
            ...this.conversationHistory.slice(-20) // Keep last 20 messages
          ];
        }

        return this.formatResponse(responseMessage);
        
      } catch (parseError) {
        console.error('Error parsing structured response:', parseError);
        // Fallback to treating as plain text
        const responseMessage = aiResponseText;
        
        this.conversationHistory.push({
          role: 'model',
          parts: [{ text: responseMessage }]
        });

        return this.formatResponse(responseMessage);
      }
      
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      
      // Provide helpful error messages based on error type
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          return this.getErrorResponse('API Configuration Error', 
            'There seems to be an issue with the API configuration. Please contact your system administrator.');
        }
        if (error.message.includes('quota') || error.message.includes('limit')) {
          return this.getErrorResponse('Service Temporarily Unavailable', 
            'The AI service is currently experiencing high demand. Please try again in a few moments.');
        }
        if (error.message.includes('network') || error.message.includes('fetch')) {
          return this.getErrorResponse('Connection Error', 
            'Unable to connect to the AI service. Please check your internet connection and try again.');
        }
      }
      
      return this.getErrorResponse('Temporary Issue', 
        'I\'m experiencing a temporary issue. Please try rephrasing your question or try again in a moment.');
    }
  }

  private formatResponse(response: string): string {
    // Ensure the response includes Vitarva branding and AyurBot identity
    let formattedResponse = response;
    
    // Add AyurBot signature to longer responses
    if (response.length > 200 && !response.includes('AyurBot') && !response.includes('Vitarva')) {
      formattedResponse += '\n\n---\n*Powered by AyurBot in Vitarva - Your Ayurvedic Practice Management System* 🌿';
    }
    
    return formattedResponse;
  }

  private getErrorResponse(errorType: string, message: string): string {
    return `**${errorType}** 

${message}

**Alternative Options:**
• Try asking a more specific question
• Check the example questions in the AyurBot interface
• Consult the Vitarva Food Library for immediate food/herb information

**Common Topics I Can Help With:**
• Ayurvedic properties of foods and herbs
• Dosha-specific meal planning
• Classical Ayurvedic concepts explanation
• Traditional recipes and preparation methods

---
*AyurBot in Vitarva - Ayurvedic Practice Management* 🌿`;
  }

  // Method to clear conversation history (useful for new sessions)
  clearHistory(): void {
    this.initializeSystemPrompt();
  }

  // Method to get conversation summary
  getConversationLength(): number {
    return this.conversationHistory.length - 1; // Exclude system prompt
  }

  // Method to check if API is configured
  isConfigured(): boolean {
    return !!this.apiKey;
  }

  // Strip code formatting from responses
  private stripCodeFormatting(response: string): string {
    let cleaned = response.trim();
    
    // Remove ```json formatting
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } 
    // Remove generic ``` formatting
    else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    
    return cleaned.trim();
  }

  // Check if response is a data request
  private isDataRequest(response: string): boolean {
    try {
      const parsed = JSON.parse(response.trim());
      return parsed.dataNeeded === true && parsed.searchBy && parsed.value;
    } catch {
      return false;
    }
  }

  // Handle patient data request
  private async handleDataRequest(response: string): Promise<any> {
    try {
      const dataRequest = JSON.parse(response.trim());
      const { searchBy, value } = dataRequest;

      // First try to find specific patient
      const patientData = await this.fetchPatientData(searchBy, value);
      
      if (patientData) {
        return patientData;
      } else {
        // If no patient found, get all patients' basic info
        const allPatients = await this.fetchAllPatientsBasic();
        return {
          error: "Patient not found",
          availablePatients: allPatients,
          searchedFor: { searchBy, value }
        };
      }
    } catch (error) {
      console.error('Error handling data request:', error);
      return null;
    }
  }

  // Fetch specific patient data
  private async fetchPatientData(searchBy: string, value: string): Promise<any> {
    try {
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      
      if (searchBy === 'id') {
        const response = await fetch(`${baseUrl}/patient/${value}`);
        if (response.ok) {
          const data = await response.json();
          return data.patient;
        }
      } else {
        // For name, phone, email - get all patients and filter
        const response = await fetch(`${baseUrl}/patients`);
        if (response.ok) {
          const data = await response.json();
          const patients = data.patients || [];
          
          const patient = patients.find((p: any) => {
            switch (searchBy) {
              case 'name':
                return p.name?.toLowerCase().includes(value.toLowerCase());
              case 'phone':
                return p.phone === value;
              case 'email':
                return p.email?.toLowerCase() === value.toLowerCase();
              default:
                return false;
            }
          });
          
          return patient || null;
        }
      }
      return null;
    } catch (error) {
      console.error('Error fetching patient data:', error);
      return null;
    }
  }

  // Fetch all patients' basic info
  private async fetchAllPatientsBasic(): Promise<any[]> {
    try {
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const response = await fetch(`${baseUrl}/patients/basic`);
      if (response.ok) {
        const data = await response.json();
        return data.patients || [];
      }
      return [];
    } catch (error) {
      console.error('Error fetching all patients basic info:', error);
      return [];
    }
  }

  // Send message with patient data for analysis
  private async sendMessageWithPatientData(originalMessage: string, patientData: any): Promise<string> {
    try {
      let contextMessage: string;
      
      if (patientData.error) {
        // Patient not found - provide available patients
        contextMessage = `The patient you asked about was not found. Here are the available patients in the system: ${JSON.stringify(patientData.availablePatients, null, 2)}. Please let the user know which patient they were looking for and suggest alternatives from the available patients.`;
      } else {
        // Patient found - provide data
        contextMessage = `Here is the patient data for your analysis: ${JSON.stringify(patientData, null, 2)}. Please provide a comprehensive analysis of this patient based on their Ayurvedic profile, medical history, and current status. Focus on their dosha constitution, current conditions, medications, and provide relevant recommendations.`;
      }

      // Remove the data request from conversation history and add the context
      this.conversationHistory.push({
        role: 'user',
        parts: [{ text: contextMessage }]
      });

      // Make another API call with the patient data
      const requestBody = {
        contents: this.conversationHistory,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              dataNeeded: {
                type: "boolean"
              },
              message: {
                type: "string"
              }
            },
            required: ["dataNeeded", "message"]
          }
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      const finalResponseText = data.candidates[0].content.parts[0].text;

      try {
        // Parse structured response
        const finalResponse = JSON.parse(finalResponseText);
        const responseMessage = finalResponse.message || finalResponseText;

        // Add final response to conversation history
        this.conversationHistory.push({
          role: 'model',
          parts: [{ text: responseMessage }]
        });

        return this.formatResponse(responseMessage);
      } catch (parseError) {
        console.error('Error parsing final response:', parseError);
        // Fallback to plain text
        this.conversationHistory.push({
          role: 'model',
          parts: [{ text: finalResponseText }]
        });

        return this.formatResponse(finalResponseText);
      }
      
    } catch (error) {
      console.error('Error sending message with patient data:', error);
      return this.getErrorResponse('Data Analysis Error', 
        'I encountered an issue while analyzing the patient data. Please try your request again.');
    }
  }
}

// Create and export singleton instance
export const geminiChatService = new GeminiChatService();

// Export the class as well for testing purposes
export { GeminiChatService };