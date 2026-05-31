import { relations } from "drizzle-orm";
import {
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const postStatusEnum = pgEnum("post_status", [
  "pending",
  "failed",
  "published",
]);

export const posts = pgTable(
  "posts",
  {
    id: text("id").primaryKey(),
    title: varchar("title", { length: 100 }).notNull(),
    body: text("body").notNull(),
    userId: text("user_id")
      .references(() => user.id)
      .notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
    status: postStatusEnum("status").default("pending").notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" })
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index("title_idx").onOnly(table.title)],
);

export const comments = pgTable("comments", {
  id: text("id").primaryKey(),
  comment: text("comment").notNull(),
  postId: text("post_id")
    .references(() => posts.id)
    .notNull(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// Relations
export const usersRelations = relations(user, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  posts: one(posts, {
    references: [posts.id],
    fields: [comments.postId],
  }),
  users: one(user, {
    references: [user.id],
    fields: [comments.userId],
  }),
}));

export const postRelations = relations(posts, ({ one, many }) => ({
  user: one(user, {
    references: [user.id],
    fields: [posts.userId],
  }),
  comments: many(comments),
}));
