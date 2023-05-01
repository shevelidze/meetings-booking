import {
  Box,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  FormControl,
  FormLabel,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  Grid,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser, updateUser } from '../../store/slices/user';

const Settings = () => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if(user === null){
      return;
    }
    setFirstName(user.firstName);
    setLastName(user.lastName);
  }, [user]);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setErrorMessage("Passwords don't match.");
      return;
    }

    const updatedUser = {
      firstName,
      lastName,
      password: password.trim() === '' ? undefined : password,
    };

    try {
      await dispatch(updateUser(updatedUser));
      setErrorMessage('');
      setPassword('');
      setPasswordConfirm('');
    } catch (error) {
      setErrorMessage('Error updating user information.');
    }
  };


  if(user === null){
    return null;
  }


  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={12} p={8}>
       <VStack align="start" spacing={6}>
        <Box
          borderWidth={1}
          borderRadius="lg"
          borderColor="gray.300"
          p={6}
          w="100%"
          boxShadow="xl"
          bg="white"
        >
          <Text fontSize="2xl" fontWeight="bold">Your current information</Text>
          <Text>Email: {user.email}</Text>
          <Text>First name: {user.firstName}</Text>
          <Text>Last name: {user.lastName}</Text>
        </Box>
      </VStack>
      <VStack as="form" onSubmit={handleSubmit} align="start" spacing={6}>
      <Box
          borderWidth={1}
          borderRadius="lg"
          borderColor="gray.300"
          p={6}
          w="100%"
          boxShadow="xl"
          bg="white"
        >
        <Text fontSize="2xl" fontWeight="bold">Update your information</Text>
        <FormControl id="firstName">
          <FormLabel>First name</FormLabel>
          <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </FormControl>
        <FormControl id="lastName">
          <FormLabel>Last name</FormLabel>
          <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </FormControl>
        <FormControl id="password">
          <FormLabel>
            Password (leave blank to keep current password)
          </FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl id="passwordConfirm">
          <FormLabel>Confirm password</FormLabel>
          <Input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </FormControl>
        {errorMessage && (
          <Alert status="error" borderRadius="md" mt={4}>
            <AlertIcon />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <Button type="submit" colorScheme="blue" mt={4}>
          Save changes
        </Button>
        </Box>
      </VStack>
    </Grid>
  );
};

export default Settings;