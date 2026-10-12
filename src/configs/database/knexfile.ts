import type { Knex } from 'knex';
import { EnvConfigService } from '../env-config.service';
import { Logger } from '@nestjs/common';
import {
  convertToCamelCase,
  convertToSnakeCase,
} from '../../utils/case-converter';

const knexConfig: Knex.Config = {
  client: 'postgresql',
  connection: EnvConfigService.get('DATABASE_URL'),
  debug: false,
  useNullAsDefault: true,
  log: {
    debug: (message) => Logger.debug(message, 'Knex-log'),
    error: (message) => Logger.error(message, 'Knex-log'),
    warn: (message) => Logger.warn(message, 'Knex-log'),
    enableColors: true,
  },
  seeds: {
    directory: './seeds',
    extension: 'ts',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
    extension: 'ts',
  },
  wrapIdentifier(value: string, origImpl) {
    return origImpl(convertToSnakeCase(value));
  },
  postProcessResponse(result: unknown) {
    if (!result) return;

    const isArray = Array.isArray(result);
    if (isArray) {
      return result.map((row: object) => convertToCamelCase(row));
    }

    return convertToCamelCase(result);
  },
};

export default knexConfig;
