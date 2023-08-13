import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Sound } from './entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'data/db/database.sqlite',
  synchronize: true,
  logging: false,
  entities: [Sound],
  migrations: [],
  subscribers: [],
});
