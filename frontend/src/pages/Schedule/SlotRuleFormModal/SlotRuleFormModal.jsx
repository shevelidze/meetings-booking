import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Input,
  Select,
  Checkbox,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

import { selectSlotTypes } from '@/store/slices/slotTypes';

import WeekDaysPicker from '@/components/common/WeekDaysPicker';

const frequencyWeeksNumberOptionsNumbers = [1, 2, 3, 4, 8, 16];

const frequencyWeeksNumberOptions = frequencyWeeksNumberOptionsNumbers.map(
  (mapNumber) => (
    <option key={mapNumber} value={mapNumber}>
      Every {mapNumber === 1 ? 'week' : `${mapNumber} weeks`}
    </option>
  )
);

const validationSchema = Yup.object().shape({
  time: Yup.string().required().label('Time'),
  slotsCount: Yup.string()
    .test(
      'bigger-than-zero',
      '${label} should be a number bigger than zero',
      (value) => Number(value) > 0
    )
    .label('Slots count'),
  dayOfWeekIndexes: Yup.array().required().min(1).label('Slots count'),
  startDate: Yup.string().required().label('Start date'),
});

export default function SlotRuleFormModal({
  initialValues,
  onSubmit,
  headerChildren,
  submitButtonChildren,
  onClose,
  isOpen,
}) {
  const slotTypesState = useSelector(selectSlotTypes);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>{headerChildren}</ModalHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            resetForm();
          }}
          enableReinitialize
        >
          {({ isValid, values, setFieldValue, errors }) => (
            <Form>
              <ModalBody>
                <Stack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Slot</FormLabel>
                    <Field as={Select} name='slotTypeId'>
                      {slotTypesState.value.map((mapSlotType) => (
                        <option value={mapSlotType.id} key={mapSlotType.id}>
                          {mapSlotType.name}
                        </option>
                      ))}
                    </Field>
                  </FormControl>
                  <FormControl isInvalid={errors.time !== undefined} isRequired>
                    <FormLabel>Time</FormLabel>
                    <Field as={Input} name='time' type='time' />
                    <FormErrorMessage>{errors.time}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={errors.startDate !== undefined}
                    isRequired
                  >
                    <FormLabel>Start date</FormLabel>
                    <Field as={Input} name='startDate' type='date' />
                    <FormErrorMessage>{errors.startDate}</FormErrorMessage>
                  </FormControl>
                  <Checkbox
                    isChecked={values.frequencyWeeksNumber !== null}
                    onChange={() =>
                      setFieldValue(
                        'frequencyWeeksNumber',
                        values.frequencyWeeksNumber === null ? 1 : null
                      )
                    }
                  >
                    Repeat
                  </Checkbox>
                  {values.frequencyWeeksNumber !== null && (
                    <FormControl isRequired>
                      <FormLabel>Repeat every</FormLabel>
                      <Select
                        value={values.frequencyWeeksNumber}
                        onChange={(e) =>
                          setFieldValue(
                            'frequencyWeeksNumber',
                            parseInt(e.target.value)
                          )
                        }
                      >
                        {frequencyWeeksNumberOptions}
                      </Select>
                    </FormControl>
                  )}
                  <FormControl
                    isInvalid={errors.slotsCount !== undefined}
                    isRequired
                  >
                    <FormLabel>Slots count</FormLabel>
                    <Field
                      as={Input}
                      name='slotsCount'
                      type='number'
                      placeholder='Enter a count of slots'
                    />
                    <FormErrorMessage>{errors.slotsCount}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={errors.dayOfWeekIndexes !== undefined}
                  >
                    <FormLabel>Days of the week</FormLabel>
                    <WeekDaysPicker
                      weekDays={values.dayOfWeekIndexes}
                      onChange={(weekDays) =>
                        setFieldValue('dayOfWeekIndexes', weekDays)
                      }
                    />
                    <FormErrorMessage>
                      {errors.dayOfWeekIndexes}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' type='submit' isDisabled={!isValid}>
                  {submitButtonChildren}
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}
