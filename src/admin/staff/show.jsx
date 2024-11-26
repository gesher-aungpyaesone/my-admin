import PropTypes from 'prop-types';
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
import { staffAPIProvider } from '../../provider/staffAPIProvider';

const HistoryTab = () => {
  return (
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
  );
};

const ProfileTab = () => {
  return (
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
            <ReferenceField source="position_id" reference="staff-position" />
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
  );
};

const PermissionTable = ({ staffPermissions, userNames }) => {
  const translate = useTranslate();
  return (
    <>
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
              <TableCell>{staffPermission.permission.resource.name}</TableCell>
              <TableCell>{staffPermission.permission.type.name}</TableCell>
              <TableCell>{userNames[staffPermission.created_by_id]}</TableCell>

              <TableCell>
                <DateField
                  source="created_at.seconds.low"
                  showTime
                  transform={() =>
                    new Date(staffPermission.created_at.seconds.low * 1000)
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
PermissionTable.propTypes = {
  staffPermissions: PropTypes.array.isRequired,
  userNames: PropTypes.objectOf(PropTypes.string).isRequired,
};

const AssignStaffPermission = ({ permissions, handleAssignSubmit }) => {
  const translate = useTranslate();
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const handleAssignClick = () => {
    handleAssignSubmit({ permissions: selectedPermissions });
    setSelectedPermissions([]);
  };

  return (
    <>
      <Typography variant="h6">
        {translate('resources.staff.show.labels.assign_permissions_lbl')}
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
            onChange={(event, newValue) => setSelectedPermissions(newValue)}
            renderInput={(params) => (
              <MUITextField
                {...params}
                variant="standard"
                label={translate('resources.staff.show.fields.permissions')}
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
            label={translate('resources.staff.show.fields.assign_btn_name')}
          />
        </Box>
      </Box>
    </>
  );
};
AssignStaffPermission.propTypes = {
  permissions: PropTypes.array.isRequired,
  handleAssignSubmit: PropTypes.func.isRequired,
};

const StaffShowLayout = ({ recordId }) => {
  const [staffPermissions, setStaffPermissions] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [userNames, setUserNames] = useState({});
  const { record } = useShowContext();

  const fetchUserNames = async (data) => {
    const userIds = data.map(
      (staffPermission) => staffPermission.created_by_id,
    );
    const uniqueUserIds = [...new Set(userIds)];

    const userNamesData = {};
    const users = await staffAPIProvider.getUsersByIds(uniqueUserIds);
    for (let index = 0; index < users.length; index++) {
      const user = users[index];

      userNamesData[user.id] =
        `${user.staff.first_name} ${user.staff.last_name}`;
    }
    setUserNames(userNamesData);
  };

  const handleAssignSubmit = async ({ permissions }) => {
    try {
      const result = await staffAPIProvider.assignPermissions(
        recordId,
        permissions.map((perm) => perm.id),
      );
      if (result.data) {
        await fetchUserNames(result.data);
      }
      setStaffPermissions(result.data || []);
    } catch (error) {
      console.error('Error assigning permissions:', error);
    }
  };

  useEffect(
    () => {
      const fetchPermissions = async () => {
        try {
          const result = await staffAPIProvider.getPermissions();
          setPermissions(result.data || []);
        } catch (error) {
          console.error('Error fetching permissions:', error);
        }
      };

      const fetchStaffPermissions = async () => {
        try {
          const result = await staffAPIProvider.getStaffPermissions(recordId);
          setStaffPermissions(result.data || []);
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
  StaffShowLayout.propTypes = {
    recordId: PropTypes.number.isRequired,
  };

  return (
    <TabbedShowLayout>
      {/* Profile Tab */}
      <TabbedShowLayout.Tab label="resources.staff.show.tab.profile">
        <ProfileTab />
      </TabbedShowLayout.Tab>
      {/* Permission Tab */}
      {record && !record.is_root && (
        <TabbedShowLayout.Tab label="resources.staff.show.tab.permission">
          <Box sx={{ minHeight: '400px', display: 'block' }}>
            {authProvider.canAccess({
              resource: 'staff',
              action: 'edit',
            }) && (
              <AssignStaffPermission
                permissions={permissions}
                handleAssignSubmit={handleAssignSubmit}
              />
            )}

            {/* Table for Permissions */}
            <PermissionTable
              userNames={userNames}
              staffPermissions={staffPermissions}
            />
          </Box>
        </TabbedShowLayout.Tab>
      )}
      {/* History Tab */}
      <TabbedShowLayout.Tab label="resources.staff.show.tab.history">
        <HistoryTab />
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
