import { questionBank } from "./questionBank";
import { getDb } from "./db";

export async function seedQuestions() {
  const db = await getDb();
  if (!db) {
    console.warn("[Seed] Database not available");
    return;
  }

  try {
    // Insert all questions from the question bank
    for (const question of questionBank) {
      await db.insert(require("../drizzle/schema").questions).values({
        topic: question.topic,
        difficulty: question.difficulty,
        questionText: question.questionText,
        optionA: question.optionA,
        optionB: question.optionB,
        optionC: question.optionC,
        optionD: question.optionD,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
      }).onDuplicateKeyUpdate({
        set: {
          explanation: question.explanation,
        },
      });
    }
    console.log("[Seed] Successfully seeded questions");
  } catch (error) {
    console.error("[Seed] Failed to seed questions:", error);
  }
}
