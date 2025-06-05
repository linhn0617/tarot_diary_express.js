import { pgTable, serial, varchar, text, timestamp, date, integer, pgEnum, boolean } from 'drizzle-orm/pg-core'

export const genderEnum = pgEnum('gender', ['male', 'female', 'other']);
export const socialAccountProviderEnum = pgEnum('social_account_provider', ['google', 'facebook']);
export const tarotElementTypeEnum = pgEnum('tarot_element_type', ['fire', 'water', 'air', 'earth']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password'),
  birthDate: date('birth_date'),
  gender: genderEnum('gender'),
  emailVerifiedAt: timestamp('email_verified_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const userSocialAccounts = pgTable('user_social_accounts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  provider: socialAccountProviderEnum('provider').notNull(),
  providerId: varchar('provider_id', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const tarots = pgTable('tarots', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 10 }).notNull(),
  element: tarotElementTypeEnum('element').notNull(),
  imagePath: text('image_path').notNull(),
});

export const tarotSpecifications = pgTable('tarot_specifications', {
  id: serial('id').primaryKey(),
  tarotId: integer('tarot_id').notNull().references(() => tarots.id, { onDelete: 'cascade' }),
  isUpright: boolean('is_upright').notNull(),
  message1: varchar('message1', { length: 255 }),
  message2: varchar('message2', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const diaries = pgTable('diaries', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  tarotSpecificationId: integer('tarot_specification_id').notNull().references(() => tarotSpecifications.id, { onDelete: 'cascade' }),
  userEntryText: text('user_entry_text').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});