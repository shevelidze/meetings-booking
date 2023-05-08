import { useState } from 'react';
import { getShortDateOfWeekByIndex } from '@/utils';
import {
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { BiPencil, BiTrash } from 'react-icons/bi';

export default function SlotRuleItem({ slotRule, onEditClick, onDeleteClick }) {
  const [deleteConfirmationModalIsShown, setDeleteConfirmationModalIsShown] =
    useState(false);

  return (
    <Flex
      borderRadius='1rem'
      p='1rem'
      justifyContent='space-between'
      bg='blue.700'
      color='white'
      gap={4}
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
              onClick={() => setDeleteConfirmationModalIsShown(true)}
            />
          }
        />
      </HStack>

      <Modal
        isOpen={deleteConfirmationModalIsShown}
        onClose={() => setDeleteConfirmationModalIsShown(false)}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            Are you sure you want to delete this slot rule?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onDeleteClick}>
              Delete
            </Button>
            <Button onClick={() => setDeleteConfirmationModalIsShown(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
