import { Admin, nanoDarkTheme, nanoLightTheme, Resource } from 'react-admin';
import { dataAPIProvider } from '../provider/dataAPIProvider';
import { StaffList } from './staff/list';
import UserIcon from '@mui/icons-material/Group';
import PortraitIcon from '@mui/icons-material/Portrait';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { i18nProvider } from '../provider/i18nProvider';
import { CustomLayout } from './layout';
import { Dashboard } from './dashboard';
import { StaffShow } from './staff/show';
import { StaffEdit } from './staff/edit';
import { StaffPositionList } from './staff-position/list';
import { StaffPositionShow } from './staff-position/show';
import { StaffCreate } from './staff/create';
import { StaffPositionCreate } from './staff-position/create';
import { StaffPositionEdit } from './staff-position/edit';
import LoginPage from './auth/login';
import { authProvider } from '../provider/authProvider';
import { PermissionList } from './permission/list';

const App = () => (
  <Admin
    defaultTheme="light"
    loginPage={LoginPage}
    authProvider={authProvider}
    dataProvider={dataAPIProvider}
    i18nProvider={i18nProvider}
    layout={CustomLayout}
    dashboard={Dashboard}
    theme={nanoLightTheme}
    darkTheme={nanoDarkTheme}
  >
    <Resource
      name="permission"
      list={PermissionList}
      icon={WorkspacePremiumIcon}
    />

    <Resource
      name="staff-position"
      list={StaffPositionList}
      show={StaffPositionShow}
      edit={StaffPositionEdit}
      create={StaffPositionCreate}
      icon={PortraitIcon}
    />

    <Resource
      name="staff"
      list={StaffList}
      show={StaffShow}
      edit={StaffEdit}
      create={StaffCreate}
      icon={UserIcon}
    />
  </Admin>
);

export default App;
