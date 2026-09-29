import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';

declare global {
  namespace Express {
    interface Request {
      user?: {
        sub?: string;
        tenantId?: string;
        roles?: string[];
        [key: string]: unknown;
      };
    }
  }
}

@Injectable()
export class TenantContextMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(req: Request, _res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    const token = authorization?.startsWith('Bearer ')
      ? authorization.slice('Bearer '.length)
      : undefined;
    const tokenUser = token ? this.readToken(token) : undefined;
    const headerTenantId = req.headers['x-tenant-id'];

    req.user = {
      ...(req.user ?? {}),
      ...tokenUser,
      tenantId: tokenUser?.tenantId ?? (typeof headerTenantId === 'string' ? headerTenantId : undefined),
    };

    next();
  }

  private readToken(token: string) {
    try {
      return this.authService.verifyToken(token);
    } catch {
      return undefined;
    }
  }
}
