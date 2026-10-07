import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/configs/database/base-repository.service';
import { USER_TABLE } from '@/configs/database/database-constants';
import { User } from '@/entities/user';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  protected tableName: string = USER_TABLE;

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.database<User>(this.tableName)
      .select()
      .where('username', username)
      .first();
  }
}
