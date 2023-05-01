import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { UserEmail } from 'src/auth';

import { CreateSlotTypeDto, UpdateSlotTypeDto } from './dto';
import { SlotTypeService } from './slot-type.service';

@Controller('slot_type')
export class SlotTypeController {
  constructor(private readonly slotTypeService: SlotTypeService) {}

  @Post()
  async create(
    @Body() createSlotTypeDto: CreateSlotTypeDto,
    @UserEmail() userEmail: string,
  ) {
    return await this.slotTypeService.create(createSlotTypeDto, userEmail);
  }

  @Get()
  async getAll(@UserEmail() userEmail: string) {
    return await this.slotTypeService.getAllOwnedByUser(userEmail);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateSlotTypeDto: UpdateSlotTypeDto,
    @UserEmail() userEmail: string,
  ) {
    return await this.slotTypeService.updateIfUserOwns(
      id,
      updateSlotTypeDto,
      userEmail,
    );
  }

  @Delete(':id')
  async delete(
    @Param('id', new ParseIntPipe()) id: number,
    @UserEmail() userEmail: string,
  ) {
    await this.slotTypeService.deleteIfUserOwns(id, userEmail);
  }
}
