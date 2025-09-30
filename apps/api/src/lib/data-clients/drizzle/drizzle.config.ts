import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Config } from 'drizzle-kit';
import { defineConfig } from 'drizzle-kit';
import { AppSettings } from '~/lib';

const CURRENT_DIR = path.relative(
  process.cwd(),
  path.dirname(fileURLToPath(import.meta.url))
);

const environment = AppSettings.get('ENVIRONMENT');

const config: Config = {
  dbCredentials: {
    host: AppSettings.get('DATABASE_HOST')!,
    port: Number(AppSettings.get('DATABASE_PORT')!),
    user: AppSettings.get('DATABASE_USER')!,
    password: AppSettings.get('DATABASE_PASSWORD')!,
    database: AppSettings.get('DATABASE_NAME')!,
    ssl: {
      rejectUnauthorized: true,
      ca: AppSettings.get('DATABASE_CA_CERT')
    }
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
