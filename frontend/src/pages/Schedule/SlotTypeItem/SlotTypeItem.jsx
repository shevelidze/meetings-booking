import { Flex, HStack, Text } from '@chakra-ui/react';

export default function SlotTypeItem({ slotType }) {
  return (
    <Flex
      borderRadius='1rem'
      p='1rem'
      bg={slotType.color}
      justifyContent='space-between'
      color='white'
    >
      <Text fontWeight='bold'>{slotType.name}</Text>
      <HStack>
        <Text>{slotType.duration} minutes</Text>
      </HStack>
    </Flex>
  );
}
