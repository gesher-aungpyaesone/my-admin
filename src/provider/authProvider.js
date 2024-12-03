import { fetchUtils } from 'react-admin';

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  const headers = new Headers(); // Create a Headers object
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  return headers;
};

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
      if (json.staff) localStorage.setItem('staff', JSON.stringify(json.staff));
      return Promise.resolve();
    }
    return Promise.reject();
  },
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('is_root');
    localStorage.removeItem('staff');
    localStorage.removeItem('permissions');
    return Promise.resolve();
  },
  checkError: ({ status }) => {
    if (status === 401) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: async () => {
    const { json } = await httpClient(`${apiUrl}/staff-auth`, {
      headers: getAuthHeaders(),
    });
    if (json) {
      localStorage.setItem('is_root', json.is_root);
      if (json.permissions)
        localStorage.setItem('permissions', JSON.stringify(json.permissions));
      if (json.staff) localStorage.setItem('staff', JSON.stringify(json.staff));
      return Promise.resolve();
    }
    return Promise.reject();
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
    return permissions.some((perm) => {
      if (perm.permission.resource.name === resource) {
        if (
          perm.permission.type.name === 'read' &&
          (action === 'list' || action === 'show')
        ) {
          return true;
        }
        return perm.permission.type.name === action;
      }
      return false;
    });
  },

  getAllowIds: ({ resource, action }) => {
    const permissions = authProvider.getStaffPermissions();
    if (!permissions.length) return [];
    const permission = permissions.find(
      (perm) =>
        perm.permission.resource.name === resource &&
        perm.permission.type.name === action,
    );
    return permission.allow_ids ? permission.allow_ids : [];
  },

  async getIdentity() {
    const authCredentials = JSON.parse(localStorage.getItem('staff'));
    const { id, first_name, last_name } = authCredentials;
    return { id, fullName: `${first_name} ${last_name}` };
  },
};
