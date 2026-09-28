import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        tenantId?: string;
        [key: string]: unknown;
      };
    }
  }
}

@Injectable()
export class TenantContextMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'];

    req.user = {
      ...(req.user ?? {}),
      tenantId: typeof tenantId === 'string' ? tenantId : undefined,
    };

    next();
  }
}
