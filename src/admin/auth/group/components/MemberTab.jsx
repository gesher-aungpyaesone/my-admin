import { useAuthProvider, useRecordContext, useTranslate } from 'react-admin';
import { MemberTable } from './MemberTable';
import { MemberAssignForm } from './MemberAssignForm';

export const MemberTab = () => {
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
          }) && <MemberAssignForm />}
          <MemberTable />
        </>
      )}
      {record && record.is_root && (
        <p>{translate('resources.staff.messages.root_access')}</p>
      )}
    </>
  );
};
