import { getShortDateOfWeekByIndex } from '@/utils';
import { Flex, HStack, Icon, IconButton, Text } from '@chakra-ui/react';
import { BiPencil, BiTrash } from 'react-icons/bi';

export default function SlotRuleItem({ slotRule, onEditClick, onDeleteClick }) {
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
        <Text>
          {slotRule.dayOfWeekIndexes.map(getShortDateOfWeekByIndex).join(', ')}
        </Text>
        <IconButton
          variant='unstyled'
          icon={<Icon as={BiPencil} color='white' boxSize={6} />}
          onClick={onEditClick}
        />
        <IconButton
          variant='unstyled'
          icon={
            <Icon
              as={BiTrash}
              color='white'
              boxSize={6}
              onClick={onDeleteClick}
            />
          }
        />
      </HStack>
    </Flex>
  );
}
