import { Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { Icon } from '@chakra-ui/react';

export default function SlotTypeItem({ slotType, onDeleteClick, onEditClick }) {
  return (
    <Flex
      borderRadius='1rem'
      p='1rem'
      bg={slotType.color}
      justifyContent='space-between'
      alignItems='center'
      color='white'
    >
      <Text fontWeight='bold'>{slotType.name}</Text>
      <HStack>
        <Text>{slotType.duration} minutes</Text>
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
