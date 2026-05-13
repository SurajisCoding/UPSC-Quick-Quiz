import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, questions, quizAttempts, quizResponses } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ==================== QUIZ OPERATIONS ====================

/**
 * Get all questions for a specific topic and difficulty
 */
export async function getQuestionsByTopicAndDifficulty(
  topic: string,
  difficulty: string
) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get questions: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(questions)
      .where(
        and(
          eq(questions.topic, topic as any),
          eq(questions.difficulty, difficulty as any)
        )
      );
    return result;
  } catch (error) {
    console.error("[Database] Failed to get questions:", error);
    return [];
  }
}

/**
 * Get a specific question by ID
 */
export async function getQuestionById(questionId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get question: database not available");
    return null;
  }

  try {
    const result = await db
      .select()
      .from(questions)
      .where(eq(questions.id, questionId))
      .limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get question:", error);
    return null;
  }
}

/**
 * Create a new quiz attempt
 */
export async function createQuizAttempt(data: {
  userId: number;
  topic: string;
  difficulty: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  accuracyPercentage: number;
  timeTakenSeconds: number;
}) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create quiz attempt: database not available");
    return null;
  }

  try {
    const result = await db.insert(quizAttempts).values({
      userId: data.userId,
      topic: data.topic as any,
      difficulty: data.difficulty as any,
      totalQuestions: data.totalQuestions,
      correctAnswers: data.correctAnswers,
      score: data.score.toString() as any,
      accuracyPercentage: data.accuracyPercentage.toString() as any,
      timeTakenSeconds: data.timeTakenSeconds,
    });
    return result;
  } catch (error) {
    console.error("[Database] Failed to create quiz attempt:", error);
    return null;
  }
}

/**
 * Get the last inserted quiz attempt ID
 */
export async function getLastQuizAttemptId() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get last quiz attempt: database not available");
    return null;
  }

  try {
    const result = await db
      .select()
      .from(quizAttempts)
      .orderBy(quizAttempts.id)
      .limit(1);
    return result.length > 0 ? result[0].id : null;
  } catch (error) {
    console.error("[Database] Failed to get last quiz attempt:", error);
    return null;
  }
}

/**
 * Create a quiz response record
 */
export async function createQuizResponse(data: {
  quizAttemptId: number;
  questionId: number;
  selectedAnswer: string;
  isCorrect: boolean;
  timeTakenSeconds: number;
}) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create quiz response: database not available");
    return null;
  }

  try {
    const result = await db.insert(quizResponses).values({
      quizAttemptId: data.quizAttemptId,
      questionId: data.questionId,
      selectedAnswer: data.selectedAnswer as any,
      isCorrect: data.isCorrect,
      timeTakenSeconds: data.timeTakenSeconds,
    });
    return result;
  } catch (error) {
    console.error("[Database] Failed to create quiz response:", error);
    return null;
  }
}

/**
 * Get all quiz attempts for a user
 */
export async function getUserQuizAttempts(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user quiz attempts: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(quizAttempts)
      .where(eq(quizAttempts.userId, userId));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get user quiz attempts:", error);
    return [];
  }
}

/**
 * Get a specific quiz attempt with its responses
 */
export async function getQuizAttemptWithResponses(attemptId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get quiz attempt: database not available");
    return null;
  }

  try {
    const attempt = await db
      .select()
      .from(quizAttempts)
      .where(eq(quizAttempts.id, attemptId))
      .limit(1);

    if (attempt.length === 0) return null;

    const responses = await db
      .select()
      .from(quizResponses)
      .where(eq(quizResponses.quizAttemptId, attemptId));

    return {
      attempt: attempt[0],
      responses,
    };
  } catch (error) {
    console.error("[Database] Failed to get quiz attempt with responses:", error);
    return null;
  }
}

/**
 * Get leaderboard data - top scores by topic
 */
export async function getTopScoresByTopic(topic: string, limit: number = 10) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get top scores: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(quizAttempts)
      .where(eq(quizAttempts.topic, topic as any))
      .orderBy(quizAttempts.score)
      .limit(limit);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get top scores:", error);
    return [];
  }
}
