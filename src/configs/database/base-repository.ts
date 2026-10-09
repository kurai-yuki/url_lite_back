import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

@Injectable()
export class BaseRepository<T> {
  protected tableName: string = '';

  constructor(
    @InjectConnection()
    protected readonly database: Knex,
  ) {}

  async get(): Promise<T[]> {
    return this.database(this.tableName).select();
  }

  async getById(id: string | number): Promise<T | undefined> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.database(this.tableName).select().where('id', id).first();
  }

  async create(data: Partial<T>): Promise<void> {
    return this.database(this.tableName).insert(data);
  }

  async update(id: string | number, data: Partial<T>): Promise<number> {
    return this.database(this.tableName).update(data).where('id', id);
  }

  async delete(id: string | number): Promise<number> {
    return this.database(this.tableName).delete().where('id', id);
  }
}
