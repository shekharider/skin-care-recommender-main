const axios = require("axios");

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";

if (!process.env.GROQ_API_KEY) {
  console.warn("GROQ_API_KEY is not configured. Add it to backend/.env.");
}

exports.callLLM = async (messages) => {
  if (!GROQ_API_KEY) {
    throw new Error("Groq API key not configured. Set GROQ_API_KEY in your environment.");
  }

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: GROQ_MODEL,
        messages,
        temperature: 0.25,
        max_tokens: 250,
        top_p: 0.9,
        n: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data?.choices?.[0]?.message?.content;
    if (!reply) {
      throw new Error("Empty response from LLM");
    }

    return reply.trim();
  } catch (error) {
    const status = error.response?.status;
    const detail = error.response?.data?.error?.message || error.code || error.message;
    throw new Error(`Groq request failed${status ? ` with status ${status}` : ""}: ${detail}`);
  }
};
