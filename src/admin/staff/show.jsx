import {
  DateField,
  EmailField,
  Labeled,
  ReferenceField,
  Show,
  TabbedShowLayout,
  TextField,
} from 'react-admin';
import { Box, Grid } from '@mui/material';

export const StaffShow = () => (
  <Show>
    <TabbedShowLayout>
      <TabbedShowLayout.Tab label="resources.staff.show.tab.profile">
        <Box sx={{ minHeight: '400px', display: 'block' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Labeled>
                <TextField source="id" />
              </Labeled>
            </Grid>
            <Grid item xs={4}>
              <Labeled>
                <TextField source="first_name" />
              </Labeled>
            </Grid>
            <Grid item xs={4}>
              <Labeled>
                <TextField source="last_name" />
              </Labeled>
            </Grid>

            <Grid item xs={12}>
              <Labeled>
                <EmailField source="email" />
              </Labeled>
            </Grid>

            <Grid item xs={4}>
              <Labeled>
                <ReferenceField
                  source="position_id"
                  reference="staff-position"
                />
              </Labeled>
            </Grid>
            <Grid item xs={4}>
              <Labeled>
                <TextField source="department" />
              </Labeled>
            </Grid>

            <Grid item xs={12}>
              <Labeled>
                <TextField source="bio" />
              </Labeled>
            </Grid>
          </Grid>
        </Box>
      </TabbedShowLayout.Tab>
      <TabbedShowLayout.Tab label="resources.staff.show.tab.permission">
        <Box sx={{ minHeight: '400px', display: 'block' }}>{/* TODO */}</Box>
      </TabbedShowLayout.Tab>

      <TabbedShowLayout.Tab label="resources.staff.show.tab.history">
        <Box sx={{ minHeight: '400px', display: 'block' }}>
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
      </TabbedShowLayout.Tab>
    </TabbedShowLayout>
  </Show>
);
