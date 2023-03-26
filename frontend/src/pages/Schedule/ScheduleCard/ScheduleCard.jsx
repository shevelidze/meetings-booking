import { Box } from '@chakra-ui/react';

export default function ScheduleCard(props) {
  return (
    <Box
      bg='white'
      p='0.5rem'
      borderRadius='1.5rem'
      style={{
        boxShadow: '0px 4px 10px 1px rgba(0, 0, 0, 0.25)',
      }}
      {...props}
    />
  );
}
