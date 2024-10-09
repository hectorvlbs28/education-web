import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1724442125559 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO permissions (id, name, description, created_at) VALUES
            ('PER_2l4dtuG1H4lDTOh5McdCbu2tsxW', 'create', 'Allows you to create', NOW()),
            ('PER_2l4dtusuZFh1BnrGnsZy4DfaPd6', 'update', 'Allows editing', NOW()),
            ('PER_2l4dtztTEPZmt1T9cbU53i3jcCi', 'modify', 'Allows you to modify', NOW()),
            ('PER_2l4dtxaRvVocDc36PD4fq4g9b8e', 'delete', 'Allows you to delete', NOW()),
            ('PER_2l4dtyNqPz2KeCw37JpteBvm58m', 'credit-payments', 'Verify payment information', NOW()),
            ('PER_2l4dtvsaQCal8vWKdxkKEtnKCIC', 'upload-invoices', 'Allows uploading of invoices', NOW()),
            ('PER_2l4dtsaQWX8Y78wLl7ovv5cVmMd', 'reconcile-payments', 'Consult and verify payments', NOW()),
            ('PER_2l4dtukwnzTCYH4I7IvCAL5Rz91', 'consult information', 'Check the information', NOW()),
            ('PER_2l4dtyYLAJ0QVAQSS5N39IUBoMs', 'attach', 'attaches several documents', NOW())`
    );

    await queryRunner.query(
      `INSERT INTO roles (id, name, description, status, created_at) VALUES
            ('ROL_2l4g5cfl7lY39r4rELgHql2xDQj', 'SUPER_ADMIN', 'Controls the entire application', 'ACTIVED', NOW()),
            ('ROL_2l4g5fGfQ9jfhcQrac4lZRNAOz4', 'ADMIN', 'You can only credit and verify payment information', 'ACTIVED', NOW()),
            ('ROL_2l4g5eHSvnULfjFh70JXOutf68I', 'STUDENT', 'You can only consult your information, update your information and attach documentation', 'ACTIVED', NOW())`
    );

    await queryRunner.query(
      `INSERT INTO roles_permissions (role_id, permission_id) VALUES 
            ('ROL_2l4g5cfl7lY39r4rELgHql2xDQj', 'PER_2l4dtuG1H4lDTOh5McdCbu2tsxW'),
            ('ROL_2l4g5cfl7lY39r4rELgHql2xDQj', 'PER_2l4dtxaRvVocDc36PD4fq4g9b8e'),
            ('ROL_2l4g5cfl7lY39r4rELgHql2xDQj', 'PER_2l4dtztTEPZmt1T9cbU53i3jcCi'),
            ('ROL_2l4g5cfl7lY39r4rELgHql2xDQj', 'PER_2l4dtusuZFh1BnrGnsZy4DfaPd6'),
            ('ROL_2l4g5fGfQ9jfhcQrac4lZRNAOz4', 'PER_2l4dtyNqPz2KeCw37JpteBvm58m'),
            ('ROL_2l4g5fGfQ9jfhcQrac4lZRNAOz4', 'PER_2l4dtvsaQCal8vWKdxkKEtnKCIC'),
            ('ROL_2l4g5fGfQ9jfhcQrac4lZRNAOz4', 'PER_2l4dtsaQWX8Y78wLl7ovv5cVmMd'),
            ('ROL_2l4g5fGfQ9jfhcQrac4lZRNAOz4', 'PER_2l4dtukwnzTCYH4I7IvCAL5Rz91'),
            ('ROL_2l4g5eHSvnULfjFh70JXOutf68I', 'PER_2l4dtyYLAJ0QVAQSS5N39IUBoMs'),
            ('ROL_2l4g5eHSvnULfjFh70JXOutf68I', 'PER_2l4dtusuZFh1BnrGnsZy4DfaPd6'),
            ('ROL_2l4g5eHSvnULfjFh70JXOutf68I', 'PER_2l4dtztTEPZmt1T9cbU53i3jcCi')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
