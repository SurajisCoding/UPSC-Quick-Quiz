import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { BookOpen, Zap, TrendingUp, Award } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold gradient-text">UPSC Quiz</h1>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                <span className="text-sm text-slate-600">Welcome, {user.name}</span>
                <Link href="/dashboard">
                  <Button className="btn-primary">Dashboard</Button>
                </Link>
              </>
            ) : (
              <a href={getLoginUrl()}>
                <Button className="btn-primary">Sign In</Button>
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
                Master UPSC <span className="gradient-text">Prelims</span>
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                Prepare for India's most prestigious civil service examination with our curated question bank and intelligent quiz system.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <Link href="/quiz">
                  <Button className="btn-primary w-full sm:w-auto">
                    <Zap className="mr-2 h-5 w-5" />
                    Start Quiz
                  </Button>
                </Link>
              ) : (
                <a href={getLoginUrl()}>
                  <Button className="btn-primary w-full sm:w-auto">
                    <Zap className="mr-2 h-5 w-5" />
                    Get Started
                  </Button>
                </a>
              )}
              <Button className="btn-outline w-full sm:w-auto">
                Learn More
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold text-slate-900">60+</p>
                <p className="text-sm text-slate-600">Questions per topic</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">6</p>
                <p className="text-sm text-slate-600">UPSC subjects</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">3</p>
                <p className="text-sm text-slate-600">Difficulty levels</p>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4">
            <div className="card-premium p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Comprehensive Topics</h3>
              </div>
              <p className="text-sm text-slate-600">
                History, Geography, Polity, Economy, Science & Technology, and Current Affairs
              </p>
            </div>

            <div className="card-premium p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Real-time Feedback</h3>
              </div>
              <p className="text-sm text-slate-600">
                Instant answer verification with detailed explanations for every question
              </p>
            </div>

            <div className="card-premium p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Progress Tracking</h3>
              </div>
              <p className="text-sm text-slate-600">
                Monitor your improvement with detailed analytics and performance insights
              </p>
            </div>

            <div className="card-premium p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <Award className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Leaderboard</h3>
              </div>
              <p className="text-sm text-slate-600">
                Compete with other aspirants and see where you stand
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-lg text-slate-600">Everything you need to ace UPSC Prelims</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Curated Questions</h3>
              <p className="text-slate-600">
                Carefully selected UPSC Prelims-style MCQs covering all major topics and difficulty levels
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-green-100">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Timed Quizzes</h3>
              <p className="text-slate-600">
                Per-question timers and overall quiz duration to simulate real exam conditions
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-purple-100">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Detailed Analytics</h3>
              <p className="text-slate-600">
                Comprehensive performance metrics including accuracy, topic-wise breakdown, and trends
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white space-y-6">
          <h2 className="text-4xl font-bold">Ready to Start Your UPSC Journey?</h2>
          <p className="text-lg opacity-90">
            Join thousands of aspirants preparing for India's most competitive exam
          </p>
          {isAuthenticated ? (
            <Link href="/quiz">
              <Button className="bg-white text-blue-600 hover:bg-slate-100 font-semibold px-8 py-3">
                Begin Quizzing Now
              </Button>
            </Link>
          ) : (
            <a href={getLoginUrl()}>
              <Button className="bg-white text-blue-600 hover:bg-slate-100 font-semibold px-8 py-3">
                Sign In to Start
              </Button>
            </a>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-8">
        <div className="container mx-auto px-4 text-center text-slate-600">
          <p>&copy; 2026 UPSC Quiz App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
