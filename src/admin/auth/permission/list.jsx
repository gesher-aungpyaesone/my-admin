import { DatagridConfigurable, List, SimpleList, TextField } from 'react-admin';
import { useMediaQuery } from '@mui/material';

export const PermissionList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <List title="resources.permission.list">
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.resource.name}
          tertiaryText={(record) => record.type.name}
        />
      ) : (
        <DatagridConfigurable bulkActionButtons={false}>
          <TextField padding={'0px 4px'} source="id" />
          <TextField source="name" />
          <TextField source="resource.name" sortBy="resource_id" />
          <TextField source="type.name" sortBy="type_id" />
        </DatagridConfigurable>
      )}
    </List>
  );
};
