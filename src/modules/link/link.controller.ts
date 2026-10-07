import { CreateLinkRequestDto } from '@/dtos/request/create-link.request.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LinkService } from '@/link/link.service';
import { getLinkByIdRequestDto } from '@/dtos/request/get-link-by-id.request.dto';
import { CreateShortLinkResponseDto } from '@/dtos/response/create-short-link.response.dto';
import { getLinkByIdResponseDto } from '@/dtos/response/get-link-by-id.response.dto';

@Controller('link')
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Get(':id')
  async getLinkById(
    @Param() param: getLinkByIdRequestDto,
  ): Promise<getLinkByIdResponseDto> {
    return this.linkService.getLinkById(param.id);
  }

  @Post()
  async createShortLink(
    @Body() body: CreateLinkRequestDto,
  ): Promise<CreateShortLinkResponseDto> {
    return this.linkService.createShortLink(body.longLink);
  }
}
