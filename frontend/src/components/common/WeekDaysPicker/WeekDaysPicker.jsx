import { Button, Flex } from '@chakra-ui/react';

import { getShortDateOfWeekByIndex } from '@/utils';

export default function WeekDaysPicker({ weekDays, onChange }) {
  return (
    <Flex justifyContent='space-between' gap={2}>
      {[0, 1, 2, 3, 4, 5, 6].map((mapIndex) => (
        <Button
          key={mapIndex}
          onClick={
            weekDays.includes(mapIndex)
              ? () =>
                  onChange(
                    weekDays.filter((filterIndex) => mapIndex !== filterIndex)
                  )
              : () => onChange([...weekDays, mapIndex])
          }
          variant={weekDays.includes(mapIndex) ? 'solid' : 'ghost'}
          borderRadius='full'
          colorScheme='blue'
        >
          {getShortDateOfWeekByIndex(mapIndex)}
        </Button>
      ))}
    </Flex>
  );
}
