import * as dotenv from 'dotenv';
import 'reflect-metadata';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

const relative = path.join(path.relative('.', __dirname), '..');
dotenv.config({ path: `${relative}/.env` });

const options = {
  type: 'postgres',
  host: process.env.MAIN_DB_HOST,
  port: parseInt(process.env.MAIN_DB_PORT!, 10),
  username: process.env.MAIN_DB_USERNAME,
  password: process.env.MAIN_DB_PASSWORD,
  database: process.env.MAIN_DB_NAME,
  logging: process.env.MAIN_DB_LOGGING === '1',
  synchronize: process.env.MAIN_DB_SYNC === '1',
  migrationsTableName: 'migrations',
  entities: [`apps/webserver/src/modules/**/*.entity.ts`],
  migrations: [`${relative}/webserver/*-migrations*{.ts,.js}`],
};

export const AppDataSource = new DataSource(options as DataSourceOptions);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.log(options);
    console.error('Error during Data Source initialization:', err);
  });
