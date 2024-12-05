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
        department: 'Department',
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
        assigned_group: 'Assigned groups',
      },
      messages: {
        root_access: 'This is root staff. Full access granted.',
      },
    },
    'staff-position': {
      name: 'Staff Position',
      list: 'Staff Position List',
      show: {
        tab: {
          detail: 'detail',
          history: 'history',
        },
      },
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
        create: 'Create Staff Position',
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
  'Invalid Credentials': 'Invalid credentials. Please try again.',
  'staff not found': 'The staff has not been registered or has been deleted.',
};

export default enfull;
