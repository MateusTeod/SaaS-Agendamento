import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { BusinessController } from './modules/business/business.controller';
import { BusinessModule } from './modules/business/business.module';
import { TenantContextMiddleware } from './modules/tenant/tenant-context.middleware';
import { TenantModule } from './modules/tenant/tenant.module';

@Module({
  imports: [AuthModule, TenantModule, BusinessModule],
  controllers: [AppController, AuthController, BusinessController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantContextMiddleware).forRoutes('*');
  }
}
