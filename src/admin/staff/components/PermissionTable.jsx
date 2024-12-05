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
import { AllowIdUrlField } from '../../../components/AllowIdUrlField';

export const PermissionTable = () => {
  const translate = useTranslate();
  const authProvider = useAuthProvider();
  return (
    <>
      <Typography variant="h6">
        {translate('resources.staff.labels.assigned_permission')}
      </Typography>
      <ReferenceManyField
        reference="staff-permission"
        target="staff_id"
        pagination={<Pagination sx={{ width: '100%' }} />}
      >
        <Datagrid bulkActionButtons={false} sx={{ width: '100%' }}>
          <ReferenceField
            sortBy="permission_id"
            source="permission.id"
            reference="permission"
            label="resources.permission.fields.name"
          ></ReferenceField>
          <AllowIdUrlField
            sortable={false}
            source="allow_ids"
            label="resources.permission.fields.allow_ids"
          />
          <ReferenceField
            sortable={false}
            source="permission.id"
            reference="permission"
            label="resources.permission.fields.resource.name"
          >
            <TextField source="resource.name" />
          </ReferenceField>
          <ReferenceField
            sortable={false}
            source="permission.id"
            reference="permission"
            label="resources.permission.fields.type.name"
          >
            <TextField source="type.name" />
          </ReferenceField>
          <ReferenceField
            source="created_by_id"
            reference="user"
            label="resources.permission.fields.created_by_id"
          >
            <TextField source="staff.first_name" />{' '}
            <TextField source="staff.last_name" />
          </ReferenceField>
          <DateField
            sortBy="created_at"
            label="resources.permission.fields.created_at"
            source="created_at.seconds.low"
            showTime
            transform={(value) => new Date(value * 1000)}
          />
          {authProvider.canAccess({
            resource: 'staff-permission',
            action: 'assign',
          }) && <DeleteButton redirect={false} />}
        </Datagrid>
      </ReferenceManyField>
    </>
  );
};
