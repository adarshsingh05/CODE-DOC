// routes/docRoutes.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
const { generateDocumentation } = require("../utils/cohere.js");

router.post("/generate", async (req, res) => {
  const { repoUrl } = req.body;

  if (!repoUrl || typeof repoUrl !== "string") {
    return res.status(400).json({ error: "repoUrl is required and must be a string" });
  }

  try {
    const rawUrl = repoUrl
      .replace("github.com", "raw.githubusercontent.com")
      .replace("/blob/", "/");

    console.log("🔗 Raw GitHub URL:", rawUrl);

    const response = await axios.get(rawUrl);
    const fileContent = response.data;

    const generatedDoc = await generateDocumentation(fileContent);

    res.json({
      fileName: rawUrl.split("/").pop(),
      originalCode: fileContent,
      documentation: generatedDoc,
    });
  } catch (error) {
    console.error("🚨 Error fetching file:", error.message);
    res.status(500).json({ error: "Failed to process the repository URL." });
  }
});


module.exports = router;
