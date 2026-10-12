import type { Knex } from 'knex';
import { LINK_TABLE, USER_LINK_TABLE, USER_TABLE } from '../database-constants';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(USER_LINK_TABLE, (table) => {
    table.increments('id').notNullable();
    table
      .string('link_id')
      .notNullable()
      .references('id')
      .inTable(LINK_TABLE)
      .onDelete('CASCADE');
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable(USER_TABLE)
      .onDelete('CASCADE');
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updatedAt').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(USER_LINK_TABLE);
}
