import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1722985956202 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO courses (id, name, description, created_at) VALUES 
                ('COR_2kIueZfQb0Wcd53AJKJ08zArhFV', 'Diseño de modas', 'Certificación técnica a nivel de Especialidad, con validez oficial de la SEP', NOW()),
                ('COR_2kIueWG6vLzEOopH4bG2qu4bHrX', 'Curso de Gerber', 'Aprenderás patronaje y graduación digital de patrones con Accumark de Gerber Technology', NOW()),
                ('COR_2kIueYKMGGiWsEhg35UI6g2LHA8', 'Curso de Lectra', 'Aprenderás patronaje y graduación de patrones con Modaris Classic y Diamino', NOW()),
                ('COR_2kIueZw1rZJ8oyPSd9oLExse5B9', 'Modelado de maniquí', 'Aprende la técnica de modelado de maniquí en 13 semanas.', NOW());
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
