import {
  DatagridConfigurable,
  DateField,
  EmailField,
  List,
  ReferenceField,
  SimpleList,
  TextField,
  useAuthProvider,
} from 'react-admin';
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { ListActions } from '@component/ListActions';

export const StaffList = () => {
  const authProvider = useAuthProvider();
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [allowIds, setAllowIds] = useState([]);
  const [isAllowedAll, setIsAllowedAll] = useState(true);

  useEffect(() => {
    const fetchAllowIds = async () => {
      const { allow_ids, is_allowed_all } = await authProvider.getAllowIds({
        resource: 'staff',
        action: 'read',
      });
      setAllowIds(allow_ids);
      setIsAllowedAll(is_allowed_all);
    };

    fetchAllowIds();
  }, [authProvider]);

  const filters = allowIds.length > 0 ? { id: allowIds } : {};
  filters['is_allowed_all'] = isAllowedAll ? 1 : 0;

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
          <TextField
            source="department.name"
            sortBy="department_id"
            label="resources.staff.fields.department_id"
          />
          <TextField
            source="position.name"
            sortBy="position_id"
            label="resources.staff.fields.position_id"
          />
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
