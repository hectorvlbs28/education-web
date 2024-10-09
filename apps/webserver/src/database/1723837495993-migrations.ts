import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1723837495993 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE courses SET "start_date" = '[{
                "name": "Curso Lectra",
                "start_date": "sábado 19 de octubre",
                "format": "presencial"
            },
            {
                "name": "Curso Lectra",
                "start_date": "en cualquier momento",
                "format": "en línea"
            }]' 
            WHERE "id" = 'COR_2kIueYKMGGiWsEhg35UI6g2LHA8'`
    );
    await queryRunner.query(
      `UPDATE courses SET "start_date" = '[{
                "name": "Curso Gerber",
                "start_date": "sábado 22 de junio",
                "format": "presencial"
            },
            {
                "name": "Curso Gerber",
                "start_date": "en cualquier momento",
                "format": "en línea"
            }]' 
            WHERE "id" = 'COR_2kIueWG6vLzEOopH4bG2qu4bHrX'`
    );

    await queryRunner.query(
      `UPDATE courses SET "start_date" = '[{
                "name": "Modelado de maniquí",
                "start_date": "en cualquier momento",
                "format": "en línea"
            }]' 
            WHERE "id" = 'COR_2kIueZw1rZJ8oyPSd9oLExse5B9'`
    );

    await queryRunner.query(
      `UPDATE courses SET "start_date" = '[{
                "name": "Curso diseño de moda",
                "start_date": "24 de agosto",
                "format": "híbrido"
            }]' 
            WHERE "id" = 'COR_2kIueZfQb0Wcd53AJKJ08zArhFV'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
