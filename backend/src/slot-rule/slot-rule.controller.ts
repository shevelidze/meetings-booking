import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { UserEmail } from 'src/auth';

import { CreateSlotRuleDto, UpdateSlotRuleDto } from './dto';
import { SlotRuleService } from './slot-rule.service';

@Controller('slot_rule')
export class SlotRuleController {
  constructor(private readonly slotRuleService: SlotRuleService) {}

  @Post()
  async create(
    @Body() createSlotRuleDto: CreateSlotRuleDto,
    @UserEmail() userEmail: string,
  ) {
    return await this.slotRuleService.create(createSlotRuleDto, userEmail);
  }

  @Get()
  async getAll(@UserEmail() userEmail: string) {
    return await this.slotRuleService.getAllOwnedByUser(userEmail);
  }

  @Patch(':id')
  async updateOne(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateSlotRuleDto: UpdateSlotRuleDto,
    @UserEmail() userEmail: string,
  ) {
    await this.slotRuleService.updateIfUserOwns(
      id,
      updateSlotRuleDto,
      userEmail,
    );
  }

  @Delete(':id')
  async deleteOne(
    @Param('id', new ParseIntPipe()) id: number,
    @UserEmail() userEmail: string,
  ) {
    await this.slotRuleService.deleteIfUserOwns(id, userEmail);
  }
}
