import {
  DatagridConfigurable,
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
      <ExportButton />
    </TopToolbar>
  );
};
export const PermissionList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <List actions={<ListActions />} title="resources.permission.list">
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.resource.name}
          tertiaryText={(record) => record.type.name}
        />
      ) : (
        <DatagridConfigurable>
          <TextField source="id" />
          <TextField source="name" />
          <NumberField source="resource.name" sortBy="resource_id" />
          <NumberField source="type.name" sortBy="type_id" />
        </DatagridConfigurable>
      )}
    </List>
  );
};
