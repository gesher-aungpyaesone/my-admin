import {
  AutocompleteInput,
  DeleteButton,
  ReferenceInput,
  SaveButton,
  TextInput,
  useAuthProvider,
  useGetIdentity,
  useGetRecordId,
  useRecordContext,
} from 'react-admin';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const InformationTab = () => {
  const recordId = useGetRecordId();
  const record = useRecordContext();
  const authProvider = useAuthProvider();
  const user = useGetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllowIds = async () => {
      const { allow_ids, is_allowed_all } = await authProvider.getAllowIds({
        resource: 'staff',
        action: 'edit',
      });
      if (!is_allowed_all) {
        if (
          !allow_ids.includes(+recordId) &&
          user.data.id !== record.created_by_id
        ) {
          navigate('/access-denied');
        }
      }
    };

    fetchAllowIds();
  }, [authProvider, recordId, user, record, navigate]);
  return (
    <>
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <TextInput source="email" type="email" />
      <ReferenceInput source="department_id" reference="staff-department">
        <AutocompleteInput
          optionText={(choice) => `#${choice.id} ${choice.name}`}
        />
      </ReferenceInput>
      <ReferenceInput source="position_id" reference="staff-position">
        <AutocompleteInput
          optionText={(choice) => `#${choice.id} ${choice.name}`}
        />
      </ReferenceInput>
      <TextInput source="bio" multiline resettable />
      <Box display={'flex'} gap={'10px'}>
        <SaveButton />
        {record && !record.is_root && <DeleteButton variant="contained" />}
      </Box>
    </>
  );
};
