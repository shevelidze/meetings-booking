import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth';

import { SlotRule } from 'src/entity';
import { SlotTypeModule } from 'src/slot-type';

import { SlotRuleController } from './slot-rule.controller';
import { SlotRuleService } from './slot-rule.service';

@Module({
  imports: [TypeOrmModule.forFeature([SlotRule]), SlotTypeModule, AuthModule],
  controllers: [SlotRuleController],
  providers: [SlotRuleService],
})
export class SlotRuleModule {}
