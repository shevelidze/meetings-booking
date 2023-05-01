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
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { SliderPicker } from 'react-color';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  duration: Yup.string()
    .test(
      'bigger-than-zero',
      '${label} should be a number bigger than zero',
      (value) => Number(value) > 0
    )
    .label('Duration'),
});

export default function SlotTypeFormModal({
  initialValues,
  onSubmit,
  headerChildren,
  submitButtonChildren,
  onClose,
  isOpen,
}) {
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
                  <FormControl isInvalid={errors.name !== undefined} isRequired>
                    <FormLabel>Name</FormLabel>
                    <Field
                      as={Input}
                      name='name'
                      placeholder='Enter a name for your slot type'
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={errors.duration !== undefined}
                    isRequired
                  >
                    <FormLabel>Duration (in minutes)</FormLabel>
                    <Field
                      as={Input}
                      name='duration'
                      type='number'
                      placeholder='Enter a duration for your slot type'
                    />
                    <FormErrorMessage>{errors.duration}</FormErrorMessage>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Color</FormLabel>
                    <SliderPicker
                      color={{
                        hex: values.color,
                      }}
                      onChange={(color) => setFieldValue('color', color.hex)}
                    />
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
