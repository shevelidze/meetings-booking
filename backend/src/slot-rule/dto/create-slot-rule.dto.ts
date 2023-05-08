import {
  IsInt,
  IsPositive,
  Min,
  IsArray,
  Max,
  IsDateString,
  IsOptional,
} from 'class-validator';

import { SlotRuleCreation } from '../types';

export class CreateSlotRuleDto implements SlotRuleCreation {
  @IsInt()
  @IsPositive()
  slotsCount: number;

  @IsInt()
  @Min(0)
  time: number;

  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  @Max(6, { each: true })
  dayOfWeekIndexes: number[];

  @IsInt()
  slotTypeId: number;

  @IsDateString()
  startDate: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  frequencyWeeksNumber?: number | null;
}
