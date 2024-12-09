import { useAuthProvider, useRecordContext, useTranslate } from 'react-admin';
import { GroupAssignForm } from './GroupAssignForm';
import { GroupTable } from './GroupTable';

export const GroupTab = () => {
  const translate = useTranslate();
  const authProvider = useAuthProvider();
  const record = useRecordContext();
  return (
    <>
      {record && !record.is_root && (
        <>
          {authProvider.canAccess({
            resource: 'staff-group',
            action: 'assign',
          }) && <GroupAssignForm />}
          <GroupTable />
        </>
      )}
      {record && record.is_root && (
        <p>{translate('resources.staff.messages.root_access')}</p>
      )}
    </>
  );
};
