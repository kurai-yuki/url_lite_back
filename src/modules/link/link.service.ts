import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { LinkRepository } from '@/link/link.repository';
import { EnvConfigService } from '@/configs/env-config.service';
import { CreateLinkRequestDto } from '@/dtos/request/create-link.request.dto';
import { UserService } from '@/user/user.service';
import { plainToInstance } from 'class-transformer';
import { LinkResponseDto } from '@/dtos/response/link.response.dto';
import { GetLinksByFilterRequestDto } from '@/dtos/request/get-links-by-filter.request.dto';
import { generateRandomLinkId } from '../../utils';

@Injectable()
export class LinkService {
  constructor(
    private linkRepository: LinkRepository,
    private userService: UserService,
  ) {}

  async filter(
    payload: GetLinksByFilterRequestDto,
  ): Promise<LinkResponseDto[]> {
    const links = await this.linkRepository.filter(payload);

    return plainToInstance(LinkResponseDto, links);
  }

  async getLinkById(id: string): Promise<LinkResponseDto> {
    const link = await this.linkRepository.getById(id);

    if (!link) {
      throw new NotFoundException('Link não encontrado!', {
        description: 'Link with this id not found!',
      });
    }

    return plainToInstance(LinkResponseDto, link);
  }

  async createShortLink(
    payload: CreateLinkRequestDto,
  ): Promise<LinkResponseDto> {
    let id = generateRandomLinkId();
    const user = await this.userService.getUserByUsername(payload.username);
    const baseUrl = EnvConfigService.get('FRONT_URL');

    while (true) {
      const alredyExists = await this.linkRepository.getById(id);

      if (!alredyExists) {
        break;
      }

      id = generateRandomLinkId();
    }

    const link = {
      id,
      originalLink: payload.longLink,
      shortLink: `${baseUrl}/${id}`,
      createdBy: user.id,
    };

    try {
      await this.linkRepository.create(link);

      return link;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao tentar salvar link!');
    }
  }

  async deleteLinkById(id: string): Promise<void> {
    await this.getLinkById(id);

    await this.linkRepository.delete(id);
  }
}
