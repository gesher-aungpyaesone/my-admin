import {
  AutocompleteInput,
  DeleteButton,
  RadioButtonGroupInput,
  ReferenceInput,
  SaveButton,
  TextInput,
  useAuthProvider,
  useGetIdentity,
  useGetRecordId,
  useRecordContext,
} from 'react-admin';
import { Box, Grid } from '@mui/material';
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
        resource: 'ads-client-company',
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
      <TextInput source="website_url" />
      <Grid container spacing={10}>
        <Grid item xs={12} sm={6}>
          <ReferenceInput source="industry_id" reference="ads-industry">
            <AutocompleteInput />
          </ReferenceInput>
        </Grid>

        <Grid item xs={12} sm={6}>
          <ReferenceInput source="type_id" reference="ads-company-type">
            <RadioButtonGroupInput label="resources.ads-client-company.fields.type_id" />
          </ReferenceInput>
        </Grid>
      </Grid>
      <ReferenceInput source="size_id" reference="ads-company-size">
        <AutocompleteInput />
      </ReferenceInput>
      <TextInput source="strength" />
      <TextInput source="others" multiline rows={3} />
      <Box display={'flex'} gap={'10px'}>
        <SaveButton />
        <DeleteButton variant="contained" />
      </Box>
    </>
  );
};
