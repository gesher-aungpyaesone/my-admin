import {
  ReferenceInput,
  useTranslate,
  Button,
  BooleanInput,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  useDataProvider,
  useGetRecordId,
  useRefresh,
} from 'react-admin';
import { Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { staffAPIProvider } from '../../../provider/staffAPIProvider';

export const PermissionAssignForm = () => {
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
