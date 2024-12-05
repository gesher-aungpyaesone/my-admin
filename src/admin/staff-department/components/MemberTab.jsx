import {
  Datagrid,
  DateField,
  EmailField,
  Pagination,
  ReferenceManyField,
  TextField,
  useAuthProvider,
} from 'react-admin';
import { useEffect, useState } from 'react';

export const MemberTab = () => {
  const authProvider = useAuthProvider();
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
    <>
      <ReferenceManyField
        filter={filters}
        reference="staff"
        target="department_id"
        pagination={<Pagination sx={{ width: '100%' }} />}
      >
        <Datagrid bulkActionButtons={false} sx={{ width: '100%' }}>
          <TextField source="id" />
          <TextField source="first_name" />
          <TextField source="last_name" />
          <EmailField source="email" />
          <TextField
            sortBy="position_id"
            source="position.name"
            label="resources.staff.fields.position_id"
          />
          <DateField
            sortBy="created_at"
            label="resources.staff.fields.created_at"
            source="created_at.seconds.low"
            showTime
            transform={(value) => new Date(value * 1000)}
          />
        </Datagrid>
      </ReferenceManyField>
    </>
  );
};
