import { Box, Grid } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import AppSidebar from '@/components/AppSidebar';

export default function App() {
  return (
    <Grid height='100vh' templateColumns='max-content 1fr'>
      <AppSidebar />
      <Box p={8}>
        <Outlet />
      </Box>
    </Grid>
  );
}
