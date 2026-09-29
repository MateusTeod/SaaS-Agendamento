export type CreateServiceInput = {
  tenantId: string;
  businessId: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  active: boolean;
};

export type BusinessServiceItem = {
  id: string;
  tenantId: string;
  businessId: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  active: boolean;
};

export class ServiceCatalogService {
  private readonly services = new Map<string, BusinessServiceItem>();

  createService(input: CreateServiceInput): BusinessServiceItem {
    const key = `${input.tenantId}:${input.businessId}:${input.name.toLowerCase()}`;

    if (this.services.has(key)) {
      throw new Error('Service name already exists for this business');
    }

    const item: BusinessServiceItem = {
      id: `service-${Date.now()}`,
      tenantId: input.tenantId,
      businessId: input.businessId,
      name: input.name,
      description: input.description,
      price: input.price,
      durationMinutes: input.durationMinutes,
      active: input.active,
    };

    this.services.set(key, item);
    return item;
  }
}
