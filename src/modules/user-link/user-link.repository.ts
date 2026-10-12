import { BaseRepository } from '@/configs/database/base-repository';
import { USER_LINK_TABLE } from '@/configs/database/database-constants';
import { UserLink } from '@/entities/user-link';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserLinkRepository extends BaseRepository<UserLink> {
  protected tableName: string = USER_LINK_TABLE;

  async getLinksByUserId(userId: number): Promise<UserLink[]> {
    return this.database(this.tableName).select().where('user_id', userId);
  }
}
