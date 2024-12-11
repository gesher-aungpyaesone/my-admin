import PropTypes from 'prop-types';
import { MenuItemLink, useTranslate } from 'react-admin';
import { useAuthProvider } from 'react-admin';
import { useEffect, useState } from 'react';

export const CustomResourceItem = ({ name, icon, ...props }) => {
  const translate = useTranslate();
  const authProvider = useAuthProvider();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const canAccessResource = await authProvider.canAccess({
        resource: name,
        action: 'read',
      });
      setHasAccess(canAccessResource);
    };

    checkAccess();
  }, [name, authProvider]);

  if (!hasAccess) {
    return null;
  }

  return (
    <MenuItemLink
      {...props}
      to={`/${name}`}
      primaryText={translate(`resources.${name}.name`)}
      sx={{ paddingRight: 20 }}
      leftIcon={icon}
    />
  );
};

CustomResourceItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.node,
};
