import { Response } from 'express';

export class ResponseHelper {
    public static success(res: Response, message: string, statusCode: number = 200): Response {
        console.log('[DEBUG] responseWithData called');
        return res.status(statusCode).json({
            status: 'success',
            message: message
        });
    }

    public static error(res: Response, message: string, statusCode: number = 400): Response {
        return res.status(statusCode).json({
            status: 'error',
            message: message
        });
    }

    public static validationError(res: Response, message: string, errors: any[], statusCode: number = 400): Response {
        return res.status(statusCode).json({
            status: 'error',
            message: message,
            errors: errors
        });
    }

    public static responseWithData(res: Response, message: string, data: any, statusCode: number = 200): Response {
        return res.status(statusCode).json({
            status: 'success',
            message: message,
            data: data
        });
    }
}
