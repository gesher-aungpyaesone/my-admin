import { Admin, nanoDarkTheme, nanoLightTheme, Resource } from 'react-admin';
import { dataAPIProvider } from '@provider/dataAPIProvider';
import { authProvider } from '@provider/authProvider';
import { i18nProvider } from '@provider/i18nProvider';

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
import { PlatformList } from './ads-gen/platform/list';
import { PlatformEdit } from './ads-gen/platform/edit';
import { PlatformCreate } from './ads-gen/platform/create';
import { ToneList } from './ads-gen/tone/list';
import { ToneCreate } from './ads-gen/tone/create';
import { ToneEdit } from './ads-gen/tone/edit';
import { IndustryList } from './ads-gen/industry/list';
import { IndustryEdit } from './ads-gen/industry/edit';
import { IndustryCreate } from './ads-gen/industry/create';
import { CompanySizeList } from './ads-gen/company-size/list';
import { CompanySizeEdit } from './ads-gen/company-size/edit';
import { CompanySizeCreate } from './ads-gen/company-size/create';
import { CompanyTypeList } from './ads-gen/company-type/list';
import { CompanyTypeEdit } from './ads-gen/company-type/edit';
import { CompanyTypeCreate } from './ads-gen/company-type/create';
import { TargetList } from './ads-gen/target/list';
import { TargetEdit } from './ads-gen/target/edit';
import { TargetCreate } from './ads-gen/target/create';
import { BrowserRouter as Router } from 'react-router-dom';
import { ClientCompanyList } from './ads-gen/client-company/list';
import { ClientCompanyEdit } from './ads-gen/client-company/edit';
import { ClientCompanyCreate } from './ads-gen/client-company/create';

const App = () => (
  <Router>
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
      {/* employee management */}
      <Resource
        name="staff"
        list={StaffList}
        edit={StaffEdit}
        create={StaffCreate}
      />
      <Resource
        name="group"
        list={GroupList}
        edit={GroupEdit}
        create={GroupCreate}
      />
      <Resource
        name="staff-position"
        list={StaffPositionList}
        edit={StaffPositionEdit}
        create={StaffPositionCreate}
      />
      <Resource
        name="staff-department"
        list={StaffDepartmentList}
        edit={StaffDepartmentEdit}
        create={StaffDepartmentCreate}
      />
      <Resource name="permission" list={PermissionList} />

      {/* ads gen */}
      <Resource
        name="ads-client-company"
        list={ClientCompanyList}
        edit={ClientCompanyEdit}
        create={ClientCompanyCreate}
      />

      <Resource
        name="ads-language"
        list={LanguageList}
        edit={LanguageEdit}
        create={LanguageCreate}
      />

      <Resource
        name="ads-platform"
        list={PlatformList}
        edit={PlatformEdit}
        create={PlatformCreate}
      />

      <Resource
        name="ads-tone"
        list={ToneList}
        edit={ToneEdit}
        create={ToneCreate}
      />

      <Resource
        name="ads-target"
        list={TargetList}
        edit={TargetEdit}
        create={TargetCreate}
      />

      <Resource
        name="ads-industry"
        list={IndustryList}
        edit={IndustryEdit}
        create={IndustryCreate}
      />

      <Resource
        name="ads-company-size"
        list={CompanySizeList}
        edit={CompanySizeEdit}
        create={CompanySizeCreate}
      />

      <Resource
        name="ads-company-type"
        list={CompanyTypeList}
        edit={CompanyTypeEdit}
        create={CompanyTypeCreate}
      />
    </Admin>
  </Router>
);

export default App;
