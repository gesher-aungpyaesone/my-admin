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

export const dataAPIProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    const response = await httpClient(url, {
      headers: getAuthHeaders(),
    });
    const { json } = response;
    return {
      data: json.data ?? [],
      total: json.total_count,
    };
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      headers: getAuthHeaders(),
    }).then(({ json }) => ({
      data: json.data,
    })),

  getMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url, {
      headers: getAuthHeaders(),
    });
    return { data: json.data };
  },

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
      headers: getAuthHeaders(),
    }).then(({ json }) => ({
      data: json.data,
    })),

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
      headers: getAuthHeaders(),
    }).then(({ json }) => ({
      data: json.data,
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }).then(({ json }) => ({
      data: json,
    })),
};
