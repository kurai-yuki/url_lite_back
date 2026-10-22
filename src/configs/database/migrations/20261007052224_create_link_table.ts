import type { Knex } from 'knex';
import { LINK_TABLE, USER_TABLE } from '../database-constants';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(LINK_TABLE, (table) => {
    table.string('id').notNullable().unique();
    table.string('original_link').notNullable();
    table.string('short_link').notNullable();
    table
      .integer('created_by')
      .references('id')
      .inTable(USER_TABLE)
      .onDelete('CASCADE')
      .notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(LINK_TABLE);
}
