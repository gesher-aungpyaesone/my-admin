import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

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

export const staffAPIProvider = {
  // Fetch the list of staff
  getList: async (params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/staff?${stringify(query)}`;

    const response = await httpClient(url, {
      headers: getAuthHeaders(),
    });
    const { json } = response;
    return {
      data: json.data,
      total: json.total_count,
    };
  },

  // Fetch details of a single staff member
  getOne: (id) =>
    httpClient(`${apiUrl}/staff/${id}`, {
      headers: getAuthHeaders(),
    }).then(({ json }) => ({
      data: json.data,
    })),

  // Fetch the permissions of a staff member
  getStaffPermissions: async (staffId) => {
    const url = `${apiUrl}/staff-permission/by/${staffId}`;
    const response = await httpClient(url, {
      headers: getAuthHeaders(),
    });
    const { json } = response;
    return {
      data: json.data,
    };
  },

  // Fetch all available permissions
  getPermissions: async () => {
    const url = `${apiUrl}/permission`;
    const response = await httpClient(url, {
      headers: getAuthHeaders(),
    });
    const { json } = response;
    return {
      data: json.data,
    };
  },

  assignPermission: async ({
    staff_id,
    permission_id,
    is_allowed_all,
    allow_ids,
  }) => {
    const url = `${apiUrl}/staff-permission`;
    const response = await httpClient(url, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        staff_id,
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

  // Assign permissions to a staff member
  assignPermissions: async (staffId, permissions) => {
    const url = `${apiUrl}/staff-permission`;
    const response = await httpClient(url, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        staff_id: +staffId,
        permission_ids: permissions,
      }),
    });
    const { json } = response;
    return {
      data: json.data,
    };
  },

  assignGroup: async ({ staff_id, group_id }) => {
    const url = `${apiUrl}/staff-group`;
    const response = await httpClient(url, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        staff_id,
        group_id,
      }),
    });
    const { json } = response;
    return {
      data: json.data,
    };
  },

  // Fetch user details (for created_by_id in permissions)
  getUsersByIds: async (userIds) => {
    const query = {
      filter: JSON.stringify({ id: userIds }),
    };
    const url = `${apiUrl}/user?${stringify(query)}`;
    const response = await httpClient(url, {
      headers: getAuthHeaders(),
    });
    const { json } = response;
    return json.data;
  },
};
