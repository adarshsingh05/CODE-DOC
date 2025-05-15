// utils/cohere.js
const axios = require("axios");

const generateDocumentation = async (code) => {
  try {
    const response = await axios.post(
      "https://api.cohere.ai/v1/generate",
      {
        model: "command-r-plus", // or "command-nightly"
        prompt: `Generate clean and understandable developer documentation for this code:\n\n${code}`,
        max_tokens: 500,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer fWBazeGEnCWHyjwUJUceckxRQuYXG1A2ec6z6O2E`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.generations?.[0]?.text?.trim() || "No documentation generated.";
  } catch (err) {
    console.error("Cohere API error:", err.message);
    return "Error generating documentation.";
  }
};

module.exports = { generateDocumentation };
