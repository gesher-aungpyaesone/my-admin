import {
  Datagrid,
  DateField,
  Edit,
  EmailField,
  Labeled,
  Pagination,
  ReferenceField,
  ReferenceManyField,
  SaveButton,
  TabbedForm,
  TextField,
  TextInput,
  useAuthProvider,
  useGetRecordId,
} from 'react-admin';
import { Box, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StaffPositionInformationTab = () => {
  return (
    <>
      <TextInput source="name" />
      <TextInput source="description" />
      <SaveButton />
    </>
  );
};

const MembersTab = () => {
  return (
    <>
      <ReferenceManyField
        reference="staff"
        target="position_id"
        pagination={<Pagination sx={{ width: '100%' }} />}
      >
        <Datagrid bulkActionButtons={false} sx={{ width: '100%' }}>
          <TextField source="id" />
          <TextField source="first_name" />
          <TextField source="last_name" />
          <EmailField source="email" />
          <TextField source="department" />
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

const HistoryTab = () => {
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
                label="resources.staff-position.fields.created_at"
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
                label="resources.staff-position.fields.updated_at"
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

export const StaffPositionEdit = () => {
  const recordId = useGetRecordId();
  const authProvider = useAuthProvider();
  const navigate = useNavigate();
  const transform = (data) => {
    if (data.created_at) delete data.created_at;
    if (data.updated_at) delete data.updated_at;
    if (data.deleted_at) delete data.deleted_at;
    if (data.created_by_id) delete data.created_by_id;
    if (data.updated_by_id) delete data.updated_by_id;
    return data;
  };

  useEffect(() => {
    const fetchAllowIds = async () => {
      const ids = await authProvider.getAllowIds({
        resource: 'staff-position',
        action: 'read',
      });
      if (recordId && ids.length && !ids.includes(+recordId)) {
        navigate('/access-denied');
      }
    };

    fetchAllowIds();
  }, [authProvider, recordId, navigate]);

  return (
    <Box>
      <Edit transform={transform} mutationMode="pessimistic">
        <TabbedForm toolbar={false}>
          <TabbedForm.Tab label="resources.staff-position.tabs.info">
            <StaffPositionInformationTab />
          </TabbedForm.Tab>
          {authProvider.canAccess('staff', 'read') && (
            <TabbedForm.Tab label="resources.staff-position.tabs.member">
              <MembersTab />
            </TabbedForm.Tab>
          )}
          <TabbedForm.Tab label="resources.staff-position.tabs.history">
            <HistoryTab />
          </TabbedForm.Tab>
        </TabbedForm>
      </Edit>
    </Box>
  );
};
