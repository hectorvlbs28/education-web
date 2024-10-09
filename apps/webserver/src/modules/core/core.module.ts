import { ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import * as path from 'path';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';

import { ConfigModule } from '../config/config.module';
import { databaseConfigLoader } from '../config/loaders/database.loader';
import { DatabaseConfigType } from '../config/types/database.type';
import { configLoader } from '../config/loaders/config.loader';
import { UserEntity } from './infrastruture/entities/user.entity';
import { TokenEntity } from './infrastruture/entities/token.entity';
import {
  signNowService,
  exceptionFilter,
  exceptionMapper,
  hasher,
  mailProviderService,
  transformInterceptor,
  awsService,
} from './infrastruture/constants/custom-providers';
import { StudentEntity } from './infrastruture/entities/student.entity';
import { NodeMailerType } from '../config/types/node-mailer.type';
import { ContractEntity } from './infrastruture/entities/contract.entity';
import { AttachmentEntity } from './infrastruture/entities/attachment.entity';
import { CourseEntity } from './infrastruture/entities/course.entity';
import { AddressEntity } from './infrastruture/entities/address.entity';
import { PermissionEntity } from './infrastruture/entities/permission.entity';
import { RoleEntity } from './infrastruture/entities/role.entity';
@Global()
@Module({
  exports: [hasher, mailProviderService, signNowService, awsService],
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfigLoader)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<DatabaseConfigType>('database');
        return {
          type: config.type,
          host: config.host,
          port: config.port,
          username: config.username,
          password: config.password,
          database: config.database,
          logging: config.logging,
          synchronize: config.synchronize,
          autoLoadEntities: config.autoLoadEntities,
          migrationsTableName: config.migrationsTableName,
          migrations: [process.cwd() + config.migrationsPath],
          migrationsRun: config.runMigrations,
          keepConnectionAlive: true,
          entities: [
            UserEntity,
            TokenEntity,
            StudentEntity,
            ContractEntity,
            AttachmentEntity,
            CourseEntity,
            AddressEntity,
            PermissionEntity,
            RoleEntity,
          ],
          cli: {
            migrationsDir: 'database/migration',
          },
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    ConfigModule.forRoot({
      envFilePath: path.join(__dirname.replace(/\/dist/, ''), '.env'),
      isGlobal: true,
      load: [configLoader],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const transport = configService.get<NodeMailerType>('transport');
        return {
          transport,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    hasher,
    transformInterceptor,
    exceptionFilter,
    exceptionMapper,
    mailProviderService,
    signNowService,
    awsService,
  ],
})
export class CoreModule {}
