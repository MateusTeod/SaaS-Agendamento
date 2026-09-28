export type AuthTokenPayload = {
  sub: string;
  tenantId: string;
  roles: string[];
};

export class AuthService {
  private readonly secret = 'development-secret-key';

  issueToken(payload: AuthTokenPayload): string {
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
    return `mock.${encodedPayload}.signature`;
  }

  verifyToken(token: string): AuthTokenPayload {
    const parts = token.split('.');

    if (parts.length < 3 || parts[0] !== 'mock') {
      throw new Error('Invalid token');
    }

    const decoded = Buffer.from(parts[1], 'base64url').toString('utf-8');
    return JSON.parse(decoded) as AuthTokenPayload;
  }
}
