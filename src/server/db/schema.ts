// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  integer,
  numeric,
  boolean
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `mathisfun_${name}`);

export const mathProblems = createTable(
  "math_problems",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
    url: varchar("url", { length: 256 }).notNull(),
    graderId: varchar("grader_id", {length: 256}).notNull().default("number"),
    gs: integer("gs").notNull(),
    solved_user_count: integer("solved_user_count").notNull().default(0),
    answer: varchar("answer", { length: 256 }).notNull(),
    visibility: integer("visibility").notNull().default(0), // lower = public, higher = need roles to see
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);

export const submissions = createTable(
  "math_submissions",
  {
    id: serial("id").primaryKey(),
    userId: varchar("userid", {length: 256}).notNull(),
    problemId: integer("problem_id").notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    pass: boolean("pass").notNull(),
  }
);
export const solved_math_problem = createTable(
  "solved_math_problem",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", {length: 256}).notNull(),
    problemId: integer("problemid").notNull(),
    firstSolvedAt: timestamp("first_solved_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    lastSolvedAt: timestamp("last_solved_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    solved_count: integer("solved_count").notNull().default(0),
  }
);

export const users = createTable(
  "users",
  {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 256 }).notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }),
    imageUrl: varchar("image_url", { length: 256 }),
    point: integer("point").notNull().default(0),
    rank: integer("rank").notNull().default(0),
    solved: integer("solved").notNull().default(0),
    gs: integer("gs").notNull().default(100),
    role: integer("role").notNull().default(0)
  }
)