import { AuthService } from './auth.service';

describe('AuthService', () => {
  it('issues and verifies a token containing tenant and role data', () => {
    const service = new AuthService();
    const token = service.issueToken({
      sub: 'user-123',
      tenantId: 'tenant-1',
      roles: ['staff'],
    });

    expect(token).toBeTruthy();
    expect(service.verifyToken(token)).toMatchObject({
      sub: 'user-123',
      tenantId: 'tenant-1',
      roles: ['staff'],
    });
  });
});
