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

export const MemberAssignForm = () => {
  const translate = useTranslate();
  const recordId = useGetRecordId();
  const refresh = useRefresh();
  const { setValue, handleSubmit } = useFormContext();

  const onSubmit = async ({ staff_id }) => {
    await staffAPIProvider.assignGroup({
      group_id: recordId,
      staff_id,
    });

    setValue('staff_id', '');
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
        {translate('resources.staff.labels.assign_staffs')}
      </Typography>
      <ReferenceInput source="staff_id" reference="staff">
        <AutocompleteInput
          label="resources.staff.name"
          optionText={(choice) =>
            `#${choice.id} ${choice.first_name} ${choice.last_name} | ${choice.position.name} | ${choice.department.name}`
          }
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
