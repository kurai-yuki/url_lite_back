import { CreateLinkRequestDto } from '@/dtos/request/create-link.request.dto';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LinkService } from '@/link/link.service';
import { GetLinkByIdRequestDto } from '@/dtos/request/get-link-by-id.request.dto';
import { CreateShortLinkResponseDto } from '@/dtos/response/create-short-link.response.dto';
import { LinkDto } from '@/dtos/link.dto';
import { GetUserLinksByUsernameRequestDto } from '@/dtos/request/get-user-links-by-username.request.dto';
import { GetUserLinksByUsernameResponseDto } from '@/dtos/response/get-user-links-by-username.response.dto';
import { DeleteLinkRequestDto } from '@/dtos/request/delete-link.request.dto';

@Controller('link')
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Get(':id')
  async getLinkById(@Param() param: GetLinkByIdRequestDto): Promise<LinkDto> {
    return this.linkService.getLinkById(param.id);
  }

  @Get('/user/:username')
  async getUserLinksByUsername(
    @Param() param: GetUserLinksByUsernameRequestDto,
  ): Promise<GetUserLinksByUsernameResponseDto[]> {
    return this.linkService.getUserLinksByUsername(param.username);
  }

  @Post()
  async createShortLink(
    @Body() body: CreateLinkRequestDto,
  ): Promise<CreateShortLinkResponseDto> {
    return this.linkService.createShortLink(body);
  }

  @Delete(':id')
  async deleteLink(@Param() param: DeleteLinkRequestDto): Promise<void> {
    return this.linkService.deleteLinkById(param.id);
  }
}
