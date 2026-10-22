import { BaseRepository } from '@/configs/database/base-repository';
import { LINK_TABLE } from '@/configs/database/database-constants';
import { GetLinksByFilterRequestDto } from '../../models/dtos/request/get-links-by-filter.request.dto';
import { Link } from '../../models/entities/link';
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class LinkRepository extends BaseRepository<Link> {
  protected tableName: string = LINK_TABLE;

  async filter(filter: GetLinksByFilterRequestDto): Promise<Link[]> {
    const whereBuilder = (qb: Knex.QueryBuilder) => {
      if (filter.userId) {
        qb.orWhere('createdBy', '=', filter.userId);
      }
    };

    return this.database(this.tableName).where(whereBuilder);
  }
}
