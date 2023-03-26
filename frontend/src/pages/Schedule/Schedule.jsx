import { useEffect } from 'react';
import { HStack, Stack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import GhostIconButton from '@/components/common/GhostIconButton';
import { loadSlotTypes } from '@/store/slices/slotTypes';

import ScheduleCard from './ScheduleCard/ScheduleCard';
import SlotTypesScheduleCard from './SlotTypesScheduleCard';

export default function Schedule() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSlotTypes());
  });

  return (
    <HStack spacing={8} h='full' alignItems='flex-start'>
      <Stack spacing={8} w='lg'>
        <SlotTypesScheduleCard />
        <ScheduleCard display='flex' flexGrow={1} flexDirection='column'>
          {/* <GhostIconButton icon={<AddIcon />} alignSelf='center'>
            Add a slot rule
          </GhostIconButton> */}
        </ScheduleCard>
      </Stack>
      <ScheduleCard
        display='flex'
        flexGrow={1}
        alignSelf='stretch'
      ></ScheduleCard>
    </HStack>
  );
}
