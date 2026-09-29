import { BadRequestException, Body, Controller, Get, Headers, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './business.dto';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  create(@Body() dto: CreateBusinessDto, @Req() request: Request) {
    const tenantId = request.user?.tenantId;
    const ownerId = request.user?.sub;

    if (!tenantId || !ownerId) {
      throw new BadRequestException('Authenticated tenant and user are required');
    }

    return this.businessService.createBusiness({
      ...dto,
      tenantId,
      ownerId,
    });
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string, @Headers('x-tenant-id') headerTenantId?: string, @Req() request?: Request) {
    const tenantId = request?.user?.tenantId ?? headerTenantId;

    if (!tenantId) {
      throw new BadRequestException('Tenant context is required');
    }

    return this.businessService.findBySlug(tenantId, slug);
  }
}
