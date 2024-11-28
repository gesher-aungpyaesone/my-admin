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
  ReferenceManyField,
  Datagrid,
} from 'react-admin';
import {
  Autocomplete,
  Box,
  Grid,
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

const PermissionTable = () => {
  const translate = useTranslate();
  return (
    <>
      <Typography variant="h6">
        {translate('resources.staff.show.labels.assigned_permission_lbl')}
      </Typography>
      <ReferenceManyField reference="staff-permission" target="staff_id">
        <Datagrid bulkActionButtons={false}>
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
  const [permissions, setPermissions] = useState([]);
  const { record } = useShowContext();

  const handleAssignSubmit = async ({ permissions }) => {
    try {
      await staffAPIProvider.assignPermissions(
        recordId,
        permissions.map((perm) => perm.id),
      );
    } catch (error) {
      console.error('Error assigning permissions:', error);
    }
  };

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const result = await staffAPIProvider.getPermissions();
        setPermissions(result.data || []);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };
    fetchPermissions();
  }, []);
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
            <PermissionTable />
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
