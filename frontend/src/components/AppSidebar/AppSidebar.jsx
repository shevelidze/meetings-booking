import { logout } from '@/store/slices/auth';
import {
  Flex,
  Stack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { BiCalendar, BiCoffee, BiCog } from 'react-icons/bi';
import { useDispatch } from 'react-redux';

import SidebarItem from './SidebarItem';

export default function AppSidebar() {
  const dispatch = useDispatch();

  return (
    <Flex
      flexDir='column'
      justifyContent='space-between'
      px='4'
      py='8'
      background='blue.700'
    >
      <Stack spacing={6}>
        <SidebarItem to='/schedule' icon={BiCalendar} />
        {/* <SidebarItem to='/vacations' icon={BiCoffee} /> */}
        <SidebarItem to='/settings' icon={BiCog} />
      </Stack>
      <Stack spacing={6}>
        <Menu>
          <MenuButton w={8}>
            <Avatar size='full' />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </Flex>
  );
}
