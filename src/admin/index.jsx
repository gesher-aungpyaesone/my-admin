import { Admin, nanoDarkTheme, nanoLightTheme, Resource } from 'react-admin';
import { dataAPIProvider } from '../provider/dataAPIProvider';
import { StaffList } from './staff/list';
import UserIcon from '@mui/icons-material/Group';
import PortraitIcon from '@mui/icons-material/Portrait';
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

const App = () => (
  <Admin
    dataProvider={dataAPIProvider}
    i18nProvider={i18nProvider}
    layout={CustomLayout}
    dashboard={Dashboard}
    theme={nanoLightTheme}
    darkTheme={nanoDarkTheme}
  >
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
