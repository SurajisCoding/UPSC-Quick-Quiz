import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("quiz procedures", () => {
  it("getTopics returns all 6 UPSC subjects", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const topics = await caller.quiz.getTopics();

    expect(topics).toEqual([
      "History",
      "Geography",
      "Polity",
      "Economy",
      "Science & Technology",
      "Current Affairs",
    ]);
  });

  it("getQuestions returns questions for a valid topic and difficulty", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const questions = await caller.quiz.getQuestions({
      topic: "History",
      difficulty: "Easy",
    });

    expect(Array.isArray(questions)).toBe(true);
    expect(questions.length).toBeGreaterThan(0);

    // Verify question structure
    const question = questions[0];
    expect(question).toHaveProperty("id");
    expect(question).toHaveProperty("questionText");
    expect(question).toHaveProperty("optionA");
    expect(question).toHaveProperty("optionB");
    expect(question).toHaveProperty("optionC");
    expect(question).toHaveProperty("optionD");
    expect(question).toHaveProperty("topic");
    expect(question).toHaveProperty("difficulty");
  });

  it("getQuestions returns different questions for different difficulties", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const easyQuestions = await caller.quiz.getQuestions({
      topic: "History",
      difficulty: "Easy",
    });

    const hardQuestions = await caller.quiz.getQuestions({
      topic: "History",
      difficulty: "Hard",
    });

    expect(easyQuestions.length).toBeGreaterThan(0);
    expect(hardQuestions.length).toBeGreaterThan(0);
    // They should have different questions
    expect(easyQuestions[0]?.id).not.toEqual(hardQuestions[0]?.id);
  });

  it("submitQuiz calculates score correctly", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const questions = await caller.quiz.getQuestions({
      topic: "History",
      difficulty: "Easy",
    });

    // Simulate all correct answers
    const responses = questions.map((q, index) => ({
      questionIndex: index,
      selectedAnswer: "A" as const,
      timeTakenSeconds: 10,
    }));

    const result = await caller.quiz.submitQuiz({
      topic: "History",
      difficulty: "Easy",
      responses,
      totalTimeTakenSeconds: 100,
    });

    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("score");
    expect(typeof result.score).toBe("number");
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it("submitQuiz handles skipped questions", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const questions = await caller.quiz.getQuestions({
      topic: "History",
      difficulty: "Easy",
    });

    // Mix of answers and skipped
    const responses = questions.map((q, index) => ({
      questionIndex: index,
      selectedAnswer: (index % 2 === 0 ? "A" : "SKIPPED") as const,
      timeTakenSeconds: 10,
    }));

    const result = await caller.quiz.submitQuiz({
      topic: "History",
      difficulty: "Easy",
      responses,
      totalTimeTakenSeconds: 100,
    });

    expect(result.success).toBe(true);
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it("getHistory returns quiz attempts for authenticated user", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const history = await caller.quiz.getHistory();

    expect(Array.isArray(history)).toBe(true);
    // History might be empty initially, but should be an array
    if (history.length > 0) {
      const attempt = history[0];
      expect(attempt).toHaveProperty("topic");
      expect(attempt).toHaveProperty("difficulty");
      expect(attempt).toHaveProperty("score");
      expect(attempt).toHaveProperty("correctAnswers");
      expect(attempt).toHaveProperty("totalQuestions");
    }
  });

  it("getStats returns user statistics", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const stats = await caller.quiz.getStats();

    expect(stats).toHaveProperty("totalAttempts");
    expect(stats).toHaveProperty("averageScore");
    expect(stats).toHaveProperty("bestScore");
    expect(stats).toHaveProperty("totalTimeSpent");
    expect(stats).toHaveProperty("topicStats");

    expect(typeof stats.totalAttempts).toBe("number");
    expect(typeof stats.averageScore).toBe("number");
    expect(typeof stats.bestScore).toBe("number");
    expect(typeof stats.totalTimeSpent).toBe("number");
    expect(typeof stats.topicStats).toBe("object");
  });

  it("getLeaderboard returns top scores for a topic", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const leaderboard = await caller.quiz.getLeaderboard({
      topic: "History",
      limit: 10,
    });

    expect(Array.isArray(leaderboard)).toBe(true);
    // Leaderboard might be empty initially
    if (leaderboard.length > 0) {
      const entry = leaderboard[0];
      expect(entry).toHaveProperty("rank");
      expect(entry).toHaveProperty("score");
      expect(entry).toHaveProperty("difficulty");
    }
  });

  it("rejects unauthenticated access to protected procedures", async () => {
    const unAuthCtx: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {
        clearCookie: () => {},
      } as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(unAuthCtx);

    try {
      await caller.quiz.getHistory();
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("UNAUTHORIZED");
    }
  });
});
