import PropTypes from 'prop-types';
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
  SaveButton,
  Button,
  BooleanInput,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  useDataProvider,
  useGetRecordId,
  useRefresh,
  useAuthProvider,
} from 'react-admin';
import { Box, Grid, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { staffAPIProvider } from '../../provider/staffAPIProvider';
import { useNavigate } from 'react-router-dom';

const PermissionAssignForm = () => {
  const translate = useTranslate();
  const recordId = useGetRecordId();
  const refresh = useRefresh();
  const isAllAllowed = useWatch({ name: 'is_allowed_all' });
  const permissionId = useWatch({ name: 'permission_id' });
  const [resourceName, setResourceName] = useState(null);
  const [isAllowedAllPermission, setIsAllowedAllPermission] = useState(true);
  const dataProvider = useDataProvider();
  const { setValue, handleSubmit } = useFormContext();

  useEffect(() => {
    if (permissionId) {
      dataProvider
        .getOne('permission', { id: permissionId })
        .then(({ data }) => {
          if (data && data.resource) {
            setResourceName(data.resource.name);
          }
          if (
            data &&
            data.type &&
            (data.type.name === 'create' || data.type.name === 'assign')
          ) {
            setIsAllowedAllPermission(true);
          } else {
            setIsAllowedAllPermission(false);
          }
        })
        .catch((error) => {
          console.error('Error fetching permission details:', error);
        });
    }
    setValue('allow_ids', []);
  }, [permissionId, dataProvider, setValue]);

  useEffect(() => {
    setValue('allow_ids', []);
  }, [isAllAllowed, setValue]);

  const getReference = () => {
    console.log(resourceName);

    return resourceName || 'staff';
  };

  const onSubmit = async ({ permission_id, is_allowed_all, allow_ids }) => {
    await staffAPIProvider.assignPermission({
      staff_id: recordId,
      permission_id,
      is_allowed_all: isAllowedAllPermission
        ? true
        : is_allowed_all === undefined
          ? false
          : is_allowed_all,
      allow_ids,
    });

    setValue('permission_id', '');
    setValue('is_allowed_all');
    setValue('allow_ids', []);
    setIsAllowedAllPermission(true);
    refresh();
  };

  return (
    <>
      <Typography variant="h6">
        {translate('resources.staff.show.labels.assign_permissions_lbl')}
      </Typography>
      <ReferenceInput source="permission_id" reference="permission" />
      {!isAllowedAllPermission && (
        <BooleanInput
          name="is_allowed_all"
          label="All Allowed"
          source="is_allowed_all"
        />
      )}
      {!isAllowedAllPermission && !isAllAllowed && (
        <ReferenceArrayInput source="allow_ids" reference={getReference()}>
          <AutocompleteArrayInput
            optionText={(choice) =>
              `#${choice.id} ${choice.name ? choice.name : choice.first_name + ' ' + choice.last_name}`
            }
          />
        </ReferenceArrayInput>
      )}

      <Button
        startIcon={<SaveIcon />}
        label={translate('resources.staff.show.fields.assign_btn_name')}
        variant="contained"
        color="primary"
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

const StaffInformationTab = () => {
  return (
    <>
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <TextInput source="email" type="email" />
      <TextInput source="department" />
      <ReferenceInput source="position_id" reference="staff-position" />
      <TextInput source="bio" multiline resettable />
      <SaveButton />
    </>
  );
};

const AllowIdUrlField = ({ source }) => {
  const record = useRecordContext();
  if (!record) return null;
  if (record['is_allowed_all']) return <div>All</div>;
  if (!record[source]) return <div>-</div>;
  const ids = record[source];
  const resourceName = record.permission.resource.name;
  const typeName = record.permission.type.name;
  const links = ids.map((id) => (
    <a
      key={id}
      href={
        typeName === 'read' ? `/#/${resourceName}` : `/#/${resourceName}/${id}`
      }
      style={{ marginRight: '4px' }}
    >{`#${id}`}</a>
  ));
  return links;
};

AllowIdUrlField.propTypes = {
  source: PropTypes.string.isRequired,
};

const StaffPermissionTab = () => {
  const translate = useTranslate();
  const authProvider = useAuthProvider();
  const record = useRecordContext();
  return (
    <>
      {record && !record.is_root && (
        <>
          {authProvider.canAccess({
            resource: 'staff-permission',
            action: 'assign',
          }) && <PermissionAssignForm />}
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
              <AllowIdUrlField source="allow_ids" label="Access" />
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
  const recordId = useGetRecordId();
  const authProvider = useAuthProvider();
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchAllowIds = async () => {
      const ids = await authProvider.getAllowIds({
        resource: 'staff',
        action: 'edit',
      });
      if (recordId && ids.length && !ids.includes(+recordId)) {
        navigate('/access-denied');
      }
    };

    fetchAllowIds();
  }, [authProvider, recordId, navigate]);

  return (
    <Edit transform={transform} mutationMode="pessimistic">
      <TabbedForm toolbar={false}>
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
