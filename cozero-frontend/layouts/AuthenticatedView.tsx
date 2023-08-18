import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

interface Props {
  children: React.ReactNode;
}

export default function AuthenticatedView({ children }: Props) {
  const { user } = useAuth();

  if (!user) {
    return (
      <Navigate to={'/sign-in'} state={{ from: location.pathname }} replace />
    );
  }

  if (user) {
    return <>{children}</>;
  }

  return <div>Loading...</div>;
}
