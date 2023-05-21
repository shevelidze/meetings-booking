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
  Flex,
  Stack,
} from '@chakra-ui/react';
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  BarChart,
  Bar,
  YAxis,
} from 'recharts';
import { loadUser, updateUser } from '../../store/slices/user';
import { loadSlotRules, selectSlotRules } from '@/store/slices/slotRules';
import ScheduleCard from '../Schedule/ScheduleCard/ScheduleCard';
import { loadSlotTypes, selectSlotTypes } from '@/store/slices/slotTypes';
import {
  getClosestWeekBeginningBefore,
  getDaysNumberBetweenDateObjects,
} from '@/utils';

const Settings = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);
  const slotRulesState = useSelector(selectSlotRules);
  const slotTypesState = useSelector(selectSlotTypes);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const pieChartData = useMemo(() => {
    const totalDurationBySlotTypeId = {};

    const weekStartDateObject = getClosestWeekBeginningBefore(new Date());

    for (let dayIndex = 0; dayIndex <= 7; dayIndex++) {
      const currentDateObject = new Date(
        weekStartDateObject.getFullYear(),
        weekStartDateObject.getMonth(),
        weekStartDateObject.getDate() + dayIndex
      );

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
          const currentDuration =
            slotRule.slotsCount * slotRule.slotType.duration;

          if (totalDurationBySlotTypeId[slotRule.slotType.id] === undefined) {
            totalDurationBySlotTypeId[slotRule.slotType.id] = currentDuration;
          } else {
            totalDurationBySlotTypeId[slotRule.slotType.id] += currentDuration;
          }
        }
      }
    }

    return slotTypesState.value.map((mapSlotType) => ({
      name: mapSlotType.name,
      value: totalDurationBySlotTypeId[mapSlotType.id] || 0,
      color: mapSlotType.color,
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
    dispatch(loadSlotTypes());
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
    <Grid
      templateColumns='repeat(2, 1fr)'
      templateRows='1fr 1.5fr 2fr'
      gap={8}
      h='full'
      w='full'
    >
      <ScheduleCard gridColumn='1' gridRow='1'>
        <Stack>
          <Text fontSize='2xl' fontWeight='bold'>
            Your current information
          </Text>
          <Text>Email: {user.email}</Text>
          <Text>First name: {user.firstName}</Text>
          <Text>Last name: {user.lastName}</Text>
        </Stack>
      </ScheduleCard>
      <ScheduleCard
        gridColumn='2'
        gridRow='1/3'
        as='form'
        onSubmit={handleSubmit}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
      >
        <Stack>
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
        </Stack>
        <Button type='submit' colorScheme='blue' alignSelf='end'>
          Save changes
        </Button>
      </ScheduleCard>
      <ScheduleCard as={Flex} gridColumn='1' gridRow='2/4' flexDir='column'>
        <Text fontSize='2xl' fontWeight='bold'>
          Slots composition of the current week
        </Text>
        <Box flexGrow={1} alignSelf='stretch'>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                outerRadius='60%'
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <LabelList dataKey='name' />
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} minutes`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </ScheduleCard>
      <ScheduleCard as={Flex} gridColumn='2' gridRow='3/4' flexDir='column'>
        <Text fontSize='2xl' fontWeight='bold'>
          Duration of the slot types
        </Text>
        <Box flexGrow={1} alignSelf='stretch'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={slotTypesState.value}
              margin={{ top: 40, left: 20 }}
            >
              <YAxis tickFormatter={(value) => `${value} minutes`} />
              <Bar dataKey='duration' isAnimationActive={false}>
                {slotTypesState.value.map((entry, index) => (
                  <Cell fill={entry.color} key={`cell-${index}`} />
                ))}
                <LabelList dataKey='name' position='top' />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </ScheduleCard>
    </Grid>
  );
};

export default Settings;
