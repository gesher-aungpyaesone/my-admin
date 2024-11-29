import { Admin, nanoDarkTheme, nanoLightTheme, Resource } from 'react-admin';
import { dataAPIProvider } from '../provider/dataAPIProvider';
import { StaffList } from './staff/list';
import FaceIcon from '@mui/icons-material/Face';
import PortraitIcon from '@mui/icons-material/Portrait';
import VerifiedIcon from '@mui/icons-material/Verified';
import GroupIcon from '@mui/icons-material/Group';
import { i18nProvider } from '../provider/i18nProvider';
import { CustomLayout } from './layout';
import { Dashboard } from './dashboard';
import { StaffEdit } from './staff/edit';
import { StaffPositionList } from './staff-position/list';
import { StaffCreate } from './staff/create';
import { StaffPositionCreate } from './staff-position/create';
import { StaffPositionEdit } from './staff-position/edit';
import LoginPage from './auth/login';
import { authProvider } from '../provider/authProvider';
import { PermissionList } from './permission/list';
import { GroupList } from './group/list';
import { GroupEdit } from './group/edit';
import { GroupCreate } from './group/create';

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
      name="staff"
      list={StaffList}
      // show={StaffShow}
      edit={StaffEdit}
      create={StaffCreate}
      icon={FaceIcon}
    />
    <Resource
      name="group"
      list={GroupList}
      // show={GroupShow}
      edit={GroupEdit}
      create={GroupCreate}
      icon={GroupIcon}
    />

    <Resource
      name="staff-position"
      list={StaffPositionList}
      edit={StaffPositionEdit}
      create={StaffPositionCreate}
      icon={PortraitIcon}
    />

    <Resource name="permission" list={PermissionList} icon={VerifiedIcon} />
  </Admin>
);

export default App;
