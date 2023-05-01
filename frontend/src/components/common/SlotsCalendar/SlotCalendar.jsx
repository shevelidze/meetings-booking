import { useMemo, useState } from 'react';
import {
  Flex,
  Grid,
  Box,
  Text,
  HStack,
  IconButton,
  Button,
} from '@chakra-ui/react';

import SlotCalendarContext from '@/components/common/SlotCalendarContext';
import {
  getClosestWeekBeginningBefore,
  getShortDateOfWeekByIndex,
  getSlotCalendarTimeColumnOffset,
  getTimeStringFromDateObject,
  range,
} from '@/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

function getDateObjectFromHours(hours) {
  const result = new Date();
  result.setHours(hours);
  result.setMinutes(0);
  result.setSeconds(0);
  return result;
}

export default function SlotCalendar({ children, ...props }) {
  const [shownDateObject, setShownDateObject] = useState(new Date());

  const shownDateObjects = useMemo(() => {
    const result = [getClosestWeekBeginningBefore(shownDateObject)];

    for (let i = 1; i < 7; i++) {
      const dateObject = new Date(result[0]);
      dateObject.setDate(dateObject.getDate() + i);
      result.push(dateObject);
    }

    return result;
  });

  return (
    <SlotCalendarContext.Provider value={{ shownDateObject }}>
      <Flex flexDirection='column' {...props}>
        <Flex justifyContent='space-between' alignItems='center'>
          <Text fontWeight='bold' fontSize='4xl'>
            {shownDateObject.toLocaleDateString('en-US', {
              month: 'long',
            })}{' '}
            {shownDateObject.getFullYear()}
          </Text>
          <HStack>
            <Button onClick={() => setShownDateObject(new Date())}>
              Today
            </Button>
            <IconButton
              onClick={() => {
                const newDateObject = new Date(shownDateObject);
                newDateObject.setDate(newDateObject.getDate() - 7);
                setShownDateObject(newDateObject);
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                const newDateObject = new Date(shownDateObject);
                newDateObject.setDate(newDateObject.getDate() + 7);
                setShownDateObject(newDateObject);
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </HStack>
        </Flex>
        <Box minH={0} h={0} overflow='auto' flexGrow={1}>
          <Grid
            alignSelf='stretch'
            gridTemplateColumns='1.2fr repeat(7, 1fr)'
            gridTemplateRows='min-content 1fr'
            height='300rem'
          >
            <Box gridColumn={1} gridRow={2} h='full' position='relative'>
              {range(24).map((mapHours) => (
                <Flex
                  top={getSlotCalendarTimeColumnOffset(mapHours * 60)}
                  key={mapHours}
                  position='absolute'
                  w='full'
                  gap={2}
                >
                  <Text>
                    {getTimeStringFromDateObject(
                      getDateObjectFromHours(mapHours)
                    )}
                  </Text>
                  <Box flexGrow={1} h='1px' bg='grey' />
                </Flex>
              ))}
            </Box>
            {shownDateObjects.map((mapDateObject) => (
              <Box
                gridColumn={mapDateObject.getDay() + 2}
                gridRow={1}
                key={mapDateObject.toString()}
              >
                <Text textAlign='center'>
                  {getShortDateOfWeekByIndex(mapDateObject.getDay())}
                </Text>
                <Text textAlign='center'>{mapDateObject.getDate()}</Text>
              </Box>
            ))}
            {typeof children === 'function'
              ? children(shownDateObjects)
              : children}
          </Grid>
        </Box>
      </Flex>
    </SlotCalendarContext.Provider>
  );
}
