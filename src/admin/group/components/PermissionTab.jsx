import { useAuthProvider } from 'react-admin';
import { PermissionAssignForm } from './PermissionAssignForm';
import { PermissionTable } from './PermissionTable';

export const PermissionTab = () => {
  const authProvider = useAuthProvider();
  return (
    <>
      {authProvider.canAccess({
        resource: 'group-permission',
        action: 'assign',
      }) && <PermissionAssignForm />}
      <PermissionTable />
    </>
  );
};
