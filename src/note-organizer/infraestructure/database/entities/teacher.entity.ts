import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  last_name: string;
}
