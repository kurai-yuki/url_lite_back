import { Injectable, NotFoundException } from '@nestjs/common';
import { LinkRepository } from '@/link/link.repository';
import { generateRandomLinkId } from '../../utils';
import { EnvConfigService } from '@/configs/env-config.service';
import { CreateShortLinkResponseDto } from '@/dtos/response/create-short-link.response.dto';
import { UserLinkService } from '@/user-link/user-link.service';
import { CreateLinkRequestDto } from '@/dtos/request/create-link.request.dto';
import { LinkDto } from '@/dtos/link.dto';
import { GetUserLinksByUsernameResponseDto } from '@/dtos/response/get-user-links-by-username.response.dto';
import { UserService } from '@/user/user.service';

@Injectable()
export class LinkService {
  constructor(
    private linkRepository: LinkRepository,
    private userService: UserService,
    private userLinkService: UserLinkService,
  ) {}

  async getLinkById(id: string): Promise<LinkDto> {
    const link = await this.linkRepository.getById(id);

    if (!link) {
      throw new NotFoundException('Link with this id not found!');
    }

    const { id: linkId, originalLink, shortLink } = link;

    return {
      id: linkId,
      originalLink,
      shortLink,
    };
  }

  async getUserLinksByUsername(
    username: string,
  ): Promise<GetUserLinksByUsernameResponseDto[]> {
    const user = await this.userService.getUserByUsername(username);

    const userLinks = await this.userLinkService.getUserLinksByUserId(user.id);
    const linkIds = userLinks.map((userLink) => userLink.linkId);

    const links = await this.linkRepository.getLinksByBatch(linkIds);

    return links.map((link) => ({
      id: link.id,
      originalLink: link.originalLink,
      shortLink: link.shortLink,
    }));
  }

  async createShortLink(
    payload: CreateLinkRequestDto,
  ): Promise<CreateShortLinkResponseDto> {
    let id = generateRandomLinkId();

    while (true) {
      const alredyExists = await this.linkRepository.getById(id);

      if (!alredyExists) {
        break;
      }

      id = generateRandomLinkId();
    }
    const baseUrl = EnvConfigService.get('FRONT_URL');

    await this.linkRepository.create({
      id,
      originalLink: payload.longLink,
      shortLink: `${baseUrl}/${id}`,
    });

    await this.userLinkService.createUserLink({
      linkId: id,
      username: payload.username,
    });

    return {
      id,
      originalLink: payload.longLink,
      shortLink: `${baseUrl}/${id}`,
    };
  }

  async deleteLinkById(id: string): Promise<void> {
    await this.linkRepository.delete(id);
  }
}
