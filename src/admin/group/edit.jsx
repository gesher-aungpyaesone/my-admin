import {
  Datagrid,
  DateField,
  Edit,
  EmailField,
  Labeled,
  Pagination,
  ReferenceField,
  ReferenceManyField,
  TabbedForm,
  TextField,
  TextInput,
} from 'react-admin';
import { Box, Grid } from '@mui/material';

const GroupInformationTab = () => {
  return (
    <>
      <TextInput source="name" />
      <TextInput source="description" />
    </>
  );
};

const GroupPermissionTab = () => {
  return (
    <>
      <ReferenceManyField
        reference="group-permission"
        target="group_id"
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
  );
};

const GroupMemberTab = () => {
  return (
    <>
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

const GroupHistoryTab = () => {
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
                label="resources.group.fields.created_at"
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
                label="resources.group.fields.updated_at"
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

export const GroupEdit = () => {
  const transform = (data) => {
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
        <TabbedForm.Tab label="resources.group.tabs.info">
          <GroupInformationTab />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="resources.group.tabs.permission">
          <GroupPermissionTab />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="resources.group.tabs.member">
          <GroupMemberTab />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="resources.group.tabs.history">
          <GroupHistoryTab />
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  );
};
