import { ServiceCatalogService } from './service.service';

describe('ServiceCatalogService', () => {
  it('creates a service with tenant ownership and duration tracking', () => {
    const service = new ServiceCatalogService();

    const item = service.createService({
      tenantId: 'tenant-1',
      businessId: 'business-1',
      name: 'Corte Masculino',
      description: 'Corte clássico e acabamento',
      price: 45,
      durationMinutes: 45,
      active: true,
    });

    expect(item).toMatchObject({
      tenantId: 'tenant-1',
      businessId: 'business-1',
      name: 'Corte Masculino',
      price: 45,
      durationMinutes: 45,
      active: true,
    });
  });

  it('prevents duplicate service names inside the same tenant and business', () => {
    const service = new ServiceCatalogService();

    service.createService({
      tenantId: 'tenant-1',
      businessId: 'business-1',
      name: 'Barba',
      description: 'Barba completa',
      price: 30,
      durationMinutes: 30,
      active: true,
    });

    expect(() =>
      service.createService({
        tenantId: 'tenant-1',
        businessId: 'business-1',
        name: 'Barba',
        description: 'Outra barba',
        price: 35,
        durationMinutes: 40,
        active: true,
      }),
    ).toThrow('Service name already exists for this business');
  });
});
