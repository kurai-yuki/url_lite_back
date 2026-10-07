import { Injectable, NotFoundException } from '@nestjs/common';
import { LinkRepository } from '@/link/link.repository';
import { generateRandomLinkId } from '../../utils';
import { EnvConfigService } from '@/configs/env-config.service';
import { CreateShortLinkResponseDto } from '@/dtos/response/create-short-link.response.dto';
import { getLinkByIdResponseDto } from '@/dtos/response/get-link-by-id.response.dto';

@Injectable()
export class LinkService {
  constructor(private linkRepository: LinkRepository) {}

  async getLinkById(id: string): Promise<getLinkByIdResponseDto> {
    const link = await this.linkRepository.getById(id);

    if (!link) {
      throw new NotFoundException('Link with this id not found!');
    }

    const { id: linkId, original_link } = link;
    return {
      id: linkId,
      originalLink: original_link,
    };
  }

  async createShortLink(longLink: string): Promise<CreateShortLinkResponseDto> {
    let id = generateRandomLinkId();

    while (true) {
      const alredyExists = await this.linkRepository.getById(id);

      if (!alredyExists) {
        break;
      }

      id = generateRandomLinkId();
    }

    await this.linkRepository.create({
      id,
      original_link: longLink,
    });

    const baseUrl = EnvConfigService.get('FRONT_URL');

    return {
      originalLink: longLink,
      shortLink: `${baseUrl}/${id}`,
    };
  }
}
