import { Menu } from 'react-admin';
import { useTheme } from '@mui/material/styles';
import { SubMenu } from '@component/SubMenu';
import { CustomResourceItem } from '@component/CustomResourceItem';

import FaceIcon from '@mui/icons-material/Face';
import PortraitIcon from '@mui/icons-material/Portrait';
import VerifiedIcon from '@mui/icons-material/Verified';
import GroupIcon from '@mui/icons-material/Group';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import TranslateIcon from '@mui/icons-material/Translate';
import ShareIcon from '@mui/icons-material/Share';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import GrainIcon from '@mui/icons-material/Grain';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ModeStandbySharpIcon from '@mui/icons-material/ModeStandbySharp';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { useMediaQuery } from '@mui/system';

export const CustomMenu = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <Menu
      dense={true}
      sx={{
        ...(isSmall
          ? {}
          : {
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRight: `1px solid ${theme.palette.divider}`,
            }),
      }}
    >
      <Menu.DashboardItem />
      <SubMenu
        text="menu.employee_management"
        icon={<ManageAccountsIcon />}
        access={[
          'staff',
          'group',
          'permission',
          'staff-department',
          'staff-position',
        ]}
      >
        <CustomResourceItem name="staff" icon={<FaceIcon />} />
        <CustomResourceItem name="group" icon={<GroupIcon />} />
        <CustomResourceItem name="permission" icon={<VerifiedIcon />} />
        <CustomResourceItem name="staff-department" icon={<WorkspacesIcon />} />
        <CustomResourceItem name="staff-position" icon={<PortraitIcon />} />
      </SubMenu>

      <SubMenu
        text="menu.ads_gen_ai"
        icon={<TextFieldsIcon />}
        access={[
          'ads-client-company',
          'ads-language',
          'ads-platform',
          'ads-tone',
          'ads-target',
          'ads-industry',
          'ads-company-size',
          'ads-company-type',
        ]}
      >
        <CustomResourceItem
          name="ads-client-company"
          icon={<HandshakeIcon />}
        />
        <CustomResourceItem name="ads-language" icon={<TranslateIcon />} />
        <CustomResourceItem name="ads-platform" icon={<ShareIcon />} />
        <CustomResourceItem name="ads-tone" icon={<RecordVoiceOverIcon />} />
        <CustomResourceItem name="ads-target" icon={<ModeStandbySharpIcon />} />
        <CustomResourceItem name="ads-industry" icon={<WarehouseIcon />} />
        <CustomResourceItem name="ads-company-size" icon={<GrainIcon />} />
        <CustomResourceItem name="ads-company-type" icon={<AssessmentIcon />} />
      </SubMenu>
    </Menu>
  );
};
