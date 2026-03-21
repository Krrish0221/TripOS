"use server";

export async function generateTravelGuide(location: string) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("API key is missing.");
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // Powerful model for excellent travel reasoning
        messages: [
          {
            role: "system",
            content: "You are an expert, local travel concierge. When a user provides a destination, reply with exactly three bullet points of the top must-do activities or hidden gems there. Keep each bullet point short, exciting, and under 15 words. Do not include any introductory or concluding text, only the bullet points."
          },
          {
            role: "user",
            content: `Give me 3 highlights for ${location}.`
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Groq API Error:", errorData);
      throw new Error("Failed to generate AI insights.");
    }

    const data = await response.json();
    return data.choices[0].message.content as string;
  } catch (error) {
    console.error("Server Action Error:", error);
    throw new Error("Server error while generating insights.");
  }
}
