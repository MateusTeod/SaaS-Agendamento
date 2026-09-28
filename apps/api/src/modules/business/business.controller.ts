import { Body, Controller, Post } from '@nestjs/common';
import { BusinessService } from './business.service';

export class CreateBusinessDto {
  name = '';
  slug = '';
  segment = '';
  tenantId = '';
  ownerId = '';
}

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  create(@Body() dto: CreateBusinessDto) {
    return this.businessService.createBusiness(dto);
  }
}
