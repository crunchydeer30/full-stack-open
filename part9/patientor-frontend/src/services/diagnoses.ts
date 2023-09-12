import axios from 'axios';
import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/diagnoses`);
  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get(`${apiBaseUrl}/diagnoses/${id}`);
  return data;
};


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  getById
};
