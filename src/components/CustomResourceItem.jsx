import PropTypes from 'prop-types';
import { MenuItemLink, useTranslate } from 'react-admin';

export const CustomResourceItem = ({ name, icon, ...props }) => {
  const translate = useTranslate();
  return (
    <MenuItemLink
      {...props}
      to={`/${name}`}
      primaryText={translate(`resources.${name}.name`)}
      sx={{ paddingRight: 1 }}
      leftIcon={icon}
    />
  );
};

CustomResourceItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.node,
};
