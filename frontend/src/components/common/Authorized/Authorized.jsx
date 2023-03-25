import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { selectAuth } from '@/store/slices/auth';

export default function Authorized() {
  const authState = useSelector(selectAuth);

  if (authState.status === 'restoringSession') {
    return null;
  } else if (authState.status === 'unauthorized') {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
}
