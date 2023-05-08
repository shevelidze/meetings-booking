import {
  IsInt,
  IsPositive,
  Min,
  Max,
  IsArray,
  IsDateString,
  IsOptional,
} from 'class-validator';

import { ValidateIfDefined } from 'src/common/decorators';

import { SlotRuleUpdate } from '../types';

export class UpdateSlotRuleDto implements SlotRuleUpdate {
  @ValidateIfDefined()
  @IsInt()
  @IsPositive()
  slotsCount?: number;

  @ValidateIfDefined()
  @IsInt()
  @Min(0)
  time?: number;

  @ValidateIfDefined()
  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  @Max(6, { each: true })
  dayOfWeekIndexes?: number[];

  @ValidateIfDefined()
  @IsInt()
  slotTypeId?: number;

  @ValidateIfDefined()
  @IsDateString()
  startDate: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  frequencyWeeksNumber?: number | null;
}
