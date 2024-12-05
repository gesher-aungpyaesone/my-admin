import { DeleteButton, SaveButton, TextInput } from 'react-admin';
import { Box } from '@mui/material';

export const InformationTab = () => {
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
