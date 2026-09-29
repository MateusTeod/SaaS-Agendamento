import { Body, Controller, Post } from '@nestjs/common';
import { ServiceCatalogService } from './service.service';

export class CreateServiceDto {
  tenantId = '';
  businessId = '';
  name = '';
  description = '';
  price = 0;
  durationMinutes = 0;
  active = true;
}

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceCatalogService: ServiceCatalogService) {}

  @Post()
  create(@Body() dto: CreateServiceDto) {
    return this.serviceCatalogService.createService(dto);
  }
}
