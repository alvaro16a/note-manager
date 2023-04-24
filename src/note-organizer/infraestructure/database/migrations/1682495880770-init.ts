import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1682495880770 implements MigrationInterface {
    name = 'Init1682495880770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course" ("id" character varying NOT NULL, "name" character varying(50) NOT NULL, "credits" integer NOT NULL, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student" ("id" bigint NOT NULL, "name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "average_grade" double precision NOT NULL, "academic_credits" integer NOT NULL, CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teacher" ("id" bigint NOT NULL, "name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_student" ("student_id" bigint NOT NULL, "course_id" character varying NOT NULL, CONSTRAINT "PK_814f1e0371520c9e9d87423145f" PRIMARY KEY ("student_id", "course_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a9abbc1e8cca2232f48de065ee" ON "course_student" ("student_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c34eb3d7ecb91ecb57645767b6" ON "course_student" ("course_id") `);
        await queryRunner.query(`ALTER TABLE "course_student" ADD CONSTRAINT "FK_a9abbc1e8cca2232f48de065ee2" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "course_student" ADD CONSTRAINT "FK_c34eb3d7ecb91ecb57645767b6b" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_student" DROP CONSTRAINT "FK_c34eb3d7ecb91ecb57645767b6b"`);
        await queryRunner.query(`ALTER TABLE "course_student" DROP CONSTRAINT "FK_a9abbc1e8cca2232f48de065ee2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c34eb3d7ecb91ecb57645767b6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a9abbc1e8cca2232f48de065ee"`);
        await queryRunner.query(`DROP TABLE "course_student"`);
        await queryRunner.query(`DROP TABLE "teacher"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "course"`);
    }

}
