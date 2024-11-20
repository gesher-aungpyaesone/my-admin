import {
  CreateButton,
  DatagridConfigurable,
  DateField,
  ExportButton,
  List,
  NumberField,
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

export const StaffPositionList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <List actions={<ListActions />} title="resources.staff-position.list">
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.description}
        />
      ) : (
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
      )}
    </List>
  );
};
