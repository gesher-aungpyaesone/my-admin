// en.js
import en from 'ra-language-english';

const enfull = {
  ra: {
    ...en.ra,
  },
  resources: {
    permission: {
      name: 'Permission',
      list: 'Permission List',
      fields: {
        id: 'ID',
        name: 'Name',
        allow_ids: 'Access',
        resource: {
          name: 'Resource',
        },
        type: {
          name: 'Type',
        },
        created_at: 'Created At',
        created_by_id: 'Created By',
      },
    },
    staff: {
      name: 'Staff',
      list: 'Staff List',
      fields: {
        id: 'ID',
        first_name: 'First Name',
        last_name: 'Last Name',
        email: 'Email',
        is_root: 'Root',
        department_id: 'Department',
        position_id: 'Position',
        created_at: 'Created At',
        updated_at: 'Updated At',
        created_by_id: 'Created By',
        updated_by_id: 'Updated By',
      },
      tabs: {
        info: 'information',
        permission: 'permission',
        group: 'group',
        history: 'history',
      },
      buttons: {
        assign: 'assign',
      },
      labels: {
        all_allowed: 'Are all records allowed?',
        assign_permissions: 'Assign permissions',
        assigned_permission: 'Assigned permissions',
        assign_groups: 'Assign groups',
        assigned_groups: 'Assigned groups',
        assign_staffs: 'Assign staffs',
        assigned_staffs: 'Assigned staffs',
      },
      messages: {
        root_access: 'This is root staff. Full access granted.',
      },
    },
    'staff-position': {
      name: 'Position',
      list: 'Position List',
      tabs: {
        info: 'information',
        member: 'member',
        history: 'history',
      },
      fields: {
        id: 'ID',
        name: 'Name',
        description: 'Description',
        created_at: 'Created At',
        updated_at: 'Updated At',
        created_by_id: 'Created By',
        updated_by_id: 'Updated By',
      },
      titles: {
        create: 'Create Position',
      },
    },
    'staff-department': {
      name: 'Department',
      list: 'Department List',
      tabs: {
        info: 'information',
        member: 'member',
        history: 'history',
      },
      fields: {
        id: 'ID',
        name: 'Name',
        description: 'Description',
        created_at: 'Created At',
        updated_at: 'Updated At',
        created_by_id: 'Created By',
        updated_by_id: 'Updated By',
      },
      titles: {
        create: 'Create Department',
      },
    },
    group: {
      name: 'Group',
      list: 'Group List',
      fields: {
        id: 'ID',
        name: 'Name',
        description: 'Description',
        created_at: 'Created At',
        updated_at: 'Updated At',
        created_by_id: 'Created By',
        updated_by_id: 'Updated By',
      },
      tabs: {
        info: 'information',
        permission: 'permission',
        member: 'member',
        history: 'history',
      },
      buttons: {
        assign: 'assign',
      },
      labels: {
        all_allowed: 'Are all records allowed?',
        assign_permissions: 'Assign permissions',
        assigned_permission: 'Assigned permissions',
      },
    },
    'ads-language': {
      name: 'Language',
      list: 'Language List',
      fields: {
        id: 'ID',
        name: 'Name',
        description: 'Description',
        created_at: 'Created At',
        updated_at: 'Updated At',
        created_by_id: 'Created By',
        updated_by_id: 'Updated By',
      },
      tabs: {
        info: 'information',
        history: 'history',
      },
    },
    'ads-platform': {
      name: 'Platform',
      list: 'Platform List',
      fields: {
        id: 'ID',
        name: 'Name',
        description: 'Description',
        created_at: 'Created At',
        updated_at: 'Updated At',
        created_by_id: 'Created By',
        updated_by_id: 'Updated By',
      },
      tabs: {
        info: 'information',
        history: 'history',
      },
    },
    'ads-tone': {
      name: 'Tone',
      list: 'Tone List',
      fields: {
        id: 'ID',
        name: 'Name',
        description: 'Description',
        created_at: 'Created At',
        updated_at: 'Updated At',
        created_by_id: 'Created By',
        updated_by_id: 'Updated By',
      },
      tabs: {
        info: 'information',
        history: 'history',
      },
    },
    'ads-industry': {
      name: 'Industry',
      list: 'Industry List',
      fields: {
        id: 'ID',
        name: 'Name',
        description: 'Description',
        created_at: 'Created At',
        updated_at: 'Updated At',
        created_by_id: 'Created By',
        updated_by_id: 'Updated By',
      },
      tabs: {
        info: 'information',
        history: 'history',
      },
    },
  },
  pages: {
    auth: {
      login: {
        name: 'Login',
        fields: {
          email: 'Email',
          password: 'Password',
          remember_me: 'Remember me',
          login_btn_name: 'Login',
        },
      },
    },
  },
  menu: {
    employee_management: 'Employee Management',
    ads_gen_ai: 'Ads Generative AI',
  },
  'Invalid Credentials': 'Invalid credentials. Please try again.',
  'staff not found': 'The staff has not been registered or has been deleted.',
};

export default enfull;
