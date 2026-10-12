import { Module } from '@nestjs/common';
import { UserLinkRepository } from './user-link.repository';
import { UserLinkService } from './user-link.service';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [UserModule],
  providers: [UserLinkRepository, UserLinkService],
  exports: [UserLinkService],
})
export class UserLinkModule {}
