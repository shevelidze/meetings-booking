export interface SlotRuleCreation {
  slotsCount: number;
  time: number;
  dayOfWeekIndexes: number[];
  slotTypeId: number;
  startDate: string;
  frequencyWeeksNumber?: number | null;
}
