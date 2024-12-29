// security.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // Sanitizar query params
        if (req.query.id) {
            const id = parseInt(String(req.query.id), 10);
            req.query.id = isNaN(id) ? '0' : String(id);
        }
        next();
    }
}