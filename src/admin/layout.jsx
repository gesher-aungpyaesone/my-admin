import PropTypes from 'prop-types';
import { Layout as RALayout, CheckForApplicationUpdate } from 'react-admin';

import { Box } from '@mui/material';
import { CustomMenu } from './menu';
import { CustomAppBar } from './appbar';

export const CustomLayout = ({ children }) => (
  <RALayout menu={CustomMenu} appBar={CustomAppBar}>
    <Box padding={'10px'}>{children}</Box>
    <CheckForApplicationUpdate />
  </RALayout>
);

// Add propTypes for validation
CustomLayout.propTypes = {
  children: PropTypes.node,
};
