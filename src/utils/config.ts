import { IConfig } from 'config';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv-extended';

function loadEnv(): any {
  const envPath = path.join(__dirname, '../../.env');
  if (!fs.existsSync(envPath)) {
    return process.env;
  }

  const env: any = dotenv.load({
    silent: true,
    errorOnMissing: true
  });

  return env;
}

const env = loadEnv();

const config: IConfig = {
  env: env.NODE_ENV,
  port: env.PORT,
  logs: {
    label: env.LOG_LABEL,
    level: env.LOG_LEVEL,
    filename: env.LOG_FILE,
  },
  db: {
    test: env.DB_URL_TEST,
    dev: env.DB_URL,
  }
};

export default config;