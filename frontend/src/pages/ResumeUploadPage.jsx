import React, { useState } from "react";
import { UploadCloud, FileText, Loader2 } from "lucide-react";
import { useResume } from "../context/ResumeContext.jsx";
import { useNavigate } from "react-router-dom";

const ResumeUploadPage = () => {
  const [file, setFile] = useState(null);
  const { analyzeResume, loading } = useResume();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
    } else {
      alert("Please upload a valid PDF file!");
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file first!");
      return;
    }

    const result = await analyzeResume(file); // analyze via context
    if (result) {
      // ✅ Navigate to result page and pass data
      navigate("/resume/analysis/result", { state: { analysis: result } });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white py-12 px-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
          Upload Your <span className="text-blue-600">Resume</span>
        </h2>
        <p className="text-gray-600 mb-8">
          Upload your PDF resume to get instant AI-powered analysis and
          feedback.
        </p>

        <div className="border-2 border-dashed border-blue-400 rounded-xl p-10 bg-blue-50 hover:bg-blue-100 transition">
          <label className="cursor-pointer flex flex-col items-center space-y-3">
            <UploadCloud className="text-blue-500" size={48} />
            <span className="text-blue-700 font-semibold">
              Click to upload or drag and drop
            </span>
            <span className="text-sm text-gray-500">
              Only PDF files supported
            </span>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {file && (
          <div className="mt-6 flex items-center justify-center space-x-2 text-gray-700">
            <FileText size={20} className="text-blue-600" />
            <span>{file.name}</span>
          </div>
        )}

        <button
          onClick={handleUpload}
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
            <>
              Upload & Analyze
            </>
          )}
        </button>
      </div>
    </section>
  );
};

export default ResumeUploadPage;
