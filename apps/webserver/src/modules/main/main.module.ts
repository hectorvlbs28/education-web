import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { CoreModule } from '../core/core.module';
import { options } from '../config/options/config.options';
import { ConfigModule } from '../config/config.module';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../tokens/token.module';
import { StudentModule } from '../students/student.module';
import { StripeModule } from '../stripe/stripe.module';
import { RoleModule } from '../roles/role.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(options),
    CoreModule,
    UserModule,
    TokenModule,
    StudentModule,
    StripeModule,
    RoleModule,
  ],
})
export class MainModule {}
