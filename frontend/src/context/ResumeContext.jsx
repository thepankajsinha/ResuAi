import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [jobMatchResult, setJobMatchResult] = useState(null);
  const navigate = useNavigate();

  const analyzeResume = async (file) => {
    if (!file) return toast.error("Please upload a resume file!");

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const { data } = await api.post("/resume/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!data?.suggestions)
        return toast.error("Unexpected response from server");

      setAnalysisResult(data.suggestions);
      toast.success("Resume analyzed successfully!");

      navigate("/resume/analysis/result", {
        state: { analysis: data.suggestions },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error analyzing resume");
    } finally {
      setLoading(false);
    }
  };


  const matchJob = async (resumeFile, jobDescriptionText = "") => {
    if (!resumeFile) return toast.error("Please upload a resume file!");
    if (!jobDescriptionText.trim())
      return toast.error("Please provide a job description!");

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDescriptionText", jobDescriptionText);

    try {
      const { data } = await api.post("/resume/match-job", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!data?.analysis)
        return toast.error("Unexpected response from server");

      setJobMatchResult(data.analysis);
      toast.success("Job match analysis completed!");

      navigate("/resume/job-match/result", {
        state: { matchData: data.analysis },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error matching job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        loading,
        analysisResult,
        jobMatchResult,
        analyzeResume,
        matchJob,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
