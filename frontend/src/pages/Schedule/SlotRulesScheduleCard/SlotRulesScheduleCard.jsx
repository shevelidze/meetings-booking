import { useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { selectSlotTypes } from '@/store/slices/slotTypes';
import {
  getTimeStringFromTotalMinutes,
  getTotalMinutesFromTimeString,
} from '@/utils';
import {
  createSlotRule,
  deleteSlotRule,
  selectSlotRules,
  updateSlotRule,
} from '@/store/slices/slotRules';

import GhostIconButton from '@/components/common/GhostIconButton';

import SlotRuleFormModal from '../SlotRuleFormModal/SlotRuleFormModal';
import ScheduleCard from '../ScheduleCard';
import SlotRuleItem from '../SlotRuleItem';
import { Stack } from '@chakra-ui/react';

export default function SlotRulesScheduleCard(props) {
  const dispatch = useDispatch();
  const slotTypesState = useSelector(selectSlotTypes);
  const slotRulesState = useSelector(selectSlotRules);

  const [addSlotRuleModalIsOpen, setAddSlotRuleModalIsOpen] = useState(false);
  const [editedSlotRule, setEditedSlotRule] = useState(null);

  return (
    <ScheduleCard display='flex' flexGrow={1} flexDirection='column' {...props}>
      <Stack spacing={8}>
        <Stack spacing={4}>
          {slotRulesState.value.map((mapSlotRule) => (
            <SlotRuleItem
              slotRule={mapSlotRule}
              key={mapSlotRule.id}
              onDeleteClick={() => dispatch(deleteSlotRule(mapSlotRule.id))}
              onEditClick={() => {
                setEditedSlotRule(mapSlotRule);
                setAddSlotRuleModalIsOpen(true);
              }}
            />
          ))}
        </Stack>
        <GhostIconButton
          onClick={() => setAddSlotRuleModalIsOpen(true)}
          icon={<AddIcon />}
          alignSelf='center'
        >
          Add a slot rule
        </GhostIconButton>
      </Stack>
      <SlotRuleFormModal
        initialValues={{
          time:
            editedSlotRule !== null
              ? getTimeStringFromTotalMinutes(editedSlotRule.time)
              : '',
          dayOfWeekIndexes: editedSlotRule?.dayOfWeekIndexes || [0, 1, 2, 3, 4],
          slotTypeId:
            editedSlotRule !== null
              ? String(editedSlotRule.slotType.id)
              : String(slotTypesState.value[0]?.id),
          slotsCount:
            editedSlotRule !== null ? String(editedSlotRule.slotsCount) : '',
          startDate: editedSlotRule !== null ? editedSlotRule.startDate : '',
          frequencyWeeksNumber:
            editedSlotRule !== null
              ? editedSlotRule.frequencyWeeksNumber
              : null,
        }}
        isOpen={addSlotRuleModalIsOpen}
        onClose={() => setAddSlotRuleModalIsOpen(false)}
        headerChildren={
          editedSlotRule !== null ? 'Edit a slot rule' : 'Add a new slot rule'
        }
        submitButtonChildren='Submit'
        onSubmit={(values) => {
          setAddSlotRuleModalIsOpen(false);

          if (editedSlotRule !== null) {
            setEditedSlotRule(null);
            dispatch(
              updateSlotRule(editedSlotRule.id, {
                dayOfWeekIndexes: values.dayOfWeekIndexes,
                slotTypeId: Number(values.slotTypeId),
                slotsCount: Number(values.slotsCount),
                time: getTotalMinutesFromTimeString(values.time),
                startDate: values.startDate,
                frequencyWeeksNumber: values.frequencyWeeksNumber,
              })
            );
          } else {
            dispatch(
              createSlotRule({
                dayOfWeekIndexes: values.dayOfWeekIndexes,
                slotTypeId: Number(values.slotTypeId),
                slotsCount: Number(values.slotsCount),
                time: getTotalMinutesFromTimeString(values.time),
                startDate: values.startDate,
                frequencyWeeksNumber: values.frequencyWeeksNumber,
              })
            );
          }
        }}
      />
    </ScheduleCard>
  );
}
