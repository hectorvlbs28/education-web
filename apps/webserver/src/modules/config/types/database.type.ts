export type DatabaseConfigType = {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  logging: boolean;
  synchronize: boolean;
  autoLoadEntities: boolean;
  migrationsTableName: string;
  migrationsPath: string;
  runMigrations: boolean;
};
