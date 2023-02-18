import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { User, Country } from 'src/entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'db',
  port: Number(process.env.DB_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Country],
  synchronize: true,
};
