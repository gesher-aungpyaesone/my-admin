import { fetchUtils } from 'react-admin';

const httpClient = fetchUtils.fetchJson;
const apiUrl = 'http://localhost:3000/api';
export const authProvider = {
  login: async ({ email, password, rememberMe }) => {
    const { json } = await httpClient(`${apiUrl}/staff-auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password, remember_me: rememberMe }),
    });
    if (json) {
      localStorage.setItem('access_token', json.access_token);
      localStorage.setItem('is_root', json.is_root);
      if (json.permissions)
        localStorage.setItem('permissions', JSON.stringify(json.permissions));
      return Promise.resolve();
    }
    return Promise.reject();
  },
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('is_root');
    localStorage.removeItem('permissions');
    return Promise.resolve();
  },
  checkError: ({ status }) => {
    if (status === 401) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem('access_token')
      ? Promise.resolve()
      : Promise.reject();
  },

  getStaffPermissions: () => {
    return localStorage.getItem('permissions')
      ? JSON.parse(localStorage.getItem('permissions'))
      : [];
  },

  isRoot: () => {
    return JSON.parse(localStorage.getItem('is_root'));
  },

  canAccess: ({ resource, action }) => {
    if (authProvider.isRoot()) return true;

    const permissions = authProvider.getStaffPermissions();
    if (!permissions.length) return false;
    return permissions.some(
      (perm) =>
        perm.permission.resource.name === resource &&
        perm.permission.type.name === action,
    );
  },
};
