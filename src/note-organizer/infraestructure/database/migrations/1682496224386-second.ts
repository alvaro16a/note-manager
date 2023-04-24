import { MigrationInterface, QueryRunner } from 'typeorm';

export class Second1682496224386 implements MigrationInterface {
  name = 'Second1682496224386';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "student" ADD "name" character varying(30) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "student" ADD "name" character varying(50) NOT NULL`,
    );
  }
}
