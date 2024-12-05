import {
  AutocompleteInput,
  DeleteButton,
  ReferenceInput,
  SaveButton,
  TextInput,
  useRecordContext,
} from 'react-admin';
import { Box } from '@mui/material';

export const InformationTab = () => {
  const record = useRecordContext();
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
