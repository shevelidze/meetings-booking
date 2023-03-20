import { IsInt, IsPositive, Min, IsArray, Max } from 'class-validator';

import { SlotRuleCreation } from '../types';

export class CreateSlotRuleDto implements SlotRuleCreation {
  @IsInt()
  @IsPositive()
  slotsCount: number;

  @IsInt()
  @Min(0)
  time: number;

  @IsArray()
  @IsInt()
  @Min(0)
  @Max(6)
  daysOfWeekIndexes: number[];

  @IsInt()
  slotTypeId: number;
}
