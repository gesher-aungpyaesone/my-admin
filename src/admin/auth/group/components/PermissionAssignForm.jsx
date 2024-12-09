import { useEffect, useState } from 'react';
import {
  AutocompleteArrayInput,
  AutocompleteInput,
  BooleanInput,
  Button,
  ReferenceArrayInput,
  ReferenceInput,
  useDataProvider,
  useGetRecordId,
  useRefresh,
  useTranslate,
} from 'react-admin';
import { Box, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useFormContext, useWatch } from 'react-hook-form';
import { groupAPIProvider } from '@provider/groupAPIProvider';

export const PermissionAssignForm = () => {
  const translate = useTranslate();
  const recordId = useGetRecordId();
  const refresh = useRefresh();
  const isAllAllowed = useWatch({ name: 'is_allowed_all' });
  const permissionId = useWatch({ name: 'permission_id' });
  const [typeName, setTypeName] = useState('');
  const [resourceName, setResourceName] = useState(null);
  const [isAllowedAllPermission, setIsAllowedAllPermission] = useState(true);
  const dataProvider = useDataProvider();
  const { setValue, handleSubmit } = useFormContext();

  useEffect(() => {
    if (permissionId) {
      dataProvider
        .getOne('permission', { id: permissionId })
        .then(({ data }) => {
          if (data && data.resource) setResourceName(data.resource.name);
          if (
            data &&
            data.type &&
            (data.type.name === 'create' || data.type.name === 'assign')
          ) {
            setIsAllowedAllPermission(true);
          } else {
            setIsAllowedAllPermission(false);
          }
          setTypeName(data.type.name);
        });
    }
    setValue('allow_ids', []);
  }, [permissionId, dataProvider, setValue]);

  useEffect(() => {
    setValue('allow_ids', []);
  }, [isAllAllowed, setValue]);

  const getReference = () => resourceName || 'staff';

  const onSubmit = async ({ permission_id, is_allowed_all, allow_ids }) => {
    await groupAPIProvider.assignPermission({
      group_id: recordId,
      permission_id,
      is_allowed_all: isAllowedAllPermission
        ? typeName === 'create'
          ? false
          : true
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
    <Box
      display={'flex'}
      flexDirection={'column'}
      width={'100%'}
      marginBottom={'14px'}
    >
      <Typography variant="h6">
        {translate('resources.group.labels.assign_permissions')}
      </Typography>
      <ReferenceInput source="permission_id" reference="permission">
        <AutocompleteInput
          label="resources.permission.name"
          optionText={(choice) => `#${choice.id} ${choice.name}`}
        />
      </ReferenceInput>
      {!isAllowedAllPermission && (
        <BooleanInput
          name="is_allowed_all"
          label={translate('resources.group.labels.all_allowed')}
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
                  : `${choice.first_name} ${choice.last_name} | ${choice.department.name}`
              }`
            }
          />
        </ReferenceArrayInput>
      )}

      <Button
        sx={{ width: 'fit-content' }}
        startIcon={<SaveIcon />}
        label={translate('resources.group.buttons.assign')}
        variant="contained"
        onClick={handleSubmit(onSubmit)}
      />
    </Box>
  );
};
