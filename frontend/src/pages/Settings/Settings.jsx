import {
  Box,
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  Grid,
} from '@chakra-ui/react';
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { loadUser, updateUser } from '../../store/slices/user';
import { loadSlotRules, selectSlotRules } from '@/store/slices/slotRules';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Settings = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);
  const slotRulesState = useSelector(selectSlotRules);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const chartData = useMemo(() => {
    const result = {};

    for (const slotRule of slotRulesState.value) {
      if (result[slotRule.slotType.name] === undefined) {
        result[slotRule.slotType.name] =
          slotRule.slotsCount * slotRule.slotType.duration;
      } else {
        result[slotRule.slotType.name] +=
          slotRule.slotsCount * slotRule.slotType.duration;
      }
    }

    return Object.entries(result).map(([key, value]) => ({
      name: key,
      value,
    }));
  }, [slotRulesState]);

  useEffect(() => {
    if (user === null) {
      return;
    }
    setFirstName(user.firstName);
    setLastName(user.lastName);
  }, [user]);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadSlotRules());
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

  if (user === null) {
    return null;
  }

  return (
    <Grid templateColumns='repeat(2, 1fr)' gap={12} p={8}>
      <VStack align='start' spacing={6}>
        <Box
          borderWidth={1}
          borderRadius='lg'
          borderColor='gray.300'
          p={6}
          w='100%'
          boxShadow='xl'
          bg='white'
        >
          <Text fontSize='2xl' fontWeight='bold'>
            Your current information
          </Text>
          <Text>Email: {user.email}</Text>
          <Text>First name: {user.firstName}</Text>
          <Text>Last name: {user.lastName}</Text>
        </Box>
      </VStack>
      <VStack as='form' onSubmit={handleSubmit} align='start' spacing={6}>
        <Box
          borderWidth={1}
          borderRadius='lg'
          borderColor='gray.300'
          p={6}
          w='100%'
          boxShadow='xl'
          bg='white'
        >
          <Text fontSize='2xl' fontWeight='bold'>
            Update your information
          </Text>
          <FormControl id='firstName'>
            <FormLabel>First name</FormLabel>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>
          <FormControl id='lastName'>
            <FormLabel>Last name</FormLabel>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>
          <FormControl id='password'>
            <FormLabel>
              Password (leave blank to keep current password)
            </FormLabel>
            <Input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id='passwordConfirm'>
            <FormLabel>Confirm password</FormLabel>
            <Input
              type='password'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </FormControl>
          {errorMessage && (
            <Alert status='error' borderRadius='md' mt={4}>
              <AlertIcon />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <Button type='submit' colorScheme='blue' mt={4}>
            Save changes
          </Button>
        </Box>
      </VStack>
      <Box
        borderWidth={1}
        borderRadius='lg'
        borderColor='gray.300'
        p={6}
        w='100%'
        boxShadow='xl'
        bg='white'
      >
        <Text fontSize='2xl' fontWeight='bold'>
          Slots statistic
        </Text>
        <PieChart width={730} height={250}>
          <Pie
            data={chartData}
            dataKey='value'
            nameKey='name'
            cx='50%'
            cy='50%'
            outerRadius={100}
            fill='#8884d8'
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </Box>
    </Grid>
  );
};

export default Settings;
