import api from "../lib/axios";

export const fetchData = async (endpoint, setData, setLoading, params = {}) => {
  setLoading(true);
  const response = await api.get(endpoint, { params });
  const { data = [], meta = {} } = response.data;
  setData({ data, meta });
  setLoading(false);
};

export const addData = async (endpoint, data, setData, setLoading) => {
  await api.post(endpoint, data);
  fetchData(endpoint, setData, setLoading);
};

export const updateData = async (endpoint, data, setData, setLoading) => {
  await api.put(`${endpoint}/${data._id}`, data);
  fetchData(endpoint, setData, setLoading);
};

export const deleteData = async (endpoint, id, setData, setLoading) => {
  await api.delete(`${endpoint}/${id}`);
  fetchData(endpoint, setData, setLoading);
};
