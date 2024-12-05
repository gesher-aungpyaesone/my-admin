import {
  Datagrid,
  DateField,
  EmailField,
  Pagination,
  ReferenceManyField,
  TextField,
  useTranslate,
} from 'react-admin';
import { Typography } from '@mui/material';

export const MemberTable = () => {
  const translate = useTranslate();
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
          <TextField source="id" />
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
          <TextField
            source="staff.department"
            label="resources.staff.fields.department"
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
