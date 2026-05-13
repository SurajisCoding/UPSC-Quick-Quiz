import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Questions table for UPSC quiz bank
 */
export const questions = mysqlTable("questions", {
  id: int("id").autoincrement().primaryKey(),
  topic: mysqlEnum("topic", ["History", "Geography", "Polity", "Economy", "Science & Technology", "Current Affairs"]).notNull(),
  difficulty: mysqlEnum("difficulty", ["Easy", "Medium", "Hard"]).notNull(),
  questionText: text("questionText").notNull(),
  optionA: text("optionA").notNull(),
  optionB: text("optionB").notNull(),
  optionC: text("optionC").notNull(),
  optionD: text("optionD").notNull(),
  correctAnswer: mysqlEnum("correctAnswer", ["A", "B", "C", "D"]).notNull(),
  explanation: text("explanation").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Question = typeof questions.$inferSelect;
export type InsertQuestion = typeof questions.$inferInsert;

/**
 * Quiz attempts table - tracks each quiz session
 */
export const quizAttempts = mysqlTable("quizAttempts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  topic: mysqlEnum("topic", ["History", "Geography", "Polity", "Economy", "Science & Technology", "Current Affairs"]).notNull(),
  difficulty: mysqlEnum("difficulty", ["Easy", "Medium", "Hard"]).notNull(),
  totalQuestions: int("totalQuestions").notNull(),
  correctAnswers: int("correctAnswers").notNull(),
  score: decimal("score", { precision: 5, scale: 2 }).notNull(),
  accuracyPercentage: decimal("accuracyPercentage", { precision: 5, scale: 2 }).notNull(),
  timeTakenSeconds: int("timeTakenSeconds").notNull(),
  completedAt: timestamp("completedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type InsertQuizAttempt = typeof quizAttempts.$inferInsert;

/**
 * Quiz responses table - tracks individual question responses
 */
export const quizResponses = mysqlTable("quizResponses", {
  id: int("id").autoincrement().primaryKey(),
  quizAttemptId: int("quizAttemptId").notNull(),
  questionId: int("questionId").notNull(),
  selectedAnswer: mysqlEnum("selectedAnswer", ["A", "B", "C", "D", "SKIPPED"]).notNull(),
  isCorrect: boolean("isCorrect").notNull(),
  timeTakenSeconds: int("timeTakenSeconds").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type QuizResponse = typeof quizResponses.$inferSelect;
export type InsertQuizResponse = typeof quizResponses.$inferInsert;
