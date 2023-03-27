import { useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { selectSlotTypes } from '@/store/slices/slotTypes';
import { getTotalMinutesFromTimeString } from '@/utils';
import { createSlotRule, selectSlotRules } from '@/store/slices/slotRules';

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

  return (
    <ScheduleCard display='flex' flexGrow={1} flexDirection='column' {...props}>
      <Stack spacing={8}>
        <Stack spacing={4}>
          {slotRulesState.value.map((mapSlotRule) => (
            <SlotRuleItem slotRule={mapSlotRule} key={mapSlotRule.id} />
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
          time: '',
          dayOfWeekIndexes: [0, 1, 2, 3, 4],
          slotTypeId: String(slotTypesState.value[0]?.id),
          slotsCount: '',
        }}
        isOpen={addSlotRuleModalIsOpen}
        onClose={() => setAddSlotRuleModalIsOpen(false)}
        headerChildren='Add a new slot rule'
        submitButtonChildren='Submit'
        onSubmit={(values) => {
          setAddSlotRuleModalIsOpen(false);

          dispatch(
            createSlotRule({
              dayOfWeekIndexes: values.dayOfWeekIndexes,
              slotTypeId: Number(values.slotTypeId),
              slotsCount: Number(values.slotsCount),
              time: getTotalMinutesFromTimeString(values.time),
            })
          );
        }}
      />
    </ScheduleCard>
  );
}
