import { useMediaQuery } from '@mui/material';
import {
  CreateButton,
  ExportButton,
  SelectColumnsButton,
  TopToolbar,
} from 'react-admin';

export const ListActions = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <TopToolbar>
      {!isSmall && <SelectColumnsButton />}
      <CreateButton />
      <ExportButton />
    </TopToolbar>
  );
};
