import { Menu } from 'react-admin';
import { useTheme } from '@mui/material/styles';

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
      <Menu.ResourceItems />
    </Menu>
  );
};
