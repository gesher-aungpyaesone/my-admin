import PropTypes from 'prop-types';
import { Layout as RALayout, CheckForApplicationUpdate } from 'react-admin';
import { CustomMenu } from './menu';
import { CustomAppBar } from './appbar';

export const CustomLayout = ({ children }) => (
  <RALayout menu={CustomMenu} appBar={CustomAppBar}>
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);

// Add propTypes for validation
CustomLayout.propTypes = {
  children: PropTypes.node,
};
