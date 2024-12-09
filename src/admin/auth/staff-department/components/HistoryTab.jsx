import { DateField, Labeled, ReferenceField, TextField } from 'react-admin';
import { Box, Grid } from '@mui/material';

export const HistoryTab = () => {
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
                label="resources.staff-department.fields.created_at"
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
                label="resources.staff-department.fields.updated_at"
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
