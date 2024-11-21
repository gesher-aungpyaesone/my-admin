import { useEffect, useState } from 'react';
import {
  Show,
  TabbedShowLayout,
  Labeled,
  ReferenceField,
  TextField,
  DateField,
  useTranslate,
} from 'react-admin';
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

export const StaffShow = () => {
  const translate = useTranslate();
  const [permissions, setPermissions] = useState([]);

  // Fetch permissions when the component mounts
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/staff-permission/by/1',
        );
        const result = await response.json();
        setPermissions(result.data); // Set the permissions data in state
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    fetchPermissions();
  }, []);

  return (
    <Show>
      <TabbedShowLayout>
        {/* Profile Tab */}
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
                  <TextField source="email" />
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

        {/* Permission Tab */}
        <TabbedShowLayout.Tab label="resources.staff.show.tab.permission">
          <Box sx={{ minHeight: '400px', display: 'block' }}>
            {/* Table for Permissions */}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {translate('resources.permission.fields.name')}
                  </TableCell>
                  <TableCell>
                    {translate('resources.permission.fields.resource.name')}
                  </TableCell>
                  <TableCell>
                    {translate('resources.permission.fields.type.name')}
                  </TableCell>
                  <TableCell>
                    {translate('resources.permission.fields.created_at')}
                  </TableCell>
                  <TableCell>
                    {translate('resources.permission.fields.created_by_id')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {permissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell>{permission.permission.name}</TableCell>
                    <TableCell>{permission.permission.resource.name}</TableCell>
                    <TableCell>{permission.permission.type.name}</TableCell>
                    <TableCell>
                      <ReferenceField
                        source="created_by_id"
                        reference="user"
                        link={false}
                      >
                        <TextField source="staff.first_name" />{' '}
                        <TextField source="staff.last_name" />
                      </ReferenceField>
                    </TableCell>
                    <TableCell>
                      <DateField
                        source="created_at.seconds.low"
                        label="Created At"
                        showTime
                        transform={(value) => new Date(value * 1000)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </TabbedShowLayout.Tab>

        {/* History Tab */}
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
};
