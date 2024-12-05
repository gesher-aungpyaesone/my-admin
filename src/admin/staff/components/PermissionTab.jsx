import { useAuthProvider, useRecordContext, useTranslate } from 'react-admin';
import { PermissionAssignForm } from './PermissionAssignForm';
import { PermissionTable } from './PermissionTable';

export const PermissionTab = () => {
  const translate = useTranslate();
  const authProvider = useAuthProvider();
  const record = useRecordContext();
  return (
    <>
      {record && !record.is_root && (
        <>
          {authProvider.canAccess({
            resource: 'staff-permission',
            action: 'assign',
          }) && <PermissionAssignForm />}
          <PermissionTable />
        </>
      )}
      {record && record.is_root && (
        <p>{translate('resources.staff.messages.root_access_msg')}</p>
      )}
    </>
  );
};
