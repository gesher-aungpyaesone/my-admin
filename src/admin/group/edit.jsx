import { Edit, TabbedForm } from 'react-admin';
import { InformationTab } from './components/InformationTab';
import { PermissionTab } from './components/PermissionTab';
import { MemberTab } from './components/MemberTab';
import { HistoryTab } from './components/HistoryTab';

export const GroupEdit = () => {
  const transform = (data) => {
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
        <TabbedForm.Tab label="resources.group.tabs.info">
          <InformationTab />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="resources.group.tabs.permission">
          <PermissionTab />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="resources.group.tabs.member">
          <MemberTab />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="resources.group.tabs.history">
          <HistoryTab />
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  );
};
