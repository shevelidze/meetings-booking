import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SlotType } from 'src/entity';
import { LanguageModule } from 'src/language';
import { AuthModule } from 'src/auth';

import { SlotTypeService } from './slot-type.service';
import { SlotTypeController } from './slot-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SlotType]), LanguageModule, AuthModule],
  providers: [SlotTypeService],
  controllers: [SlotTypeController],
  exports: [SlotTypeService],
})
export class SlotTypeModule {}
