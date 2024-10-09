import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1724197514879 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE courses SET "course_category" = 'SPECIALTY' 
            WHERE "id" = 'COR_2kIueZfQb0Wcd53AJKJ08zArhFV'`
    );
    await queryRunner.query(
      `UPDATE courses SET "course_category" = 'NORMAL' 
            WHERE "id" = 'COR_2kIueZw1rZJ8oyPSd9oLExse5B9'`
    );
    await queryRunner.query(
      `UPDATE courses SET "course_category" = 'NORMAL' 
            WHERE "id" = 'COR_2kIueWG6vLzEOopH4bG2qu4bHrX'`
    );
    await queryRunner.query(
      `UPDATE courses SET "course_category" = 'NORMAL' 
            WHERE "id" = 'COR_2kIueYKMGGiWsEhg35UI6g2LHA8'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
