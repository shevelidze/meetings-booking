import {
  Grid,
  Flex,
  Heading,
  Text,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { login, selectAuth } from '@/store/slices/auth';
import { Navigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().label('Password'),
});

function Login() {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuth);

  if (authState.status === 'authorized') {
    return <Navigate to='/' replace />;
  }

  return (
    <Grid templateColumns='1fr 1fr' h='100vh'>
      <Flex bg='blue.700' alignItems='center' justifyContent='center'>
        <Stack color='gray.50'>
          <Heading fontSize='6xl'>
            Meetings
            <br />
            booking
          </Heading>
          <Text fontSize='xl'>Organize your meetings timetable!</Text>
        </Stack>
      </Flex>
      <Flex alignItems='center' justifyContent='center'>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(login(values.email, values.password));
          }}
        >
          {({ isValid, errors }) => (
            <Form>
              <Stack spacing={8}>
                <Stack spacing={4}>
                  <FormControl
                    isInvalid={
                      errors.email !== undefined || authState.error !== null
                    }
                  >
                    <FormLabel>Email</FormLabel>
                    <Field as={Input} name='email' placeholder='Your email' />
                    <FormErrorMessage>
                      {errors.email || authState.error}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.password !== undefined}>
                    <FormLabel>Password</FormLabel>
                    <Field
                      as={Input}
                      name='password'
                      placeholder='Your password'
                      type='password'
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                </Stack>
                <Button
                  isDisabled={!isValid || authState.status === 'pending'}
                  type='submit'
                  variant='solid'
                  colorScheme='blue'
                >
                  Sign in
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Flex>
    </Grid>
  );
}

export default Login;
