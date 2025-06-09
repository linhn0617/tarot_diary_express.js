import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { registerApiSchema } from '../schemas/userSchemas';
import * as AuthService from '../services/authService';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = registerApiSchema.parse(req.body);
    const result = await AuthService.register(validatedData);
    res.status(201).json({ message: '註冊成功', data: result });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        errors: err.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }
    res.status(500).json({ message: '註冊失敗', error: err });
  }
};
