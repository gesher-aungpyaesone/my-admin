import {
  ReferenceInput,
  useTranslate,
  Button,
  useGetRecordId,
  useRefresh,
  AutocompleteInput,
} from 'react-admin';
import { Box, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useFormContext } from 'react-hook-form';
import { staffAPIProvider } from '../../../provider/staffAPIProvider';

export const GroupAssignForm = () => {
  const translate = useTranslate();
  const recordId = useGetRecordId();
  const refresh = useRefresh();
  const { setValue, handleSubmit } = useFormContext();

  const onSubmit = async ({ group_id }) => {
    await staffAPIProvider.assignGroup({
      staff_id: recordId,
      group_id,
    });

    setValue('group_id', '');
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
        {translate('resources.staff.labels.assign_groups')}
      </Typography>
      <ReferenceInput source="group_id" reference="group">
        <AutocompleteInput
          label="resources.group.name"
          optionText={(choice) => `#${choice.id} ${choice.name}`}
        />
      </ReferenceInput>

      <Button
        sx={{ width: 'fit-content' }}
        startIcon={<SaveIcon />}
        label={translate('resources.staff.buttons.assign')}
        variant="contained"
        onClick={handleSubmit(onSubmit)}
      />
    </Box>
  );
};
