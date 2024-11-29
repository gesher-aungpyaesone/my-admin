import {
  Edit,
  TextInput,
  ReferenceInput,
  TabbedForm,
  ReferenceManyField,
  Pagination,
  Datagrid,
  TextField,
  ReferenceField,
  DateField,
  Labeled,
  useTranslate,
  useRecordContext,
} from 'react-admin';
import { Box, Grid, Typography } from '@mui/material';

const StaffInformationTab = () => {
  return (
    <>
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <TextInput source="email" type="email" />
      <TextInput source="department" />
      <ReferenceInput source="position_id" reference="staff-position" />
      <TextInput source="bio" multiline resettable />
    </>
  );
};

const StaffPermissionTab = () => {
  const translate = useTranslate();
  const record = useRecordContext();
  return (
    <>
      {record && !record.is_root && (
        <>
          <Typography variant="h6">
            {translate('resources.staff.show.labels.assigned_permission_lbl')}
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
            </Datagrid>
          </ReferenceManyField>
        </>
      )}
      {record && record.is_root && (
        <p>{translate('resources.staff.messages.root_access_msg')}</p>
      )}
    </>
  );
};

const StaffGroupTab = () => {
  const translate = useTranslate();
  return (
    <>
      <Typography variant="h6">
        {translate('resources.staff.show.labels.assigned_group_lbl')}
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

const StaffHistoryTab = () => {
  return (
    <>
      <Box sx={{ display: 'block' }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Labeled>
              <ReferenceField
                source="created_by_id"
                reference="user"
                link={false}
              >
                <TextField source="staff.first_name" />{' '}
                <TextField source="staff.last_name" />
              </ReferenceField>
            </Labeled>
          </Grid>
          <Grid item xs={8}>
            <Labeled>
              <DateField
                source="created_at.seconds.low"
                label="resources.staff.fields.created_at"
                showTime
                transform={(value) => new Date(value * 1000)}
              />
            </Labeled>
          </Grid>
          <Grid item xs={4}>
            <Labeled>
              <ReferenceField
                source="updated_by_id"
                reference="user"
                link={false}
              >
                <TextField source="staff.first_name" />{' '}
                <TextField source="staff.last_name" />
              </ReferenceField>
            </Labeled>
          </Grid>
          <Grid item xs={8}>
            <Labeled>
              <DateField
                source="updated_at.seconds.low"
                label="resources.staff.fields.updated_at"
                showTime
                transform={(value) => new Date(value * 1000)}
              />
            </Labeled>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export const StaffEdit = () => {
  const transform = (data) => {
    if (data.user_id) delete data.user_id;
    if (data.password) delete data.password;
    if (data.created_at) delete data.created_at;
    if (data.updated_at) delete data.updated_at;
    if (data.deleted_at) delete data.deleted_at;
    if (data.created_by_id) delete data.created_by_id;
    if (data.updated_by_id) delete data.updated_by_id;
    return data;
  };

  return (
    <Edit transform={transform} mutationMode="pessimistic">
      <TabbedForm>
        <TabbedForm.Tab label="resources.staff.tabs.info">
          <StaffInformationTab />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="resources.staff.tabs.permission">
          <StaffPermissionTab />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="resources.staff.tabs.group">
          <StaffGroupTab />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="resources.staff.tabs.history">
          <StaffHistoryTab />
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  );
};
