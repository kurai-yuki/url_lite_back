import { CreateLinkRequestDto } from '@/dtos/request/create-link.request.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { LinkService } from '@/link/link.service';
import { IdRequestDto } from '@/dtos/request/id.request.dto';
import { LinkResponseDto } from '@/dtos/response/link.response.dto';
import { GetLinksByFilterRequestDto } from '@/dtos/request/get-links-by-filter.request.dto';

@Controller('link')
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Get()
  async getLinksByFilter(
    @Query() params: GetLinksByFilterRequestDto,
  ): Promise<LinkResponseDto[]> {
    return this.linkService.filter(params);
  }

  @Get(':id')
  async getLinkById(
    @Param() param: IdRequestDto,
  ): Promise<LinkResponseDto> {
    return this.linkService.getLinkById(param.id);
  }

  @Post()
  async createShortLink(
    @Body() body: CreateLinkRequestDto,
  ): Promise<LinkResponseDto> {
    return this.linkService.createShortLink(body);
  }

  @Delete(':id')
  async deleteLink(@Param() param: IdRequestDto): Promise<void> {
    return this.linkService.deleteLinkById(param.id);
  }
}
