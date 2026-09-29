import { TenantGuard } from './tenant.guard';
import { TenantContextMiddleware } from './tenant-context.middleware';
import { AuthService } from '../auth/auth.service';

describe('TenantGuard', () => {
  it('allows when the request tenant matches the user context', () => {
    const guard = new TenantGuard();

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { tenantId: 'tenant-1' },
          headers: { 'x-tenant-id': 'tenant-1' },
        }),
      }),
    };

    expect(guard.canActivate(context as any)).toBe(true);
  });

  it('rejects when the request tenant does not match the user context', () => {
    const guard = new TenantGuard();

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { tenantId: 'tenant-1' },
          headers: { 'x-tenant-id': 'tenant-2' },
        }),
      }),
    };

    expect(guard.canActivate(context as any)).toBe(false);
  });
});

describe('TenantContextMiddleware', () => {
  it('uses tenant and user identity from the bearer token', () => {
    const middleware = new TenantContextMiddleware(new AuthService());
    const request = {
      headers: {
        authorization: `Bearer ${new AuthService().issueToken({ sub: 'user-1', tenantId: 'tenant-1', roles: ['owner'] })}`,
        'x-tenant-id': 'tenant-2',
      },
    } as any;

    middleware.use(request, {} as any, () => undefined);

    expect(request.user).toMatchObject({ sub: 'user-1', tenantId: 'tenant-1', roles: ['owner'] });
  });
});
