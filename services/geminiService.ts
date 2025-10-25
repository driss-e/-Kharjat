
import { GoogleGenAI, Type } from '@google/genai';

// Initialize GoogleGenAI with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.STRING,
            description: "A catchy and appealing title for the event, in French.",
        },
        description: {
            type: Type.STRING,
            description: "A detailed and engaging description for the event, in French. It should be inviting and provide a good overview of what to expect.",
        },
    },
    required: ["title", "description"],
};

export const generateActivityDetails = async (prompt: string): Promise<{ title: string; description: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `À partir de l'idée de sortie suivante : "${prompt}", génère un titre accrocheur et une description détaillée et attrayante en français. La description doit être chaleureuse et donner un bon aperçu de ce à quoi s'attendre.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });
    
    const jsonText = response.text.trim();
    // Basic cleanup in case of markdown formatting
    const cleanedJsonText = jsonText.replace(/^```json\n/, '').replace(/\n```$/, '');
    
    const parsed = JSON.parse(cleanedJsonText);

    if (parsed.title && parsed.description) {
        return parsed;
    } else {
        throw new Error("Invalid JSON structure from Gemini API");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate activity details with AI.");
  }
};
