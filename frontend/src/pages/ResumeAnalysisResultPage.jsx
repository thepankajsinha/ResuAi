import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Brain,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

const ResumeAnalysisResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const analysis = location.state?.analysis;

  const data = analysis;

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-10 border border-gray-100 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-700 transition mb-8"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">
            <Brain size={18} />
            AI-Powered Resume Analysis
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 mt-4">
            Your Resume Insights
          </h1>
        </div>

        {/* ATS Score */}
        <div className="text-center mb-12">
          <div className="inline-flex flex-col items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6 rounded-2xl shadow-lg">
            <Star size={28} className="mb-2 text-yellow-300" />
            <span className="text-5xl font-bold">{data.ats_score}/10</span>
            <span className="text-sm uppercase tracking-wide font-medium opacity-90">
              ATS Score
            </span>
          </div>

          <ul className="mt-6 text-gray-600 text-sm list-disc list-inside max-w-lg mx-auto text-left">
            {data.ats_reasons.map((reason, i) => (
              <li key={i}>{reason}</li>
            ))}
          </ul>
        </div>

        {/* Summary */}
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl mb-10 shadow-sm">
          <h2 className="text-2xl font-semibold text-blue-700 mb-3 flex items-center gap-2">
            <Brain size={22} />
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>

        {/* Strengths and Weaknesses */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 bg-green-50 border border-green-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center gap-2">
              <CheckCircle size={22} />
              Strengths
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {data.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 bg-red-50 border border-red-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-red-700 mb-3 flex items-center gap-2">
              <AlertTriangle size={22} />
              Weaknesses
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {data.weaknesses.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Suggestions */}
        <div className="p-6 bg-gradient-to-b from-blue-50 to-white border border-blue-100 rounded-2xl shadow-sm">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
            <Lightbulb size={22} />
            Suggestions for Improvement
          </h3>

          <div className="space-y-5">
            <div>
              <h4 className="font-semibold text-red-600 mb-2">High Impact</h4>
              <ul className="list-disc list-inside text-gray-700">
                {data.suggestions.high.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-yellow-600 mb-2">
                Medium Impact
              </h4>
              <ul className="list-disc list-inside text-gray-700">
                {data.suggestions.medium.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-green-600 mb-2">Optional</h4>
              <ul className="list-disc list-inside text-gray-700">
                {data.suggestions.optional.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeAnalysisResultPage;
