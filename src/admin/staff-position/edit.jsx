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

export const StaffPositionEdit = () => {
  const transform = (data) => {
    if (data.created_at) delete data.created_at;
    if (data.updated_at) delete data.updated_at;
    if (data.deleted_at) delete data.deleted_at;
    if (data.created_by_id) delete data.created_by_id;
    if (data.updated_by_id) delete data.updated_by_id;
    return data;
  };

  return (
    <Box>
      <Edit transform={transform} mutationMode="pessimistic">
        <TabbedForm>
          <TabbedForm.Tab label="resources.staff-position.tabs.info">
            <TextInput source="name" />
            <TextInput source="description" />
          </TabbedForm.Tab>
          <TabbedForm.Tab label="resources.staff-position.tabs.member">
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
          </TabbedForm.Tab>
          <TabbedForm.Tab label="resources.staff-position.tabs.history">
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
          </TabbedForm.Tab>
        </TabbedForm>
      </Edit>
    </Box>
  );
};
