import type { Knex } from 'knex';
import { LINK_TABLE } from '../database-constants';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(LINK_TABLE, (table) => {
    table.string('id').notNullable();
    table.string('original_link').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(LINK_TABLE);
}
