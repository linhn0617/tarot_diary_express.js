import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { registerApiSchema } from '../schemas/userSchemas';
import * as AuthService from '../services/authService';
import { ResponseHelper } from '../helpers/apiResponseFormatter';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = registerApiSchema.parse(req.body);
    const result = await AuthService.register(validatedData);
    ResponseHelper.success(res, '註冊成功，請至信箱點選驗證信以開通帳戶', 201);
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = err.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      ResponseHelper.validationError(res, '資料驗證失敗', errors);
    }

    if ((err as any).cause?.code === '23505') {
      ResponseHelper.error(res, '該電子郵件已被註冊，請使用其他電子郵件註冊或登入', 409);
    }

    ResponseHelper.error(res, '註冊失敗', 500);
  }
};

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
      ResponseHelper.error(res, '信箱驗證失敗，', 400);
      return;
    }

    await AuthService.verifyEmail(token);

    ResponseHelper.success(res, '信箱驗證成功');
  } catch (error) {
    ResponseHelper.error(res, '信箱驗證失敗', 400);
  }
};