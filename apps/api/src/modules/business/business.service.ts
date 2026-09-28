export type BusinessCreateInput = {
  name: string;
  slug: string;
  segment: string;
  tenantId: string;
  ownerId: string;
};

export type Business = {
  id: string;
  name: string;
  slug: string;
  segment: string;
  tenantId: string;
  ownerId: string;
  status: 'draft' | 'active';
};

export class BusinessService {
  private readonly businesses = new Map<string, Business>();

  createBusiness(input: BusinessCreateInput): Business {
    const tenantKey = `${input.tenantId}:${input.slug.toLowerCase()}`;

    if (this.businesses.has(tenantKey)) {
      throw new Error('Slug already exists for this tenant');
    }

    const business: Business = {
      id: `business-${Date.now()}`,
      name: input.name,
      slug: input.slug.toLowerCase(),
      segment: input.segment,
      tenantId: input.tenantId,
      ownerId: input.ownerId,
      status: 'draft',
    };

    this.businesses.set(tenantKey, business);

    return business;
  }
}
