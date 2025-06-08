import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { users, genderEnum } from '../database/schema';

// 用於插入用戶的 schema
export const userInsertSchema = createInsertSchema(users, {
  name: (schema) => schema.min(1, '名字不可為空').max(255, '名字長度不可超過255個字'),
  email: (schema) => schema.email('請輸入有效的Email地址').max(255),
  password: (schema) => schema.min(8, '密碼至少需要8個字元')
    .regex(/[A-Z]/, '密碼必須包含一個大寫字母')
    .regex(/[a-z]/, '密碼必須包含一個小寫字母')
    .regex(/\d/, '密碼必須包含一個數字')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, '密碼必須包含一個特殊字元')
    .optional(),
  birthDate: (schema) => schema.transform((str) => new Date(str as string)).optional(),
});

// 註冊 API 的驗證 schema
export const registerApiSchema = z.object({
    name: z.string().min(1, '名字不可為空').max(255, '名字長度不可超過255個字'),
    email: z.string().email('請輸入有效的Email地址').max(255),
    password: z.string().min(8, '密碼至少需要8個字元')
        .regex(/[A-Z]/, '密碼必須包含一個大寫字母')
        .regex(/[a-z]/, '密碼必須包含一個小寫字母')
        .regex(/\d/, '密碼必須包含一個數字'),
    birthDate: z.string().transform((str) => str ? new Date(str) : undefined),
    gender: z.enum(genderEnum.enumValues),
});

// 登入 API 的驗證 schema
export const loginApiSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

// 導出 TypeScript 類型，方便在其他地方使用
export type RegisterApiInput = z.infer<typeof registerApiSchema>;
export type LoginApiInput = z.infer<typeof loginApiSchema>;
