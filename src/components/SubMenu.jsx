import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItemText from '@mui/material/ListItemText';
import { Collapse } from '@mui/material';
import { useState } from 'react';
import { useTranslate } from 'react-admin';

export const SubMenu = ({ text, icon, children }) => {
  const translate = useTranslate();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

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
};
