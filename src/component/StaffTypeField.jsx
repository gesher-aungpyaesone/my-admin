import PropTypes from 'prop-types';
import { useRecordContext } from 'react-admin';

import { Chip } from '@mui/material';

export const StaffTypeField = ({ source }) => {
  const record = useRecordContext();
  if (!record) return null;
  return <Chip label={record[source] ? 'root' : 'normal'} size="small" />;
};

StaffTypeField.propTypes = {
  source: PropTypes.string.isRequired,
};
