import {
  ReferenceManyField,
  Pagination,
  Datagrid,
  TextField,
  ReferenceField,
  DateField,
  useTranslate,
} from 'react-admin';
import { Typography } from '@mui/material';

export const GroupTab = () => {
  const translate = useTranslate();
  return (
    <>
      <Typography variant="h6">
        {translate('resources.staff.labels.assigned_group')}
      </Typography>
      <ReferenceManyField
        reference="staff-group"
        target="staff_id"
        pagination={<Pagination sx={{ width: '100%' }} />}
      >
        <Datagrid bulkActionButtons={false} sx={{ width: '100%' }}>
          <ReferenceField
            sortBy="group_id"
            source="group.id"
            reference="group"
            label="resources.group.fields.name"
          ></ReferenceField>
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
        </Datagrid>
      </ReferenceManyField>
    </>
  );
};
