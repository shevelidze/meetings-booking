import { useState } from 'react';
import { Stack, useToken } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import GhostIconButton from '@/components/common/GhostIconButton';
import { createSlotType, selectSlotTypes } from '@/store/slices/slotTypes';

import SlotTypeFormModal from '../SlotTypeFormModal';
import ScheduleCard from '../ScheduleCard';
import SlotTypeItem from '../SlotTypeItem';

export default function SlotTypesScheduleCard(props) {
  const newSlotDefaultColor = useToken('colors', 'blue.500');
  const dispatch = useDispatch();
  const slotTypesState = useSelector(selectSlotTypes);

  const [addSlotModalsOpen, setAddSlotModalIsOpen] = useState(false);

  return (
    <ScheduleCard display='flex' flexDirection='column' {...props}>
      <Stack spacing={8}>
        <Stack spacing={4}>
          {slotTypesState.value.map((mapSlotType) => (
            <SlotTypeItem key={mapSlotType.id} slotType={mapSlotType} />
          ))}
        </Stack>
        <GhostIconButton
          onClick={() => setAddSlotModalIsOpen(true)}
          icon={<AddIcon />}
          alignSelf='center'
        >
          Add a slot type
        </GhostIconButton>
      </Stack>
      <SlotTypeFormModal
        initialValues={{
          name: '',
          duration: '',
          color: newSlotDefaultColor,
        }}
        isOpen={addSlotModalsOpen}
        onClose={() => setAddSlotModalIsOpen(false)}
        headerChildren='Add a new slot type'
        submitButtonChildren='Submit'
        onSubmit={(values) => {
          setAddSlotModalIsOpen(false);
          dispatch(
            createSlotType({
              name: values.name,
              duration: parseInt(values.duration),
              color: values.color,
            })
          );
        }}
      />
    </ScheduleCard>
  );
}
