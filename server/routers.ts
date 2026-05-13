import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { questionBank } from "./questionBank";
import {
  getQuestionsByTopicAndDifficulty,
  getQuestionById,
  createQuizAttempt,
  createQuizResponse,
  getUserQuizAttempts,
  getQuizAttemptWithResponses,
  getTopScoresByTopic,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ==================== QUIZ OPERATIONS ====================
  quiz: router({
    /**
     * Get all available topics
     */
    getTopics: publicProcedure.query(async () => {
      const topics = ["History", "Geography", "Polity", "Economy", "Science & Technology", "Current Affairs"];
      return topics;
    }),

    /**
     * Get questions for a specific topic and difficulty
     */
    getQuestions: publicProcedure
      .input(
        z.object({
          topic: z.enum(["History", "Geography", "Polity", "Economy", "Science & Technology", "Current Affairs"]),
          difficulty: z.enum(["Easy", "Medium", "Hard"]),
        })
      )
      .query(async ({ input }) => {
        // Filter from in-memory question bank
        const filtered = questionBank.filter(
          (q) => q.topic === input.topic && q.difficulty === input.difficulty
        );

        // Return questions without correct answers (for quiz display)
        return filtered.map((q) => ({
          id: questionBank.indexOf(q),
          topic: q.topic,
          difficulty: q.difficulty,
          questionText: q.questionText,
          optionA: q.optionA,
          optionB: q.optionB,
          optionC: q.optionC,
          optionD: q.optionD,
        }));
      }),

    /**
     * Get a specific question with answer (for verification)
     */
    getQuestionAnswer: publicProcedure
      .input(z.object({ questionIndex: z.number() }))
      .query(async ({ input }) => {
        const question = questionBank[input.questionIndex];
        if (!question) {
          throw new Error("Question not found");
        }
        return {
          correctAnswer: question.correctAnswer,
          explanation: question.explanation,
        };
      }),

    /**
     * Submit quiz and save results
     */
    submitQuiz: protectedProcedure
      .input(
        z.object({
          topic: z.enum(["History", "Geography", "Polity", "Economy", "Science & Technology", "Current Affairs"]),
          difficulty: z.enum(["Easy", "Medium", "Hard"]),
          responses: z.array(
            z.object({
              questionIndex: z.number(),
              selectedAnswer: z.enum(["A", "B", "C", "D", "SKIPPED"]),
              timeTakenSeconds: z.number(),
            })
          ),
          totalTimeTakenSeconds: z.number(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user) {
          throw new Error("User not authenticated");
        }

        // Calculate score
        let correctCount = 0;
        const responseDetails = [];

        for (const response of input.responses) {
          const question = questionBank[response.questionIndex];
          if (!question) continue;

          const isCorrect =
            response.selectedAnswer !== "SKIPPED" &&
            response.selectedAnswer === question.correctAnswer;

          if (isCorrect) correctCount++;

          responseDetails.push({
            questionIndex: response.questionIndex,
            selectedAnswer: response.selectedAnswer,
            isCorrect,
            timeTakenSeconds: response.timeTakenSeconds,
          });
        }

        const totalQuestions = input.responses.length;
        const score = (correctCount / totalQuestions) * 100;
        const accuracyPercentage = score;

        // Save to database
        try {
          const result = await createQuizAttempt({
            userId: ctx.user.id,
            topic: input.topic,
            difficulty: input.difficulty,
            totalQuestions,
            correctAnswers: correctCount,
            score,
            accuracyPercentage,
            timeTakenSeconds: input.totalTimeTakenSeconds,
          });

          return {
            success: true,
            score,
            correctAnswers: correctCount,
            totalQuestions,
            accuracyPercentage,
            timeTakenSeconds: input.totalTimeTakenSeconds,
            responses: responseDetails,
          };
        } catch (error) {
          console.error("Failed to save quiz attempt:", error);
          return {
            success: false,
            score,
            correctAnswers: correctCount,
            totalQuestions,
            accuracyPercentage,
            timeTakenSeconds: input.totalTimeTakenSeconds,
            responses: responseDetails,
          };
        }
      }),

    /**
     * Get user's quiz history
     */
    getHistory: protectedProcedure.query(async ({ ctx }) => {
      if (!ctx.user) {
        throw new Error("User not authenticated");
      }

      try {
        const attempts = await getUserQuizAttempts(ctx.user.id);
        return attempts.map((attempt) => ({
          id: attempt.id,
          topic: attempt.topic,
          difficulty: attempt.difficulty,
          score: parseFloat(attempt.score.toString()),
          accuracyPercentage: parseFloat(attempt.accuracyPercentage.toString()),
          totalQuestions: attempt.totalQuestions,
          correctAnswers: attempt.correctAnswers,
          timeTakenSeconds: attempt.timeTakenSeconds,
          completedAt: attempt.completedAt,
        }));
      } catch (error) {
        console.error("Failed to get quiz history:", error);
        return [];
      }
    }),

    /**
     * Get detailed results for a specific quiz attempt
     */
    getAttemptDetails: protectedProcedure
      .input(z.object({ attemptId: z.number() }))
      .query(async ({ ctx, input }) => {
        if (!ctx.user) {
          throw new Error("User not authenticated");
        }

        try {
          const data = await getQuizAttemptWithResponses(input.attemptId);
          if (!data) {
            throw new Error("Attempt not found");
          }

          // Verify ownership
          if (data.attempt.userId !== ctx.user.id) {
            throw new Error("Unauthorized");
          }

          return {
            attempt: {
              id: data.attempt.id,
              topic: data.attempt.topic,
              difficulty: data.attempt.difficulty,
              score: parseFloat(data.attempt.score.toString()),
              accuracyPercentage: parseFloat(data.attempt.accuracyPercentage.toString()),
              totalQuestions: data.attempt.totalQuestions,
              correctAnswers: data.attempt.correctAnswers,
              timeTakenSeconds: data.attempt.timeTakenSeconds,
              completedAt: data.attempt.completedAt,
            },
            responses: data.responses.map((r) => ({
              questionId: r.questionId,
              selectedAnswer: r.selectedAnswer,
              isCorrect: r.isCorrect,
              timeTakenSeconds: r.timeTakenSeconds,
            })),
          };
        } catch (error) {
          console.error("Failed to get attempt details:", error);
          throw error;
        }
      }),

    /**
     * Get leaderboard for a topic
     */
    getLeaderboard: publicProcedure
      .input(
        z.object({
          topic: z.enum(["History", "Geography", "Polity", "Economy", "Science & Technology", "Current Affairs"]),
          limit: z.number().default(10),
        })
      )
      .query(async ({ input }) => {
        try {
          const topScores = await getTopScoresByTopic(input.topic, input.limit);
          return topScores.map((attempt, index) => ({
            rank: index + 1,
            score: parseFloat(attempt.score.toString()),
            accuracyPercentage: parseFloat(attempt.accuracyPercentage.toString()),
            difficulty: attempt.difficulty,
            completedAt: attempt.completedAt,
          }));
        } catch (error) {
          console.error("Failed to get leaderboard:", error);
          return [];
        }
      }),

    /**
     * Get statistics for a user
     */
    getStats: protectedProcedure.query(async ({ ctx }) => {
      if (!ctx.user) {
        throw new Error("User not authenticated");
      }

      try {
        const attempts = await getUserQuizAttempts(ctx.user.id);

        if (attempts.length === 0) {
          return {
            totalAttempts: 0,
            averageScore: 0,
            bestScore: 0,
            totalTimeSpent: 0,
            topicStats: {},
          };
        }

        const topicStats: Record<string, any> = {};
        let totalTime = 0;
        let bestScore = 0;

        for (const attempt of attempts) {
          totalTime += attempt.timeTakenSeconds;
          const score = parseFloat(attempt.score.toString());
          if (score > bestScore) bestScore = score;

          if (!topicStats[attempt.topic]) {
            topicStats[attempt.topic] = {
              attempts: 0,
              averageScore: 0,
              bestScore: 0,
            };
          }

          topicStats[attempt.topic].attempts += 1;
          topicStats[attempt.topic].averageScore += score;
          if (score > topicStats[attempt.topic].bestScore) {
            topicStats[attempt.topic].bestScore = score;
          }
        }

        // Calculate averages
        for (const topic in topicStats) {
          topicStats[topic].averageScore /= topicStats[topic].attempts;
        }

        const averageScore = attempts.reduce((sum, a) => sum + parseFloat(a.score.toString()), 0) / attempts.length;

        return {
          totalAttempts: attempts.length,
          averageScore,
          bestScore,
          totalTimeSpent: totalTime,
          topicStats,
        };
      } catch (error) {
        console.error("Failed to get stats:", error);
        return {
          totalAttempts: 0,
          averageScore: 0,
          bestScore: 0,
          totalTimeSpent: 0,
          topicStats: {},
        };
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
