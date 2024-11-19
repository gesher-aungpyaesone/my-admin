import {
  CreateButton,
  DatagridConfigurable,
  DateField,
  EmailField,
  ExportButton,
  List,
  NumberField,
  ReferenceField,
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

export const StaffList = () => (
  <List actions={<ListActions />} title="resources.staff.list">
    <DatagridConfigurable>
      <TextField source="id" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <EmailField source="email" />
      <TextField source="department" />
      <ReferenceField source="position_id" reference="staff-position" />
      <DateField
        source="created_at.seconds.low"
        label="resources.staff.fields.created_at"
        showTime
        sortBy="created_at"
        transform={(value) => new Date(value * 1000)}
      />
      <DateField
        source="updated_at.seconds.low"
        label="resources.staff.fields.updated_at"
        showTime
        sortBy="updated_at"
        transform={(value) => new Date(value * 1000)}
      />
      <NumberField source="created_by_id" />
      <NumberField source="updated_by_id" />
    </DatagridConfigurable>
  </List>
);
