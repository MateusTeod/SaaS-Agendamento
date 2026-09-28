export const APP_NAME = 'saas-agendamento';

export type TenantContext = {
  tenantId: string;
  userId: string;
  roles: string[];
};

export function getAppVersion(): string {
  return '0.1.0';
}
