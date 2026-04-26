const llmService = require("../services/llm.service");

const SKINCARE_KEYWORDS = [
  "skin", "acne", "moisturizer", "sunscreen", "cleanser", "serum", "hydration",
  "pore", "oil", "dryness", "glow", "anti-aging", "dark spots", "tone",
  "redness", "blackheads", "fine lines", "wrinkle", "blemish", "pimple",
  "sensitive", "pigmentation", "sunburn", "exfoliate", "toner", "face mask",
  "routine", "dehydration", "spf", "dermatologist", "skin care", "skincare",
];

const isSkincareRelated = (text) => {
  const normalized = text.toLowerCase();
  return SKINCARE_KEYWORDS.some((keyword) => normalized.includes(keyword));
};

const buildSystemPrompt = () => {
  return `You are a professional skincare assistant. Strict rules:
1. Only answer skincare-related questions.
2. If the question is not related to skincare, reply: "Out of scope. Please ask skincare-related questions."
3. Do not give medical, legal, or harmful advice.
4. Keep answers short, practical, and friendly.
5. If possible, respond in this format:\nProblem: ...\nSolution: ...\nSuggested Products: ...\nMake the answer concise and helpful.`;
};

exports.chat = async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ message: "Message is required" });
    }

    const userMessage = message.trim();

    if (!isSkincareRelated(userMessage)) {
      return res.status(200).json({ reply: "Out of scope. Please ask skincare-related questions." });
    }

    const validHistory = Array.isArray(history)
      ? history
          .filter((item) =>
            item &&
            (item.role === "user" || item.role === "assistant") &&
            typeof item.content === "string"
          )
          .slice(-8)
      : [];

    const messages = [
      { role: "system", content: buildSystemPrompt() },
      ...validHistory,
      { role: "user", content: userMessage },
    ];

    const reply = await llmService.callLLM(messages);
    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Chat error:", error.message || error);
    return res.status(500).json({ message: "Failed to get chat response" });
  }
};
