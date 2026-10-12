import type { Knex } from 'knex';
import { LINK_TABLE } from '../database-constants';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(LINK_TABLE, (table) => {
    table.string('id').notNullable().unique();
    table.string('original_link').notNullable();
    table.string('short_link').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updatedAt').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(LINK_TABLE);
}
