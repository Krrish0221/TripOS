"use server";

export async function generateTravelGuide(location: string, theme: string = "general highlights") {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return "API key missing. • Add an API key directly in .env.local • Restart the development server.";
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are an expert travel concierge specializing in ${theme}. Provide exactly three bullet points of the top must-do activities or hidden gems for a traveler interested in ${theme}. Keep each bullet point short, exciting, and under 15 words. Do not include any introductory or concluding text.`
          },
          {
            role: "user",
            content: `Give me 3 ${theme} highlights for ${location}.`
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Groq Guide Error:", errText);
      return "Servers are crowded right now. • Please wait 60 seconds • Try searching again! • (Rate Limit Reached)";
    }

    const data = await response.json();
    return data.choices[0].message.content as string;
  } catch (error) {
    console.error("Server Action Guide Error:", error);
    return "Failed to connect to AI server. Please check your internet connection and try again.";
  }
}

export async function generateTransitEstimates(origin: string, destination: string) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: "You are a routing estimator. The user will provide an origin and destination. You MUST output a JSON object containing exactly three keys: 'flight', 'train', and 'road'. Each key must map to an object with 'time' (string) and 'cost' (string) properties giving rough travel time and cost estimates for that route. Output ONLY valid JSON."
          },
          {
            role: "user",
            content: `Estimate routing from ${origin} to ${destination}.`
          }
        ],
        temperature: 0.1,
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Transit Error:", errText);
      return null;
    }
    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (e) {
    console.error("Transit Parse Error:", e);
    return null;
  }
}

export async function generateTopSpots(destination: string) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return [];

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: "You are a trip planner. The user will provide a destination. Output a JSON object containing a 'spots' array. Each item in the array must be an object with three string properties: 'title' (name of place), 'time' (e.g. '2 Hours'), and 'desc' (a short 4-word description). Provide exactly 4 highly distinct spots. Output ONLY valid JSON."
          },
          {
            role: "user",
            content: `Give me 4 top spots for ${destination}.`
          }
        ],
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Spots API Error:", errText);
      return [];
    }
    const data = await response.json();
    return JSON.parse(data.choices[0].message.content).spots || [];
  } catch (e) {
    console.error("Spots Parse Error:", e);
    return [];
  }
}

