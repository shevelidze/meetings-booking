import { useState } from 'react';
import { Stack, useToken } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import GhostIconButton from '@/components/common/GhostIconButton';
import {
  createSlotType,
  deleteSlotType,
  selectSlotTypes,
  updateSlotType,
} from '@/store/slices/slotTypes';

import SlotTypeFormModal from '../SlotTypeFormModal';
import ScheduleCard from '../ScheduleCard';
import SlotTypeItem from '../SlotTypeItem';

export default function SlotTypesScheduleCard(props) {
  const newSlotDefaultColor = useToken('colors', 'blue.500');
  const dispatch = useDispatch();
  const slotTypesState = useSelector(selectSlotTypes);

  const [addSlotModalsOpen, setAddSlotModalIsOpen] = useState(false);
  const [editedSlotType, setEditedSlotType] = useState(null);

  return (
    <ScheduleCard display='flex' flexDirection='column' {...props}>
      <Stack spacing={8}>
        <Stack spacing={4}>
          {slotTypesState.value.map((mapSlotType) => (
            <SlotTypeItem
              key={mapSlotType.id}
              slotType={mapSlotType}
              onDeleteClick={() => dispatch(deleteSlotType(mapSlotType.id))}
              onEditClick={() => {
                setEditedSlotType(mapSlotType);
                setAddSlotModalIsOpen(true);
              }}
            />
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
          name: editedSlotType?.name || '',
          duration: editedSlotType?.duration || '',
          color: editedSlotType?.color || newSlotDefaultColor,
        }}
        isOpen={addSlotModalsOpen}
        onClose={() => setAddSlotModalIsOpen(false)}
        headerChildren={
          editedSlotType === null ? 'Add a new slot type' : 'Edit a slot type'
        }
        submitButtonChildren='Submit'
        onSubmit={(values) => {
          setAddSlotModalIsOpen(false);

          if (editedSlotType === null) {
            dispatch(
              createSlotType({
                name: values.name,
                duration: parseInt(values.duration),
                color: values.color,
              })
            );
          } else {
            setEditedSlotType(null);
            dispatch(
              updateSlotType(editedSlotType.id, {
                name: values.name,
                duration: parseInt(values.duration),
                color: values.color,
              })
            );
          }
        }}
      />
    </ScheduleCard>
  );
}
