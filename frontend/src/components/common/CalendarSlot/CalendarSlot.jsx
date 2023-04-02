import { useContext } from 'react';
import { Box } from '@chakra-ui/react';

import {
  getClosestWeekBeginningBefore,
  getDateIsoString,
  getSlotCalendarTimeColumnOffset,
} from '@/utils';

import SlotCalendarContext from '@/components/common/SlotCalendarContext';

import classes from './CalendarSlot.module.css';

export default function CalendarSlot({ dateObject, duration, ...props }) {
  const slotCalendarContent = useContext(SlotCalendarContext);

  if (
    getDateIsoString(getClosestWeekBeginningBefore(dateObject)) !==
    getDateIsoString(
      getClosestWeekBeginningBefore(slotCalendarContent.shownDateObject)
    )
  ) {
    return null;
  }

  const classList = [classes.calendarSlot];

  if (duration < 15) {
    classList.push(classes.short);
  }

  return (
    <Box gridColumn={dateObject.getDay() + 2} gridRow={2} position='relative'>
      <Box
        zIndex={10}
        position='absolute'
        width='full'
        top={getSlotCalendarTimeColumnOffset(
          dateObject.getHours() * 60 + dateObject.getMinutes()
        )}
        height={getSlotCalendarTimeColumnOffset(duration)}
        className={classList.join(' ')}
        borderRadius='1rem'
        p='1rem'
        transition='height .2s ease-in-out'
        {...props}
      />
    </Box>
  );
}
