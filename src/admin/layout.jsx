import PropTypes from 'prop-types';
import { Layout as RALayout, CheckForApplicationUpdate } from 'react-admin';

import { Box } from '@mui/material';
import { CustomMenu } from './menu';
import { CustomAppBar } from './appbar';
import CustomBreadcrumbs from '@component/CustomBreadcrumbs';
export const CustomLayout = ({ children }) => {
  return (
    <RALayout menu={CustomMenu} appBar={CustomAppBar}>
      <Box padding={'20px 10px'}>
        <CustomBreadcrumbs />
        {children}
      </Box>
      <CheckForApplicationUpdate />
    </RALayout>
  );
};

// Add propTypes for validation
CustomLayout.propTypes = {
  children: PropTypes.node,
};
