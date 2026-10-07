import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { KnexModule } from 'nest-knexjs';
import knexConfig from '@/configs/database/knexfile';
import { MainModule } from './modules/main.module';

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
    MainModule,
  ],
})
export class AppModule {}
