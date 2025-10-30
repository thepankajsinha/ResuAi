import fs from "fs";
import pdf from "pdf-extraction";
import mammoth from "mammoth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import RESUME_ANALYSIS_PROMPT from "../resumeAnalysisPrompt.js";
import RESUME_JOB_MATCH_PROMPT from "../resumeJobMatchingPrompt.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

// ✅ Helper: extract text from PDF or DOCX
const extractTextFromFile = async (filePath) => {
  const buffer = fs.readFileSync(filePath);

  if (filePath.endsWith(".pdf")) {
    const data = await pdf(buffer);
    return data.text;
  } else if (filePath.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } else {
    throw new Error("Unsupported file format. Only PDF or DOCX allowed.");
  }
};

// ✅ Resume Analysis Controller
export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a resume file" });
    }

    const resumeText = await extractTextFromFile(req.file.path);

    const prompt = RESUME_ANALYSIS_PROMPT.replace(
      "{{RESUME_TEXT}}",
      resumeText
    );
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    let suggestions;
    try {
      suggestions = JSON.parse(responseText);
    } catch {
      const match = responseText.match(/\{[\s\S]*\}/);
      suggestions = match ? JSON.parse(match[0]) : { raw: responseText };
    }

    fs.unlink(req.file.path, (err) => {
      if (err) console.warn("⚠️ File cleanup failed:", err.message);
    });

    res.status(200).json({ suggestions });
  } catch (error) {
    console.error("❌ Error in analyzeResume:", error.message);
    res.status(500).json({
      message: "Error analyzing resume",
      error: error.message,
    });
  }
};





// ✅ Job Matching Controller
export const matchJob = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a resume file" });
    }

    const { jobDescriptionText } = req.body;
    if (!jobDescriptionText?.trim()) {
      return res
        .status(400)
        .json({ message: "Please provide a job description text" });
    }

    const resumeText = await extractTextFromFile(req.file.path);
    const prompt = RESUME_JOB_MATCH_PROMPT.replace(
      "{{RESUME_TEXT}}",
      resumeText
    ).replace("{{JOB_DESCRIPTION}}", jobDescriptionText);

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    let analysis;
    try {
      analysis = JSON.parse(responseText);
    } catch {
      const match = responseText.match(/\{[\s\S]*\}/);
      analysis = match ? JSON.parse(match[0]) : { raw: responseText };
    }

    fs.unlink(req.file.path, (err) => {
      if (err) console.warn("⚠️ File cleanup failed:", err.message);
    });

    res.status(200).json({ analysis });
  } catch (error) {
    console.error("❌ Error in matchJob:", error.message);
    res.status(500).json({
      message: "Error matching job",
      error: error.message,
    });
  }
};
