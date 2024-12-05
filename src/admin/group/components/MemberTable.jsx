import {
  Datagrid,
  DateField,
  DeleteButton,
  EmailField,
  Pagination,
  ReferenceField,
  ReferenceManyField,
  TextField,
  useAuthProvider,
  useTranslate,
} from 'react-admin';
import { Typography } from '@mui/material';

export const MemberTable = () => {
  const translate = useTranslate();
  const authProvider = useAuthProvider();
  return (
    <>
      <Typography variant="h6">
        {translate('resources.staff.labels.assigned_staffs')}
      </Typography>
      <ReferenceManyField
        reference="staff-group"
        target="group_id"
        pagination={<Pagination sx={{ width: '100%' }} />}
      >
        <Datagrid bulkActionButtons={false} sx={{ width: '100%' }}>
          <TextField
            source="staff.first_name"
            label="resources.staff.fields.first_name"
          />
          <TextField
            source="staff.last_name"
            label="resources.staff.fields.last_name"
          />
          <EmailField
            source="staff.email"
            label="resources.staff.fields.email"
          />
          <ReferenceField
            source="staff.department_id"
            reference="staff-department"
            label="resources.staff.fields.department_id"
          />
          <DateField
            sortBy="created_at"
            label="resources.staff.fields.created_at"
            source="created_at.seconds.low"
            showTime
            transform={(value) => new Date(value * 1000)}
          />
          {authProvider.canAccess({
            resource: 'staff-group',
            action: 'assign',
          }) && <DeleteButton redirect={false} />}
        </Datagrid>
      </ReferenceManyField>
    </>
  );
};
