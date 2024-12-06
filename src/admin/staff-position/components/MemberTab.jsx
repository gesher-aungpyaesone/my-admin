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
    <>
      <ReferenceManyField
        filter={filters}
        reference="staff"
        target="position_id"
        pagination={<Pagination sx={{ width: '100%' }} />}
      >
        <Datagrid bulkActionButtons={false} sx={{ width: '100%' }}>
          <TextField source="id" />
          <TextField source="first_name" />
          <TextField source="last_name" />
          <EmailField source="email" />

          <TextField
            sortBy="department_id"
            source="department.name"
            label="resources.staff.fields.department_id"
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
