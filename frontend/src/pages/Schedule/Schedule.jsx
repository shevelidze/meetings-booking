import { useEffect } from 'react';
import { HStack, Stack, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';

import { loadSlotTypes } from '@/store/slices/slotTypes';
import { loadSlotRules, selectSlotRules } from '@/store/slices/slotRules';

import SlotsCalendar from '@/components/common/SlotsCalendar';
import CalendarSlot from '@/components/common/CalendarSlot';

import ScheduleCard from './ScheduleCard/ScheduleCard';
import SlotTypesScheduleCard from './SlotTypesScheduleCard';
import SlotRulesScheduleCard from './SlotRulesScheduleCard';
import {
  getClosestWeekBeginningBefore,
  getDaysNumberBetweenDateObjects,
  getTimeStringFromDateObject,
} from '@/utils';

export default function Schedule() {
  const dispatch = useDispatch();

  const slotRulesState = useSelector(selectSlotRules);

  useEffect(() => {
    dispatch(loadSlotTypes());
    dispatch(loadSlotRules());
  }, []);

  return (
    <HStack spacing={8} h='full' alignItems='flex-start'>
      <Stack spacing={8} w='lg'>
        <SlotTypesScheduleCard />
        <SlotRulesScheduleCard />
      </Stack>
      <ScheduleCard display='flex' flexGrow={1} alignSelf='stretch'>
        <SlotsCalendar flexGrow={1} alignSelf='stretch'>
          {(shownDateObjects) => {
            const result = [];

            for (const dateObject of shownDateObjects) {
              for (const slotRule of slotRulesState.value) {
                const slotRuleStartDateObject = new Date(slotRule.startDate);
                const weekIndex = Math.floor(
                  getDaysNumberBetweenDateObjects(
                    getClosestWeekBeginningBefore(slotRuleStartDateObject),
                    dateObject
                  ) / 7
                );

                if (
                  slotRule.dayOfWeekIndexes.includes(dateObject.getDay()) &&
                  slotRuleStartDateObject <= dateObject &&
                  ((slotRule.frequencyWeeksNumber === null &&
                    weekIndex === 0) ||
                    weekIndex % slotRule.frequencyWeeksNumber === 0)
                ) {
                  for (
                    let slotIndex = 0;
                    slotIndex < slotRule.slotsCount;
                    slotIndex++
                  ) {
                    const slotStartDateObject = new Date(dateObject);
                    slotStartDateObject.setHours(0);
                    slotStartDateObject.setMinutes(
                      slotRule.time + slotRule.slotType.duration * slotIndex
                    );

                    const slotEndDateObject = new Date(slotStartDateObject);
                    slotEndDateObject.setMinutes(
                      slotEndDateObject.getMinutes() +
                        slotRule.slotType.duration
                    );

                    result.push(
                      <CalendarSlot
                        key={uuidV4()}
                        index={result.length}
                        bg={slotRule.slotType.color}
                        dateObject={slotStartDateObject}
                        duration={slotRule.slotType.duration}
                      >
                        <Text color='white'>{slotRule.slotType.name}</Text>
                        <Text color='white'>
                          {getTimeStringFromDateObject(slotStartDateObject)} -
                          {getTimeStringFromDateObject(slotEndDateObject)}
                        </Text>
                      </CalendarSlot>
                    );
                  }
                }
              }
            }

            return result;
          }}
        </SlotsCalendar>
      </ScheduleCard>
    </HStack>
  );
}
