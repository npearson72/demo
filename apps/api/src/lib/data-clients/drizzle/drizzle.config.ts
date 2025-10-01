import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Config } from 'drizzle-kit';
import { defineConfig } from 'drizzle-kit';
import { AppSettings } from '~/lib';
import credentials from './credentials';

const CURRENT_DIR = path.relative(
  process.cwd(),
  path.dirname(fileURLToPath(import.meta.url))
);

const environment = AppSettings.get('ENVIRONMENT');

const { database, host, password, port, ssl, user } = credentials();

const config: Config = {
  dbCredentials: {
    database,
    host,
    password,
    port,
    ssl,
    user
  },
  dialect: 'postgresql',
  migrations: {
    table: `__drizzle_migrations_${environment}`,
    prefix: 'timestamp'
  },
  out: `${CURRENT_DIR}/migrations`,
  schema: `${CURRENT_DIR}/schemas/index.ts`,
  verbose: true
};

export default defineConfig(config);
