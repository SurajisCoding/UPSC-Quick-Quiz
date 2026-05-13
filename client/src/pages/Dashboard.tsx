import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { TrendingUp, Award, Clock, Target, BookOpen, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const statsQuery = trpc.quiz.getStats.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const historyQuery = trpc.quiz.getHistory.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const leaderboardQuery = trpc.quiz.getLeaderboard.useQuery(
    { topic: (selectedTopic || "History") as "History" | "Geography" | "Polity" | "Economy" | "Science & Technology" | "Current Affairs", limit: 10 },
    { enabled: isAuthenticated && !!selectedTopic }
  );

  const stats = statsQuery.data;
  const history = historyQuery.data || [];
  const leaderboard = leaderboardQuery.data || [];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
          <p className="text-slate-600 mb-6">Please sign in to view your dashboard</p>
          <Link href="/">
            <Button className="btn-primary w-full">Go to Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
            </div>
            <Link href="/quiz">
              <Button className="btn-primary">
                Take Quiz <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-2">
            Welcome back, <span className="gradient-text">{user?.name}</span>
          </h2>
          <p className="text-lg text-slate-600">Track your progress and improve your UPSC Prelims preparation</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="card-premium p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-slate-600 font-semibold">Total Attempts</h3>
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-4xl font-bold text-slate-900">{stats.totalAttempts}</p>
            </div>

            <div className="card-premium p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-slate-600 font-semibold">Average Score</h3>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-4xl font-bold text-slate-900">{stats.averageScore.toFixed(1)}%</p>
            </div>

            <div className="card-premium p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-slate-600 font-semibold">Best Score</h3>
                <Award className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-4xl font-bold text-slate-900">{stats.bestScore.toFixed(1)}%</p>
            </div>

            <div className="card-premium p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-slate-600 font-semibold">Time Spent</h3>
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <p className="text-4xl font-bold text-slate-900">
                {Math.floor(stats.totalTimeSpent / 3600)}h {Math.floor((stats.totalTimeSpent % 3600) / 60)}m
              </p>
            </div>
          </div>
        )}

        {/* Topic-wise Performance */}
        {stats && Object.keys(stats.topicStats).length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Topic-wise Performance</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(stats.topicStats).map(([topic, data]: any) => (
                <div key={topic} className="card-premium p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-slate-900">{topic}</h4>
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {data.attempts} attempt{data.attempts > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Average Score</span>
                      <span className="font-semibold text-slate-900">{data.averageScore.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-700"
                        style={{ width: `${data.averageScore}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Best Score</span>
                    <span className="font-semibold text-green-600">{data.bestScore.toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Quiz History */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Recent Quiz Attempts</h3>
            {history.length > 0 ? (
              <div className="space-y-4">
                {history.slice(0, 10).map((attempt, index) => (
                  <div key={index} className="card-premium p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-slate-900">
                          {attempt.topic} - {attempt.difficulty}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {new Date(attempt.completedAt).toLocaleDateString()} at{" "}
                          {new Date(attempt.completedAt).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="text-3xl font-bold text-blue-600">{attempt.score.toFixed(1)}%</p>
                        <p className="text-sm text-slate-600">
                          {attempt.correctAnswers}/{attempt.totalQuestions}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-slate-600 mb-4">No quiz attempts yet</p>
                <Link href="/quiz">
                  <Button className="btn-primary">Start Your First Quiz</Button>
                </Link>
              </Card>
            )}
          </div>

          {/* Leaderboard */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Leaderboard</h3>
            
            {/* Topic Selection */}
            <div className="mb-6 space-y-2">
              <label className="text-sm font-semibold text-slate-600">Select Topic</label>
              <select
                value={selectedTopic || "History"}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="History">History</option>
                <option value="Geography">Geography</option>
                <option value="Polity">Polity</option>
                <option value="Economy">Economy</option>
                <option value="Science & Technology">Science & Technology</option>
                <option value="Current Affairs">Current Affairs</option>
              </select>
            </div>

            {/* Leaderboard List */}
            {leaderboardQuery.isLoading ? (
              <Card className="p-4 text-center">
                <p className="text-slate-600">Loading leaderboard...</p>
              </Card>
            ) : leaderboard.length > 0 ? (
              <div className="space-y-3">
                {leaderboard.map((entry, index) => (
                  <div key={index} className="card-premium p-4 flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                      #{entry.rank}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{entry.score.toFixed(1)}%</p>
                      <p className="text-xs text-slate-600">{entry.difficulty}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Card className="p-4 text-center">
                <p className="text-sm text-slate-600">No leaderboard data available</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
