import { drizzle } from 'drizzle-orm/node-postgres';
import type { PoolConfig } from 'pg';
import { Pool } from 'pg';
import credentials from './credentials';
import { logger } from './logger';
import * as schema from './schemas';

const { database, host, password, port, ssl, user } = credentials();

const config: PoolConfig = {
  connectionTimeoutMillis: 10000,
  database,
  host,
  idleTimeoutMillis: 30000,
  password,
  port,
  ssl,
  max: 20,
  user
};

const pool = new Pool(config);

export const db = drizzle(pool, { logger, schema });
