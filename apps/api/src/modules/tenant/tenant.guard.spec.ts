import { TenantGuard } from './tenant.guard';

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
