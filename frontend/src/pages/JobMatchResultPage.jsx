import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Target,
  ThumbsUp,
  AlertTriangle,
  Lightbulb,
  Star,
  PlusCircle,
  ListChecks,
  Briefcase,
} from "lucide-react";

export const JobMatchResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const matchData = location.state?.matchData;

  // Mock fallback for testing
  const mockMatchData = {
    summary:
      "The candidate shows a strong alignment with the frontend developer role, demonstrating proficiency in React, JavaScript, and responsive design. Minor improvements can further strengthen the match.",
    match_score: 82,
    key_alignments: [
      "Proficiency in React.js and modern frontend frameworks",
      "Strong understanding of responsive and accessible UI design",
      "Experience with RESTful APIs and version control tools",
    ],
    missing_keywords: [
      "TypeScript",
      "Unit testing frameworks (Jest, Mocha)",
      "Continuous integration tools",
    ],
    improvement_suggestions: {
      high: [
        "Add TypeScript experience to highlight technical adaptability",
        "Include measurable project outcomes (e.g., improved load time by X%)",
      ],
      medium: [
        "Mention experience with CI/CD pipelines",
        "Add testing tools to strengthen technical depth",
      ],
      optional: [
        "Highlight teamwork and collaboration examples",
        "Include a short professional summary headline",
      ],
    },
    recommendations: {
      summary_additions: [
        "Frontend Developer skilled in modern JavaScript frameworks and performance optimization.",
      ],
      skills_to_add: ["TypeScript", "Automated testing", "Agile methodologies"],
      project_ideas: [
        "Develop a portfolio project integrating React + TypeScript",
        "Implement automated unit testing for an existing project",
      ],
    },
  };

  const data = matchData || mockMatchData;

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-10 border border-gray-100 relative overflow-hidden">
        {/* Decorative Blur */}
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
            <Briefcase size={18} />
            AI-Powered Job Match Analysis
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 mt-4">
            Resume & Job Fit Report
          </h1>
        </div>

        {/* Match Score */}
        <div className="text-center mb-12">
          <div className="inline-flex flex-col items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6 rounded-2xl shadow-lg">
            <Target size={28} className="mb-2 text-yellow-300" />
            <span className="text-5xl font-bold">{data.match_score}%</span>
            <span className="text-sm uppercase tracking-wide font-medium opacity-90">
              Match Score
            </span>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl mb-10 shadow-sm">
          <h2 className="text-2xl font-semibold text-blue-700 mb-3 flex items-center gap-2">
            <Star size={22} />
            Match Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>

        {/* Key Alignments & Missing Keywords */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 bg-green-50 border border-green-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center gap-2">
              <ThumbsUp size={22} />
              Key Alignments
            </h3>
            <ul className="space-y-2">
              {data.key_alignments.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 bg-white/60 px-3 py-2 rounded-lg hover:bg-green-100 transition"
                >
                  <ListChecks className="text-green-600 mt-1" size={18} />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 bg-red-50 border border-red-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-red-700 mb-3 flex items-center gap-2">
              <AlertTriangle size={22} />
              Missing Keywords
            </h3>
            <ul className="space-y-2">
              {data.missing_keywords.map((word, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 bg-white/60 px-3 py-2 rounded-lg hover:bg-red-100 transition"
                >
                  <PlusCircle className="text-red-600 mt-1" size={18} />
                  <span className="text-gray-700">{word}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Improvement Suggestions */}
        <div className="p-6 bg-gradient-to-b from-blue-50 to-white border border-blue-100 rounded-2xl shadow-sm mb-10">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
            <Lightbulb size={22} />
            Improvement Suggestions
          </h3>

          <div className="space-y-5">
            <div>
              <h4 className="font-semibold text-red-600 mb-3">High Impact</h4>
              <ul className="space-y-2">
                {data.improvement_suggestions.high.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100 transition"
                  >
                    <PlusCircle className="text-red-600 mt-1" size={18} />
                    <span className="text-gray-700">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-yellow-600 mb-3">
                Medium Impact
              </h4>
              <ul className="space-y-2">
                {data.improvement_suggestions.medium.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 bg-yellow-50 px-3 py-2 rounded-lg hover:bg-yellow-100 transition"
                  >
                    <PlusCircle className="text-yellow-600 mt-1" size={18} />
                    <span className="text-gray-700">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-green-600 mb-3">Optional</h4>
              <ul className="space-y-2">
                {data.improvement_suggestions.optional.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 bg-green-50 px-3 py-2 rounded-lg hover:bg-green-100 transition"
                  >
                    <PlusCircle className="text-green-600 mt-1" size={18} />
                    <span className="text-gray-700">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl shadow-sm">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
            <Lightbulb size={22} />
            Recommendations
          </h3>

          <div className="space-y-5">
            <div>
              <h4 className="font-semibold text-indigo-600 mb-3">
                Summary Additions
              </h4>
              <ul className="space-y-2">
                {data.recommendations.summary_additions.map((r, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 bg-white px-3 py-2 rounded-lg hover:bg-indigo-50 transition"
                  >
                    <PlusCircle className="text-indigo-600 mt-1" size={18} />
                    <span className="text-gray-700">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-blue-600 mb-3">
                Skills to Add
              </h4>
              <ul className="space-y-2">
                {data.recommendations.skills_to_add.map((r, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 bg-white px-3 py-2 rounded-lg hover:bg-blue-50 transition"
                  >
                    <PlusCircle className="text-blue-600 mt-1" size={18} />
                    <span className="text-gray-700">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-green-600 mb-3">
                Project Ideas
              </h4>
              <ul className="space-y-2">
                {data.recommendations.project_ideas.map((r, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 bg-white px-3 py-2 rounded-lg hover:bg-green-50 transition"
                  >
                    <PlusCircle className="text-green-600 mt-1" size={18} />
                    <span className="text-gray-700">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobMatchResultPage;
