import {
  ReferenceManyField,
  Pagination,
  Datagrid,
  TextField,
  ReferenceField,
  DateField,
  useTranslate,
  DeleteButton,
  useAuthProvider,
} from 'react-admin';
import { Typography } from '@mui/material';

export const GroupTable = () => {
  const translate = useTranslate();
  const authProvider = useAuthProvider();
  return (
    <>
      <Typography variant="h6">
        {translate('resources.staff.labels.assigned_groups')}
      </Typography>
      <ReferenceManyField
        reference="staff-group"
        target="staff_id"
        pagination={<Pagination sx={{ width: '100%' }} />}
      >
        <Datagrid bulkActionButtons={false} sx={{ width: '100%' }}>
          <TextField
            sortBy="group_id"
            source="group.name"
            label="resources.group.fields.name"
          ></TextField>
          <ReferenceField
            source="created_by_id"
            reference="user"
            label="resources.group.fields.created_by_id"
          >
            <TextField source="staff.first_name" />{' '}
            <TextField source="staff.last_name" />
          </ReferenceField>
          <DateField
            sortBy="created_at"
            label="resources.group.fields.created_at"
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
