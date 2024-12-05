import { Menu } from 'react-admin';
import { useTheme } from '@mui/material/styles';
import { SubMenu } from '../components/SubMenu';
import FaceIcon from '@mui/icons-material/Face';
import PortraitIcon from '@mui/icons-material/Portrait';
import VerifiedIcon from '@mui/icons-material/Verified';
import GroupIcon from '@mui/icons-material/Group';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { CustomResourceItem } from '../components/CustomResourceItem';

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
      <SubMenu text="menu.employee_management" icon={<ManageAccountsIcon />}>
        <CustomResourceItem name="staff" icon={<FaceIcon />} />
        <CustomResourceItem name="group" icon={<GroupIcon />} />
        <CustomResourceItem name="permission" icon={<VerifiedIcon />} />
        <CustomResourceItem name="staff-department" icon={<WorkspacesIcon />} />
        <CustomResourceItem name="staff-position" icon={<PortraitIcon />} />
      </SubMenu>
    </Menu>
  );
};
