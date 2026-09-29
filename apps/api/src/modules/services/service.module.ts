import { Module } from '@nestjs/common';
import { ServiceCatalogService } from './service.service';

@Module({
  providers: [ServiceCatalogService],
  exports: [ServiceCatalogService],
})
export class ServiceModule {}
