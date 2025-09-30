import { drizzle } from 'drizzle-orm/node-postgres';
import type { PoolConfig } from 'pg';
import { Pool } from 'pg';
import { AppSettings } from '~/lib';
import { logger } from './logger';
import * as schema from './schemas';

const config: PoolConfig = {
  host: AppSettings.get('DATABASE_HOST'),
  port: Number(AppSettings.get('DATABASE_PORT')),
  user: AppSettings.get('DATABASE_USER'),
  password: AppSettings.get('DATABASE_PASSWORD'),
  database: AppSettings.get('DATABASE_NAME'),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  ssl: {
    rejectUnauthorized: true,
    ca: AppSettings.get('DATABASE_CA_CERT')
  }
};

const pool = new Pool(config);

export const db = drizzle(pool, { logger, schema });
