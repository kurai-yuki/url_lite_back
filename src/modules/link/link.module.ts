import { Module } from '@nestjs/common';
import { LinkController } from '@/link/link.controller';
import { LinkService } from '@/link/link.service';
import { LinkRepository } from '@/link/link.repository';
import { UserLinkModule } from '@/user-link/user-link.module';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [UserLinkModule, UserModule],
  controllers: [LinkController],
  providers: [LinkService, LinkRepository],
  exports: [LinkService],
})
export class LinkModule {}
