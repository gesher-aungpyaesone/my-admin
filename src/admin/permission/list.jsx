import {
  DatagridConfigurable,
  List,
  NumberField,
  SimpleList,
  TextField,
} from 'react-admin';

import { useMediaQuery } from '@mui/material';
import { ListActions } from '../../components/ListActions';

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
