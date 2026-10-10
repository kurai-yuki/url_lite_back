import { CreateUserLinkRequestDto } from '@/dtos/request/create-user-link.request.dto';
import { Injectable } from '@nestjs/common';
import { UserLinkRepository } from './user-link.repository';
import { UserService } from '@/user/user.service';
import { UserLinkDto } from '@/dtos/user-link.dto';

@Injectable()
export class UserLinkService {
  constructor(
    private userLinkRepository: UserLinkRepository,
    private userService: UserService,
  ) {}

  async getUserLinksByUserId(userId: number): Promise<UserLinkDto[]> {
    const userLinks = await this.userLinkRepository.getLinksByUserId(userId);

    return userLinks.map((userLink) => ({
      id: userLink.id,
      userId: userLink.user_id,
      linkId: userLink.link_id,
    }));
  }

  async createUserLink(payload: CreateUserLinkRequestDto): Promise<void> {
    const { id } = await this.userService.getUserByUsername(payload.username);

    await this.userLinkRepository.create({
      user_id: id,
      link_id: payload.linkId,
    });
  }
}
