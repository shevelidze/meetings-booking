import { Icon } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

export default function SidebarItem({ icon, to }) {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <Icon as={icon} color={isActive ? 'cyan.400' : 'white'} boxSize={8} />
      )}
    </NavLink>
  );
}
