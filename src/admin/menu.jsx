import { Menu } from 'react-admin';
import { useTheme } from '@mui/material/styles';
import { SubMenu } from '../components/SubMenu';

export const CustomMenu = () => {
  const theme = useTheme();

  return (
    <Menu
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRight: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Menu.DashboardItem />
      <SubMenu text="menu.employee_management">
        <Menu.ResourceItem name="staff" />
        <Menu.ResourceItem name="group" />
        <Menu.ResourceItem name="permission" />
        <Menu.ResourceItem name="staff-department" />
        <Menu.ResourceItem name="staff-position" />
      </SubMenu>
    </Menu>
  );
};
