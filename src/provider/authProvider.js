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
      return Promise.resolve();
    }
    return Promise.reject();
  },
  logout: () => {
    localStorage.removeItem('access_token');
    return Promise.resolve();
  },
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('access_token');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem('access_token')
      ? Promise.resolve()
      : Promise.reject();
  },
  getPermissions: () => Promise.resolve(),
};
