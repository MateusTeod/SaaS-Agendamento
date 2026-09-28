import { BusinessService } from './business.service';

describe('BusinessService', () => {
  it('creates a business with a tenant-scoped slug', () => {
    const service = new BusinessService();

    const business = service.createBusiness({
      name: 'João Barber',
      slug: 'joao-barber',
      segment: 'barbearia',
      tenantId: 'tenant-1',
      ownerId: 'user-1',
    });

    expect(business).toMatchObject({
      name: 'João Barber',
      slug: 'joao-barber',
      segment: 'barbearia',
      tenantId: 'tenant-1',
      ownerId: 'user-1',
      status: 'draft',
    });
  });

  it('prevents duplicate slugs inside the same tenant', () => {
    const service = new BusinessService();

    service.createBusiness({
      name: 'João Barber',
      slug: 'joao-barber',
      segment: 'barbearia',
      tenantId: 'tenant-1',
      ownerId: 'user-1',
    });

    expect(() =>
      service.createBusiness({
        name: 'Outro Nome',
        slug: 'joao-barber',
        segment: 'cabeleireiro',
        tenantId: 'tenant-1',
        ownerId: 'user-2',
      }),
    ).toThrow('Slug already exists for this tenant');
  });
});
