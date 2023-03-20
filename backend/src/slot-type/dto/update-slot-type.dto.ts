import { IsString, IsNotEmpty, IsInt, IsPositive } from 'class-validator';

import { ValidateIfDefined } from 'src/common/decorators';

import { SlotTypeUpdate } from '../types/slot-type-update.type';

export class UpdateSlotTypeDto implements SlotTypeUpdate {
  @ValidateIfDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIfDefined()
  @IsInt()
  @IsPositive()
  duration: number;

  @ValidateIfDefined()
  @IsInt()
  defaultLanguageId: number;
}
