import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const envFilePath = (fileName: string) => {
  return path.resolve(__dirname, `../../${fileName}`);
};

if (fs.existsSync(envFilePath('.env'))) {
  config({ path: '.env' });

  const envFile = `.env.${process.env.NODE_ENV}`;

  if (fs.existsSync(envFilePath(envFile))) {
    config({ path: envFile, override: true });
  }
}

const EnvVars = [
  'APP_REGION',
  'DATABASE_CA_CERT',
  'DATABASE_URL',
  'ENVIRONMENT',
  'LOG_LEVEL',
  'PORT'
] as const;

export type EnvVar = (typeof EnvVars)[number];

export const AppSettings = {
  get(envVar: EnvVar): string | undefined {
    if (envVar === 'ENVIRONMENT') {
      return process.env.NODE_ENV ?? '';
    }

    if (envVar === 'APP_REGION') {
      return process.env.APP_REGION ?? '';
    }

    return process.env[envVar] ?? '';
  },

  isTrue(envVar: EnvVar) {
    return this.get(envVar)?.toLowerCase() === 'true';
  },

  isDev() {
    return process.env.NODE_ENV === 'dev';
  },

  isProd() {
    return process.env.NODE_ENV === 'prod';
  },

  isStaske() {
    return process.env.NODE_ENV === 'staske';
  }
};
