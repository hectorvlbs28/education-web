import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1724707328117 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users (id, created_at, name, email, password) VALUES 
            (
                'USR_2lDHKHxT5ZfGspCh0idP0KmcCUG', 
                NOW(), 
                'Issac Francois Eguia Estrada', 
                'escolar@ifashion.edu.mx', 
                '$2a$10$X6LBwDNHXMprK0aBMgLs.e2hD9.NBJpILPlmzN1q.Tu28y4Dyhux.'
            )`
    );

    await queryRunner.query(
      `INSERT INTO user_roles (user_id, role_id) VALUES ('USR_2lDHKHxT5ZfGspCh0idP0KmcCUG', 'ROL_2l4g5cfl7lY39r4rELgHql2xDQj')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
