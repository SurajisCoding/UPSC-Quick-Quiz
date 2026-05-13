import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { BookOpen, ArrowRight } from "lucide-react";
import QuizInterface from "@/components/QuizInterface";

type QuizStep = "topic" | "difficulty" | "quiz" | "results";

export default function Quiz() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<QuizStep>("topic");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const topicsQuery = trpc.quiz.getTopics.useQuery();
  const topics = topicsQuery.data || [];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
          <p className="text-slate-600 mb-6">Please sign in to take quizzes</p>
          <Button className="btn-primary w-full">Go to Home</Button>
        </Card>
      </div>
    );
  }

  if (step === "quiz" && selectedTopic && selectedDifficulty) {
    return (
      <QuizInterface
        topic={selectedTopic}
        difficulty={selectedDifficulty}
        onBack={() => {
          setStep("difficulty");
          setSelectedTopic(null);
          setSelectedDifficulty(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold gradient-text">UPSC Quiz</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {step === "topic" && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Select a Topic</h2>
              <p className="text-lg text-slate-600">
                Choose from 6 UPSC Prelims subjects to begin your quiz
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => {
                    setSelectedTopic(topic);
                    setStep("difficulty");
                  }}
                  className="card-premium p-8 text-left hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {topic}
                      </h3>
                      <p className="text-slate-600">
                        {topic === "History" && "Indian history and independence movement"}
                        {topic === "Geography" && "Physical and economic geography"}
                        {topic === "Polity" && "Constitution and governance"}
                        {topic === "Economy" && "Economic development and sectors"}
                        {topic === "Science & Technology" && "General science and innovations"}
                        {topic === "Current Affairs" && "Recent national and international events"}
                      </p>
                    </div>
                    <ArrowRight className="h-6 w-6 text-blue-600 group-hover:translate-x-2 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "difficulty" && selectedTopic && (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => {
                setStep("topic");
                setSelectedTopic(null);
              }}
              className="mb-8 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
            >
              ← Back to Topics
            </button>

            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Select Difficulty Level</h2>
              <p className="text-lg text-slate-600">
                Choose your preferred difficulty for <span className="font-semibold">{selectedTopic}</span>
              </p>
            </div>

            <div className="space-y-4">
              {["Easy", "Medium", "Hard"].map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => {
                    setSelectedDifficulty(difficulty);
                    setStep("quiz");
                  }}
                  className="card-premium p-8 w-full text-left hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {difficulty} Level
                      </h3>
                      <p className="text-slate-600">
                        {difficulty === "Easy" && "Perfect for beginners - basic concepts and straightforward questions"}
                        {difficulty === "Medium" && "Intermediate difficulty - requires deeper understanding"}
                        {difficulty === "Hard" && "Challenging - complex scenarios and analytical thinking"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          difficulty === "Easy"
                            ? "bg-green-500"
                            : difficulty === "Medium"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      />
                      <ArrowRight className="h-6 w-6 text-blue-600 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
