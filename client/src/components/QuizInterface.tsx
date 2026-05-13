import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { questionBank } from "../../../server/questionBank";

interface Question {
  id: number;
  topic: string;
  difficulty: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

interface QuizInterfaceProps {
  topic: string;
  difficulty: string;
  onBack: () => void;
}

type AnswerFeedback = "correct" | "incorrect" | null;

export default function QuizInterface({ topic, difficulty, onBack }: QuizInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<AnswerFeedback>(null);
  const [explanation, setExplanation] = useState("");
  const [timePerQuestion, setTimePerQuestion] = useState(30);
  const [totalTime, setTotalTime] = useState(0);
  const [responses, setResponses] = useState<
    Array<{ questionIndex: number; selectedAnswer: "A" | "B" | "C" | "D" | "SKIPPED"; timeTakenSeconds: number }>
  >([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const questionsQuery = trpc.quiz.getQuestions.useQuery({ topic: topic as any, difficulty: difficulty as any });
  const submitQuizMutation = trpc.quiz.submitQuiz.useMutation();

  const questions = questionsQuery.data || [];
  const currentQuestion = (questions[currentQuestionIndex] || {}) as Question;

  // Get the actual question from the question bank for verification
  const getActualQuestion = () => {
    return questionBank.find(
      (q) => q.topic === topic && q.difficulty === difficulty && q.questionText === currentQuestion.questionText
    );
  };

  // Timer for current question
  useEffect(() => {
    if (showFeedback || quizComplete) return;

    const timer = setInterval(() => {
      setTimePerQuestion((prev) => {
        if (prev <= 1) {
          // Auto-skip if time runs out
          handleSkip();
          return 30;
        }
        return prev - 1;
      });
      setTotalTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [showFeedback, quizComplete]);

  const handleAnswerSelect = (option: string) => {
    if (showFeedback) return;

    setSelectedAnswer(option);

    // Get the actual question to verify the answer
    const actualQuestion = getActualQuestion();
    if (actualQuestion) {
      const isCorrect = option === actualQuestion.correctAnswer;
      setFeedback(isCorrect ? "correct" : "incorrect");
      setExplanation(actualQuestion.explanation);
    } else {
      setFeedback("incorrect");
      setExplanation("Unable to verify answer.");
    }

    setShowFeedback(true);

    // Record response
    setResponses((prev) => [
      ...prev,
      {
        questionIndex: currentQuestionIndex,
        selectedAnswer: option as "A" | "B" | "C" | "D",
        timeTakenSeconds: 30 - timePerQuestion,
      },
    ]);
  };

  const handleSkip = () => {
    if (showFeedback) return;

    // Record skipped response
    setResponses((prev) => [
      ...prev,
      {
        questionIndex: currentQuestionIndex,
        selectedAnswer: "SKIPPED" as const,
        timeTakenSeconds: 30 - timePerQuestion,
      },
    ]);

    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setFeedback(null);
      setExplanation("");
      setTimePerQuestion(30);
    } else {
      // Quiz complete
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    try {
      // Ensure all responses are recorded
      const finalResponses = [...responses];

      const result = await submitQuizMutation.mutateAsync({
        topic: topic as "History" | "Geography" | "Polity" | "Economy" | "Science & Technology" | "Current Affairs",
        difficulty: difficulty as "Easy" | "Medium" | "Hard",
        responses: finalResponses,
        totalTimeTakenSeconds: totalTime,
      });

      if (result.success) {
        setQuizComplete(true);
      }
    } catch (error) {
      console.error("Failed to submit quiz:", error);
    }
  };

  if (questionsQuery.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-lg text-slate-600">Loading questions...</p>
        </Card>
      </div>
    );
  }

  // Type guard for questions
  const typedQuestions = questions as Question[];

  if (!typedQuestions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">No Questions Available</h2>
          <p className="text-slate-600 mb-6">
            No questions found for {topic} - {difficulty}
          </p>
          <Button className="btn-primary w-full" onClick={onBack}>
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  if (quizComplete) {
    // Calculate correct answers and topic-wise breakdown
    let correctCount = 0;
    const topicStats: Record<string, { correct: number; total: number }> = {};

    for (const response of responses) {
      const question = typedQuestions[response.questionIndex];
      if (!question) continue;

      const actualQuestion = questionBank.find(
        (q) => q.topic === topic && q.difficulty === difficulty && q.questionText === question.questionText
      );

      if (actualQuestion) {
        const isCorrect = response.selectedAnswer !== "SKIPPED" && response.selectedAnswer === actualQuestion.correctAnswer;

        if (isCorrect) correctCount++;

        if (!topicStats[question.topic]) {
          topicStats[question.topic] = { correct: 0, total: 0 };
        }
        topicStats[question.topic].total++;
        if (isCorrect) topicStats[question.topic].correct++;
      }
    }

    const accuracy = (correctCount / typedQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="p-8 text-center space-y-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h2 className="text-4xl font-bold text-slate-900">Quiz Complete!</h2>

            {/* Main Results */}
            <div className="grid grid-cols-2 gap-4 py-6">
              <div className="card-premium p-4">
                <p className="text-sm text-slate-600 mb-1">Score</p>
                <p className="text-3xl font-bold text-blue-600">{accuracy.toFixed(1)}%</p>
              </div>
              <div className="card-premium p-4">
                <p className="text-sm text-slate-600 mb-1">Correct Answers</p>
                <p className="text-3xl font-bold text-green-600">
                  {correctCount}/{typedQuestions.length}
                </p>
              </div>
              <div className="card-premium p-4">
                <p className="text-sm text-slate-600 mb-1">Time Taken</p>
                <p className="text-3xl font-bold text-purple-600">
                  {Math.floor(totalTime / 60)}:{String(totalTime % 60).padStart(2, "0")}
                </p>
              </div>
              <div className="card-premium p-4">
                <p className="text-sm text-slate-600 mb-1">Difficulty</p>
                <p className="text-lg font-bold text-slate-900">{difficulty}</p>
              </div>
            </div>

            {/* Topic-wise Breakdown */}
            <div className="bg-slate-50 rounded-lg p-6 text-left space-y-4">
              <h3 className="font-semibold text-slate-900 text-center">Topic-wise Performance</h3>
              <div className="space-y-3">
                {Object.entries(topicStats).map(([topicName, stats]) => (
                  <div key={topicName} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-900">{topicName}</span>
                      <span className="text-slate-600">
                        {stats.correct}/{stats.total}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-700"
                        style={{ width: `${(stats.correct / stats.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="btn-outline flex-1" onClick={onBack}>
                Try Another Topic
              </Button>
              <Button className="btn-primary flex-1" onClick={() => (window.location.href = "/dashboard")}>
                View Dashboard
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const progressPercent = ((currentQuestionIndex + 1) / typedQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {topic} - {difficulty}
            </h2>
            <p className="text-slate-600">
              Question {currentQuestionIndex + 1} of {typedQuestions.length}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm">
            <Clock className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-slate-900">{timePerQuestion}s</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 space-y-2">
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-slate-600 text-right">{progressPercent.toFixed(0)}% complete</p>
        </div>

        {/* Question Card */}
        <Card className="p-8 mb-8 space-y-6">
          <h3 className="text-2xl font-bold text-slate-900 leading-relaxed">
            {currentQuestion.questionText}
          </h3>

          {/* Answer Options */}
          <div className="space-y-3">
            {["A", "B", "C", "D"].map((option) => {
              const optionText = currentQuestion[`option${option}` as keyof Question] as string;
              const isSelected = selectedAnswer === option;
              const actualQuestion = getActualQuestion();
              const isCorrect = showFeedback && actualQuestion && option === actualQuestion.correctAnswer;
              const isIncorrect = showFeedback && isSelected && actualQuestion && option !== actualQuestion.correctAnswer;

              return (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showFeedback}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left font-semibold ${
                    isCorrect
                      ? "border-green-500 bg-green-50 text-green-900"
                      : isIncorrect
                        ? "border-red-500 bg-red-50 text-red-900"
                        : isSelected && !showFeedback
                          ? "border-blue-600 bg-blue-50 text-blue-900"
                          : "border-slate-200 bg-white text-slate-900 hover:border-blue-400 hover:bg-blue-50"
                  } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 font-bold ${
                        isCorrect
                          ? "border-green-500 bg-green-500 text-white"
                          : isIncorrect
                            ? "border-red-500 bg-red-500 text-white"
                            : isSelected && !showFeedback
                              ? "border-blue-600 bg-blue-600 text-white"
                              : "border-slate-300 bg-white text-slate-600"
                      }`}
                    >
                      {option}
                    </div>
                    <span>{optionText}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Feedback Section */}
        {showFeedback && (
          <Card className={`p-6 mb-8 space-y-4 ${feedback === "correct" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
            <div className="flex items-center gap-3">
              {feedback === "correct" ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <XCircle className="h-6 w-6 text-red-600" />
              )}
              <span className={`font-bold text-lg ${feedback === "correct" ? "text-green-900" : "text-red-900"}`}>
                {feedback === "correct" ? "Correct!" : "Incorrect"}
              </span>
            </div>
            <p className={feedback === "correct" ? "text-green-900" : "text-red-900"}>
              {explanation}
            </p>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="btn-outline flex-1" onClick={onBack}>
            Exit Quiz
          </Button>
          {!showFeedback ? (
            <Button className="btn-secondary flex-1" onClick={handleSkip}>
              Skip Question
            </Button>
          ) : (
            <Button className="btn-primary flex-1" onClick={moveToNextQuestion}>
              {currentQuestionIndex === typedQuestions.length - 1 ? "Submit Quiz" : "Next Question"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
