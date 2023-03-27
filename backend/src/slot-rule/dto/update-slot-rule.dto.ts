import { IsInt, IsPositive, Min, Max, IsArray } from 'class-validator';

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
  @IsInt()
  @Min(0)
  @Max(6)
  dayOfWeekIndexes?: number[];

  @ValidateIfDefined()
  @IsInt()
  slotTypeId?: number;
}
