import { Module } from '@nestjs/common';
import { LinkController } from '@/link/link.controller';
import { LinkService } from '@/link/link.service';
import { LinkRepository } from '@/link/link.repository';

@Module({
  controllers: [LinkController],
  providers: [LinkService, LinkRepository],
})
export class LinkModule {}
