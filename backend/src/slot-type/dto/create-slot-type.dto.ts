import { IsString, IsNotEmpty, IsInt, IsPositive } from 'class-validator';

import { SlotTypeCreation } from '../types/slot-type-creation.type';

export class CreateSlotTypeDto implements SlotTypeCreation {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsPositive()
  duration: number;

  @IsInt()
  defaultLanguageId: number;
}
