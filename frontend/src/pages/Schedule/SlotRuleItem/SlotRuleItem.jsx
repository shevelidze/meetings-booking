import { getShortDateOfWeekByIndex } from '@/utils';
import { Flex, HStack, Text } from '@chakra-ui/react';

export default function SlotRuleItem({ slotRule }) {
  return (
    <Flex
      borderRadius='1rem'
      p='1rem'
      justifyContent='space-between'
      bg='blue.700'
      color='white'
    >
      <Text
        fontWeight='bold'
        p={2}
        borderRadius='lg'
        bg={slotRule.slotType.color}
      >
        {slotRule.slotType.name}
      </Text>
      <HStack>
        {
          <Text>
            {slotRule.dayOfWeekIndexes
              .map(getShortDateOfWeekByIndex)
              .join(', ')}
          </Text>
        }
      </HStack>
    </Flex>
  );
}
