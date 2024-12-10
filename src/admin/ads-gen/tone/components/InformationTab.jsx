import {
  DeleteButton,
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
        resource: 'ads-tone',
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
      <TextInput source="name" />
      <TextInput source="description" />
      <Box display={'flex'} gap={'10px'}>
        <SaveButton />
        <DeleteButton variant="contained" />
      </Box>
    </>
  );
};
