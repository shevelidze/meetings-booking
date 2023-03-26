import { Button } from '@chakra-ui/react';

export default function GhostIconButton({ icon, children, ...props }) {
  return (
    <Button rightIcon={icon} variant='ghost' {...props}>
      {...children}
    </Button>
  );
}
