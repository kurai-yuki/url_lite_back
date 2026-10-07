import knexConfig from '@/configs/database/knexfile';
import { LinkModule } from '@/link/link.module';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { KnexModule } from 'nest-knexjs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KnexModule.forRoot({
      config: knexConfig,
      retryAttempts: 3,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          limit: 10, // number of request per second
          ttl: 60000, // seconds per request
        },
      ],
    }),
    UserModule,
    LinkModule,
  ],
})
export class AppModule {}
