import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItemText from '@mui/material/ListItemText';
import { Collapse } from '@mui/material';
import { useState, useEffect } from 'react';
import { useAuthProvider, useTranslate } from 'react-admin';

export const SubMenu = ({ text, icon, access, children }) => {
  const translate = useTranslate();
  const authProvider = useAuthProvider();
  const [open, setOpen] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const checkAccess = async () => {
      const accessGranted = await Promise.all(
        access.map((resource) =>
          authProvider.canAccess({ resource, action: 'read' }),
        ),
      );
      setHasAccess(accessGranted.includes(true));
    };

    checkAccess();
  }, [access, authProvider]);
  if (!hasAccess) {
    return null;
  }

  return (
    <>
      <MenuItem onClick={handleClick}>
        <ListItemIcon sx={{ minWidth: '28px' }}>
          {open ? <ExpandLess /> : icon ? icon : <ExpandMoreIcon />}
        </ListItemIcon>
        <ListItemText primary={translate(text)} />
      </MenuItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  );
};

SubMenu.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.node,
  children: PropTypes.node,
  access: PropTypes.arrayOf(PropTypes.string).isRequired,
};
