import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsPositive,
  IsHexColor,
  IsOptional,
} from 'class-validator';

import { SlotTypeCreation } from '../types/slot-type-creation.type';

export class CreateSlotTypeDto implements SlotTypeCreation {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsPositive()
  duration: number;

  @IsInt()
  @IsOptional()
  defaultLanguageId?: number | null;

  @IsHexColor()
  color: string;
}
