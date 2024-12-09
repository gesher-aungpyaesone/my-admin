import { Edit, TabbedForm } from 'react-admin';
import { InformationTab } from './components/InformationTab';
import { HistoryTab } from './components/HistoryTab';

export const LanguageEdit = () => {
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
        <TabbedForm.Tab label="resources.ads-language.tabs.info">
          <InformationTab />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="resources.ads-language.tabs.history">
          <HistoryTab />
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  );
};
