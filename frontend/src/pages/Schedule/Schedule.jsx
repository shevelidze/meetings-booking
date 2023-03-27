import { useEffect } from 'react';
import { HStack, Stack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { loadSlotTypes } from '@/store/slices/slotTypes';
import { loadSlotRules } from '@/store/slices/slotRules';

import ScheduleCard from './ScheduleCard/ScheduleCard';
import SlotTypesScheduleCard from './SlotTypesScheduleCard';
import SlotRulesScheduleCard from './SlotRulesScheduleCard';

export default function Schedule() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSlotTypes());
    dispatch(loadSlotRules());
  });

  return (
    <HStack spacing={8} h='full' alignItems='flex-start'>
      <Stack spacing={8} w='lg'>
        <SlotTypesScheduleCard />
        <SlotRulesScheduleCard />
      </Stack>
      <ScheduleCard
        display='flex'
        flexGrow={1}
        alignSelf='stretch'
      ></ScheduleCard>
    </HStack>
  );
}
