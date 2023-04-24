import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'JXXCgaCF2mK3v8',
  database: 'academyDatabase',
  logging: true,
  synchronize: false,
  entities: ['src/note-organizer/infraestructure/database/entities/*.ts'],
  migrations: ['src/note-organizer/infraestructure/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
};
const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;
