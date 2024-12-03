import {
  CreateButton,
  DatagridConfigurable,
  DateField,
  EmailField,
  ExportButton,
  List,
  ReferenceField,
  SelectColumnsButton,
  SimpleList,
  TextField,
  TopToolbar,
  useAuthProvider,
} from 'react-admin';
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

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
  const authProvider = useAuthProvider();
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [allowIds, setAllowIds] = useState([]);

  useEffect(() => {
    const fetchAllowIds = async () => {
      const ids = await authProvider.getAllowIds({
        resource: 'staff',
        action: 'read',
      });
      setAllowIds(ids);
    };

    fetchAllowIds();
  }, [authProvider]);

  const filters = allowIds.length > 0 ? { id: allowIds } : {};
  return (
    <List
      actions={<ListActions />}
      title="resources.staff.list"
      filter={filters}
    >
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
          <TextField source="is_root" />
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
          <ReferenceField source="created_by_id" reference="user" link={false}>
            <TextField source="staff.first_name" />{' '}
            <TextField source="staff.last_name" />
          </ReferenceField>
          <ReferenceField source="updated_by_id" reference="user" link={false}>
            <TextField source="staff.first_name" />{' '}
            <TextField source="staff.last_name" />
          </ReferenceField>
        </DatagridConfigurable>
      )}
    </List>
  );
};
