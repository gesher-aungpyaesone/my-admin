import { Edit, TabbedForm, useGetRecordId, useAuthProvider } from 'react-admin';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InformationTab } from './components/InformationTab';
import { PermissionTab } from './components/PermissionTab';
import { GroupTab } from './components/GroupTab';
import { HistoryTab } from './components/HistoryTab';

export const StaffEdit = () => {
  const recordId = useGetRecordId();
  const authProvider = useAuthProvider();
  const navigate = useNavigate();
  const transform = (data) => {
    if (data.user_id) delete data.user_id;
    if (data.password) delete data.password;
    if (data.created_at) delete data.created_at;
    if (data.updated_at) delete data.updated_at;
    if (data.deleted_at) delete data.deleted_at;
    if (data.created_by_id) delete data.created_by_id;
    if (data.updated_by_id) delete data.updated_by_id;
    return data;
  };

  useEffect(() => {
    const fetchAllowIds = async () => {
      const ids = await authProvider.getAllowIds({
        resource: 'staff',
        action: 'edit',
      });
      if (recordId && ids.length && !ids.includes(+recordId)) {
        navigate('/access-denied');
      }
    };

    fetchAllowIds();
  }, [authProvider, recordId, navigate]);

  return (
    <Edit transform={transform} mutationMode="pessimistic">
      <TabbedForm toolbar={false}>
        <TabbedForm.Tab label="resources.staff.tabs.info">
          <InformationTab />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="resources.staff.tabs.permission">
          <PermissionTab />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="resources.staff.tabs.group">
          <GroupTab />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="resources.staff.tabs.history">
          <HistoryTab />
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  );
};
