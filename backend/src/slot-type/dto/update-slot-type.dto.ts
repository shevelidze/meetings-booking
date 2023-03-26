import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsPositive,
  IsHexColor,
} from 'class-validator';

import { ValidateIfDefined } from 'src/common/decorators';

import { SlotTypeUpdate } from '../types/slot-type-update.type';

export class UpdateSlotTypeDto implements SlotTypeUpdate {
  @ValidateIfDefined()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ValidateIfDefined()
  @IsInt()
  @IsPositive()
  duration?: number;

  @ValidateIfDefined()
  @IsInt()
  defaultLanguageId?: number;

  @ValidateIfDefined()
  @IsHexColor()
  color?: string;
}
