import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { databaseConfig } from './common/config';

import { AuthModule } from './auth';
import { SlotRuleModule } from './slot-rule';
import { SlotTypeModule } from './slot-type';
import { UserModule } from './user';


@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    SlotRuleModule,
    SlotTypeModule,
    UserModule
  ],
})
export class AppModule {}
