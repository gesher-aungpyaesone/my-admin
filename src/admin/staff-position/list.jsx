import {
  CreateButton,
  DatagridConfigurable,
  DateField,
  ExportButton,
  List,
  NumberField,
  SelectColumnsButton,
  TextField,
  TopToolbar,
} from 'react-admin';

const ListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const StaffPositionList = () => (
  <List actions={<ListActions />} title="resources.staff-position.list">
    <DatagridConfigurable>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <DateField
        source="created_at.seconds.low"
        label="resources.staff-position.fields.created_at"
        showTime
        sortBy="created_at"
        transform={(value) => new Date(value * 1000)}
      />
      <DateField
        source="updated_at.seconds.low"
        label="resources.staff-position.fields.updated_at"
        showTime
        sortBy="updated_at"
        transform={(value) => new Date(value * 1000)}
      />
      <NumberField source="created_by_id" />
      <NumberField source="updated_by_id" />
    </DatagridConfigurable>
  </List>
);
