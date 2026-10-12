import type { Knex } from 'knex';
import { USER_TABLE } from '../database-constants';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(USER_TABLE, (table) => {
    table.increments('id').notNullable();
    table.string('username').notNullable().unique();
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updatedAt').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(USER_TABLE);
}
