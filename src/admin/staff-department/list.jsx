import {
  DatagridConfigurable,
  DateField,
  List,
  ListActions,
  ReferenceField,
  SimpleList,
  TextField,
  useAuthProvider,
} from 'react-admin';

import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

export const StaffDepartmentList = () => {
  const authProvider = useAuthProvider();
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [allowIds, setAllowIds] = useState([]);

  useEffect(() => {
    const fetchAllowIds = async () => {
      const ids = await authProvider.getAllowIds({
        resource: 'staff-department',
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
      title="resources.staff-department.list"
      filter={filters}
    >
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
            label="resources.staff-department.fields.created_at"
            showTime
            sortBy="created_at"
            transform={(value) => new Date(value * 1000)}
          />
          <DateField
            source="updated_at.seconds.low"
            label="resources.staff-department.fields.updated_at"
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