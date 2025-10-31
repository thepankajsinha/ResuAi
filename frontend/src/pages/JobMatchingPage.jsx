import React, { useState } from "react";
import { UploadCloud, FileText, Target, Loader2 } from "lucide-react";
import { useResume } from "../context/ResumeContext";

const JobMatchingPage = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobText, setJobText] = useState("");
  const { matchJob, loading } = useResume();

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
    } else {
      alert("Please upload a valid PDF file for your resume.");
      setResumeFile(null);
    }
  };

  const handleAnalyze = async () => {
    await matchJob(resumeFile, jobText);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white py-16 px-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
            Job <span className="text-blue-600">Matching</span> Analysis
          </h2>
          <p className="text-gray-600">
            Upload your resume and paste a job description to see how well you
            match the role.
          </p>
        </div>

        {/* Resume Upload */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <FileText className="text-blue-600" /> Upload Resume (PDF)
          </h3>
          <div className="border-2 border-dashed border-blue-400 rounded-xl p-6 bg-blue-50 hover:bg-blue-100 transition">
            <label className="cursor-pointer flex flex-col items-center space-y-3">
              <UploadCloud className="text-blue-500" size={40} />
              <span className="text-blue-700 font-semibold">
                Click to upload or drag and drop
              </span>
              <span className="text-sm text-gray-500">
                (Make sure file name ends with .pdf)
              </span>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleResumeChange}
                className="hidden"
              />
            </label>
          </div>
          {resumeFile && (
            <p className="mt-3 text-gray-700 flex items-center justify-center gap-2">
              <FileText className="text-blue-600" size={18} /> {resumeFile.name}
            </p>
          )}
        </div>

        {/* Job Description */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Target className="text-blue-600" /> Paste Job Description
          </h3>
          <textarea
            placeholder="Paste job description or target profile text here..."
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
            rows="6"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className={`mt-8 w-full py-3 font-semibold rounded-lg flex items-center justify-center gap-2 transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Analyzing...
            </>
          ) : (
            <>Analyse Match</>
          )}
        </button>
      </div>
    </section>
  );
};

export default JobMatchingPage;
