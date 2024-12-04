import { fetchUtils } from 'react-admin';

const apiUrl = 'http://localhost:3000/api';
const httpClient = fetchUtils.fetchJson;

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  const headers = new Headers(); // Create a Headers object
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  return headers;
};

export const groupAPIProvider = {
  assignPermission: async ({
    group_id,
    permission_id,
    is_allowed_all,
    allow_ids,
  }) => {
    const url = `${apiUrl}/group-permission`;
    const response = await httpClient(url, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        group_id,
        permission_id,
        is_allowed_all,
        allow_ids,
      }),
    });
    const { json } = response;
    return {
      data: json.data,
    };
  },
};
