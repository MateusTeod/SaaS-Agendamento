import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const requestTenantId = request.headers?.['x-tenant-id'];
    const userTenantId = request.user?.tenantId;

    if (!requestTenantId || !userTenantId) {
      return false;
    }

    return requestTenantId === userTenantId;
  }
}
