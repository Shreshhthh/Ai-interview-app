import { serial, text, pgTable, varchar } from "drizzle-orm/pg-core";

export const AiInterview = pgTable('ai-interview', {
    id: serial('id').primaryKey(),
    jsonMockResponse: text('jsonMockResponse').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDesc: varchar('jobDesc').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    mockId: varchar('mockId').notNull()
  });

export const UserAnswer =pgTable('userAnswer',{
  id:serial('id').primaryKey(),
  mockIdRef: varchar('mockId').notNull(),
  question: varchar('question').notNull(),
  correctAns: text('correctAns'),
  userAns: text('userAns'),
  feedback: text('feedback').notNull(),
  rating: varchar('rating').notNull(),
  userEmail: varchar('userEmail'),
  createdAt: varchar('createdAt')
})