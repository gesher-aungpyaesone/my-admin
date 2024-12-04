import PropTypes from 'prop-types';
import {
  AutocompleteArrayInput,
  BooleanInput,
  Button,
  Datagrid,
  DateField,
  Edit,
  EmailField,
  Labeled,
  Pagination,
  ReferenceArrayInput,
  ReferenceField,
  ReferenceInput,
  ReferenceManyField,
  SaveButton,
  TabbedForm,
  TextField,
  TextInput,
  useAuthProvider,
  useDataProvider,
  useGetRecordId,
  useRecordContext,
  useRefresh,
  useTranslate,
} from 'react-admin';
import { Box, Grid, Typography } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { groupAPIProvider } from '../../provider/groupAPIProvider';

const GroupInformationTab = () => {
  return (
    <>
      <TextInput source="name" />
      <TextInput source="description" />
      <SaveButton />
    </>
  );
};

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
    return resourceName || 'staff';
  };

  const onSubmit = async ({ permission_id, is_allowed_all, allow_ids }) => {
    await groupAPIProvider.assignPermission({
      group_id: recordId,
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
              `#${choice.id} ${
                choice.name
                  ? choice.name
                  : choice.first_name +
                    ' ' +
                    choice.last_name +
                    ' | ' +
                    choice.department
              }`
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

const GroupPermissionTab = () => {
  const authProvider = useAuthProvider();
  return (
    <>
      {authProvider.canAccess({
        resource: 'group-permission',
        action: 'assign',
      }) && <PermissionAssignForm />}
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
      <TabbedForm toolbar={false}>
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
