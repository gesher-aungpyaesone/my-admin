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
  SimpleList,
  TextField,
  TopToolbar,
} from 'react-admin';
import { useMediaQuery } from '@mui/material';

const ListActions = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <TopToolbar>
      {!isSmall && <SelectColumnsButton />}
      <CreateButton />
      <ExportButton />
    </TopToolbar>
  );
};

export const StaffList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <List actions={<ListActions />} title="resources.staff.list">
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.first_name + ' ' + record.last_name}
          secondaryText={(record) => record.email}
          tertiaryText={(record) => record.department}
        />
      ) : (
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
      )}
    </List>
  );
};
