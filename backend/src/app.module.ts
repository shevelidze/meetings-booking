import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { databaseConfig } from './common/config';

import { AuthModule } from './auth';
import { SlotRuleModule } from './slot-rule';
import { SlotTypeModule } from './slot-type';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    SlotRuleModule,
    SlotTypeModule,
  ],
})
export class AppModule {}
