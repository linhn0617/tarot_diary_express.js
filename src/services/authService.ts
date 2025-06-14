import { db } from '../config/db';
import { users } from '../database/schema';
import { z } from 'zod';
import { registerApiSchema } from '../schemas/userSchemas';
import * as argon2 from 'argon2';
import { generateEmailVerifyToken } from '../helpers/jwt';
import { sendVerificationEmail } from './emailService';
import { eq } from 'drizzle-orm';
import { verifyEmailToken } from '../helpers/jwt';

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
  const createdUser = result[0];

  // 產生驗證信的 token
  const token = generateEmailVerifyToken(createdUser.id);

  // 發送驗證信
  try {
    await sendVerificationEmail(createdUser.email, token);
  } catch (emailError) {
    console.error('寄送驗證信失敗', emailError);
  }
  
  return createdUser;
};

export async function verifyEmail(token: string) {
  const { userId } = verifyEmailToken(token);

  const result = await db.update(users)
    .set({ emailVerifiedAt: new Date() })
    .where(eq(users.id, userId))
    .returning();

  return result[0];
}
