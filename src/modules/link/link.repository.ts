import { BaseRepository } from '@/configs/database/base-repository';
import { LINK_TABLE } from '@/configs/database/database-constants';
import { Link } from '@/entities/link';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LinkRepository extends BaseRepository<Link> {
  protected tableName: string = LINK_TABLE;

  async getLinksByBatch(ids: string[]): Promise<Link[]> {
    return this.database(this.tableName).whereIn('id', ids);
  }
}
