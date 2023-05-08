import { useState } from 'react';
import {
  Button,
  Flex,
  HStack,
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
import { Icon } from '@chakra-ui/react';

export default function SlotTypeItem({ slotType, onDeleteClick, onEditClick }) {
  const [deleteConfirmationModalIsShown, setDeleteConfirmationModalIsShown] =
    useState(false);

  return (
    <Flex
      borderRadius='1rem'
      p='1rem'
      bg={slotType.color}
      justifyContent='space-between'
      alignItems='center'
      color='white'
      gap={4}
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
            Are you sure you want to delete this slot type?
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
