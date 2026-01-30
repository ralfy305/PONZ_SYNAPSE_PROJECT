import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Import users from auth for reference in this file
import { users } from "./models/auth";

// Export auth models (users, sessions)
export * from "./models/auth";

export const couples = pgTable("couples", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  inviteCode: text("invite_code").notNull().unique(),
  partner1Id: varchar("partner1_id"),
  partner2Id: varchar("partner2_id"),
  status: text("status").notNull().default("pending"), // pending, active
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const quizResponses = pgTable("quiz_responses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  moduleId: text("module_id").notNull(),
  questionId: integer("question_id").notNull(),
  answer: jsonb("answer").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertCoupleSchema = createInsertSchema(couples).omit({
  id: true,
  createdAt: true,
});

export const insertQuizResponseSchema = createInsertSchema(quizResponses).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertCouple = z.infer<typeof insertCoupleSchema>;
export type Couple = typeof couples.$inferSelect;

export type InsertQuizResponse = z.infer<typeof insertQuizResponseSchema>;
export type QuizResponse = typeof quizResponses.$inferSelect;

export const airlockMessages = pgTable("airlock_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  coupleId: varchar("couple_id").references(() => couples.id),
  senderId: varchar("sender_id"),
  senderType: text("sender_type").notNull(), // "user" | "partner" | "drponz"
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertAirlockMessageSchema = createInsertSchema(airlockMessages).omit({
  id: true,
  createdAt: true,
});

export type InsertAirlockMessage = z.infer<typeof insertAirlockMessageSchema>;
export type AirlockMessage = typeof airlockMessages.$inferSelect;
