import { useEffect, useMemo, useState } from 'react';
import {
  Flex,
  Grid,
  Box,
  Text,
  HStack,
  IconButton,
  Button,
} from '@chakra-ui/react';
import ExcelJS from 'exceljs';

import SlotCalendarContext from '@/components/common/SlotCalendarContext';
import {
  getClosestWeekBeginningBefore,
  getDaysNumberBetweenDateObjects,
  getShortDateOfWeekByIndex,
  getSlotCalendarTimeColumnOffset,
  getTimeStringFromDateObject,
  range,
} from '@/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { selectSlotRules } from '@/store/slices/slotRules';

function getDateObjectFromHours(hours) {
  const result = new Date();
  result.setHours(hours);
  result.setMinutes(0);
  result.setSeconds(0);
  return result;
}

export default function SlotCalendar({ children, ...props }) {
  const slotRulesState = useSelector(selectSlotRules);

  const [shownDateObject, setShownDateObject] = useState(new Date());
  const [shownWeekSpreadsheetFileUrl, setShownWeekSpreadsheetFileUrl] =
    useState('');

  const shownDateObjects = useMemo(() => {
    const result = [getClosestWeekBeginningBefore(shownDateObject)];

    for (let i = 1; i < 7; i++) {
      const dateObject = new Date(result[0]);
      dateObject.setDate(dateObject.getDate() + i);
      result.push(dateObject);
    }

    return result;
  }, [shownDateObject]);

  useEffect(() => {
    const workbook = new ExcelJS.Workbook();

    for (const currentDateObject of shownDateObjects) {
      const worksheet = workbook.addWorksheet(
        currentDateObject.toLocaleDateString('en-US', {
          weekday: 'long',
        })
      );

      worksheet.addRow(['Schedule for', currentDateObject]);
      worksheet.addRow(['Slot name', 'Start time', 'Finish time']);

      worksheet.getColumn(1).width = 20;
      worksheet.getColumn(2).width = 15;
      worksheet.getColumn(3).width = 15;

      worksheet.getColumn(2).numFmt = 'hh:mm';
      worksheet.getColumn(3).numFmt = 'hh:mm';

      worksheet.getCell(1, 2).numFmt = 'm/d/yyyy';

      const futureRows = [];

      for (const slotRule of slotRulesState.value) {
        const slotRuleStartDateObject = new Date(slotRule.startDate);
        const weekIndex = Math.floor(
          getDaysNumberBetweenDateObjects(
            getClosestWeekBeginningBefore(slotRuleStartDateObject),
            currentDateObject
          ) / 7
        );

        if (
          slotRule.dayOfWeekIndexes.includes(currentDateObject.getDay()) &&
          slotRuleStartDateObject <= currentDateObject &&
          ((slotRule.frequencyWeeksNumber === null && weekIndex === 0) ||
            weekIndex % slotRule.frequencyWeeksNumber === 0)
        ) {
          for (
            let slotIndex = 0;
            slotIndex < slotRule.slotsCount;
            slotIndex++
          ) {
            const slotStartDateObject = new Date(currentDateObject);
            slotStartDateObject.setSeconds(0);
            slotStartDateObject.setHours(
              -slotStartDateObject.getTimezoneOffset() / 60
            );
            slotStartDateObject.setMinutes(
              slotRule.time + slotRule.slotType.duration * slotIndex
            );

            const slotEndDateObject = new Date(slotStartDateObject);
            slotEndDateObject.setMinutes(
              slotEndDateObject.getMinutes() + slotRule.slotType.duration
            );

            futureRows.push([
              slotRule.slotType.name,
              slotStartDateObject,
              slotEndDateObject,
            ]);
          }
        }
      }

      worksheet.addRows(futureRows.sort((a, b) => a[1] - b[1]));
    }

    workbook.xlsx.writeBuffer().then((thenBuffer) => {
      setShownWeekSpreadsheetFileUrl(
        URL.createObjectURL(new Blob([thenBuffer]))
      );
    });
  }, [shownDateObjects, slotRulesState]);

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
            <Button
              as='a'
              href={shownWeekSpreadsheetFileUrl}
              download={`Schedule for ${shownDateObject.toLocaleDateString(
                'en-US',
                { month: 'long' }
              )}.xlsx`}
            >
              Save as a Microsoft Excel workbook
            </Button>
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
                position='sticky'
                top={0}
                bg='white'
                zIndex={20}
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
