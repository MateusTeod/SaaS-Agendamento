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
    const normalizedSlug = input.slug.trim().toLowerCase();
    const tenantKey = `${input.tenantId}:${normalizedSlug}`;

    if (this.businesses.has(tenantKey)) {
      throw new Error('Slug already exists for this tenant');
    }

    const business: Business = {
      id: `business-${Date.now()}-${this.businesses.size}`,
      name: input.name.trim(),
      slug: normalizedSlug,
      segment: input.segment.trim().toLowerCase(),
      tenantId: input.tenantId,
      ownerId: input.ownerId,
      status: 'draft',
    };

    this.businesses.set(tenantKey, business);

    return business;
  }

  findBySlug(tenantId: string, slug: string): Business | undefined {
    return this.businesses.get(`${tenantId}:${slug.trim().toLowerCase()}`);
  }
}
