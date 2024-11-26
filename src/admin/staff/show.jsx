import { useEffect, useState } from 'react';
import {
  Show,
  TabbedShowLayout,
  Labeled,
  ReferenceField,
  TextField,
  DateField,
  useTranslate,
  Button,
  useGetRecordId,
  useShowContext,
} from 'react-admin';
import {
  Autocomplete,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField as MUITextField,
  Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { authProvider } from '../../provider/authProvider';

const StaffShowLayout = ({ recordId }) => {
  const translate = useTranslate();
  const [staffPermissions, setStaffPermissions] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const { record } = useShowContext();

  const fetchUsers = async (userIds) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user?filter={"id":` +
          JSON.stringify(userIds) +
          `}`,
      );
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  };

  const fetchUserNames = async (data) => {
    const userIds = data.map(
      (staffPermission) => staffPermission.created_by_id,
    );
    const uniqueUserIds = [...new Set(userIds)];

    const userNamesData = {};
    const users = await fetchUsers(uniqueUserIds);
    for (let index = 0; index < users.length; index++) {
      const user = users[index];

      userNamesData[user.id] =
        `${user.staff.first_name} ${user.staff.last_name}`;
    }
    setUserNames(userNamesData);
  };

  const handleAssignSubmit = async ({ permissions }) => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/staff-permission',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: '*/*',
          },
          body: JSON.stringify({
            staff_id: +recordId,
            permission_ids: permissions,
          }),
        },
      );
      if (!response.ok) {
        throw new Error('Failed to assign permissions');
      }

      const result = await response.json();
      if (result.data) {
        await fetchUserNames(result.data);
      }
      setStaffPermissions(result.data ? result.data : []);
      setSelectedPermissions([]);
    } catch (error) {
      console.error('Error assigning permissions:', error);
    }
  };

  useEffect(
    () => {
      const fetchPermissions = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/permission');
          const result = await response.json();
          setPermissions(result.data ? result.data : []);
        } catch (error) {
          console.error('Error fetching permissions:', error);
        }
      };

      const fetchStaffPermissions = async () => {
        try {
          const response = await fetch(
            'http://localhost:3000/api/staff-permission/by/' + recordId,
          );
          const result = await response.json();
          setStaffPermissions(result.data ? result.data : []);

          if (result.data) {
            await fetchUserNames(result.data);
          }
        } catch (error) {
          console.error('Error fetching staffPermissions:', error);
        }
      };

      fetchPermissions();
      fetchStaffPermissions();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleAssignClick = () => {
    handleAssignSubmit({
      permissions: selectedPermissions.map((perm) => perm.id),
    });
  };

  return (
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
      {record && !record.is_root && (
        <TabbedShowLayout.Tab label="resources.staff.show.tab.permission">
          <Box sx={{ minHeight: '400px', display: 'block' }}>
            {authProvider.canAccess({
              resource: 'staff',
              action: 'edit',
            }) && (
              <>
                <Typography variant="h6">
                  {translate(
                    'resources.staff.show.labels.assign_permissions_lbl',
                  )}
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  gap={2}
                  alignItems="center"
                  paddingBottom={'16px'}
                >
                  <Box
                    flex="2"
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      options={permissions}
                      getOptionLabel={(option) =>
                        `[${option.resource.name}] ${option.type.name}`
                      }
                      size="small"
                      value={selectedPermissions}
                      onChange={(event, newValue) =>
                        setSelectedPermissions(newValue)
                      }
                      renderInput={(params) => (
                        <MUITextField
                          {...params}
                          variant="standard"
                          label={translate(
                            'resources.staff.show.fields.permissions',
                          )}
                        />
                      )}
                      fullWidth
                    />
                  </Box>

                  <Box flex="1" display="flex">
                    <Button
                      startIcon={<SaveIcon />}
                      onClick={handleAssignClick}
                      disabled={selectedPermissions.length === 0}
                      color="primary"
                      variant="contained"
                      label={translate(
                        'resources.staff.show.fields.assign_btn_name',
                      )}
                    />
                  </Box>
                </Box>
              </>
            )}

            {/* Table for Permissions */}
            <Typography variant="h6">
              {translate('resources.staff.show.labels.assigned_permission_lbl')}
            </Typography>
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
                {staffPermissions.map((staffPermission) => (
                  <TableRow key={staffPermission.id}>
                    <TableCell>{staffPermission.permission.name}</TableCell>
                    <TableCell>
                      {staffPermission.permission.resource.name}
                    </TableCell>
                    <TableCell>
                      {staffPermission.permission.type.name}
                    </TableCell>
                    <TableCell>
                      {userNames[staffPermission.created_by_id]}
                    </TableCell>

                    <TableCell>
                      <DateField
                        source="created_at.seconds.low"
                        showTime
                        transform={() =>
                          new Date(
                            staffPermission.created_at.seconds.low * 1000,
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </TabbedShowLayout.Tab>
      )}

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
  );
};

export const StaffShow = () => {
  const recordId = useGetRecordId();
  return (
    <Show>
      <StaffShowLayout recordId={recordId} />
    </Show>
  );
};
