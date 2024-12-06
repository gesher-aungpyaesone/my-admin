import { Edit, TabbedForm } from 'react-admin';
import { InformationTab } from './components/InformationTab';
import { PermissionTab } from './components/PermissionTab';
import { GroupTab } from './components/GroupTab';
import { HistoryTab } from './components/HistoryTab';

export const StaffEdit = () => {
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
