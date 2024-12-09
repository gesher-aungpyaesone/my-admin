import { Admin, nanoDarkTheme, nanoLightTheme, Resource } from 'react-admin';
import { dataAPIProvider } from '@provider/dataAPIProvider';
import { authProvider } from '@provider/authProvider';
import { i18nProvider } from '@provider/i18nProvider';

import FaceIcon from '@mui/icons-material/Face';
import PortraitIcon from '@mui/icons-material/Portrait';
import VerifiedIcon from '@mui/icons-material/Verified';
import GroupIcon from '@mui/icons-material/Group';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import TranslateIcon from '@mui/icons-material/Translate';

import { CustomLayout } from './layout';
import { Dashboard } from './dashboard';

import { StaffList } from './auth/staff/list';
import { StaffEdit } from './auth/staff/edit';
import { StaffPositionList } from './auth/staff-position/list';
import { StaffCreate } from './auth/staff/create';
import { StaffPositionCreate } from './auth/staff-position/create';
import { StaffPositionEdit } from './auth/staff-position/edit';
import LoginPage from './auth/staff-auth/login';
import { PermissionList } from './auth/permission/list';
import { GroupList } from './auth/group/list';
import { GroupEdit } from './auth/group/edit';
import { GroupCreate } from './auth/group/create';
import { StaffDepartmentList } from './auth/staff-department/list';
import { StaffDepartmentEdit } from './auth/staff-department/edit';
import { StaffDepartmentCreate } from './auth/staff-department/create';
import { LanguageList } from './ads-gen/language/list';
import { LanguageEdit } from './ads-gen/language/edit';
import { LanguageCreate } from './ads-gen/language/create';

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
      edit={StaffEdit}
      create={StaffCreate}
      icon={FaceIcon}
    />
    <Resource
      name="group"
      list={GroupList}
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
    <Resource
      name="staff-department"
      list={StaffDepartmentList}
      edit={StaffDepartmentEdit}
      create={StaffDepartmentCreate}
      icon={WorkspacesIcon}
    />
    <Resource name="permission" list={PermissionList} icon={VerifiedIcon} />

    <Resource
      name="ads-language"
      list={LanguageList}
      edit={LanguageEdit}
      create={LanguageCreate}
      icon={TranslateIcon}
    />
  </Admin>
);

export default App;
