import { db } from '../config/db'; // 根據你的 drizzle 設定引入資料庫
import { users } from '../database/schema'; // drizzle-orm 定義的 users 資料表
import { z } from 'zod';
import { registerApiSchema } from '../schemas/userSchemas';
import * as argon2 from 'argon2';

type RegisterApiData = z.infer<typeof registerApiSchema>;

export const register = async (data: RegisterApiData) => {
  const hashedPassword = await argon2.hash(data.password);
  const newUser = {
    ...data,
    birthDate: data.birthDate ? new Date(data.birthDate).toISOString().split('T')[0] : undefined,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.insert(users).values(newUser).returning();
  return result[0];
};
