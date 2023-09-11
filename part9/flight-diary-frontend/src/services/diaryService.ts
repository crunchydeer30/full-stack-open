import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3001/api/diaries';

const getAll = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
}

const addEntry = async (object: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(baseUrl, object);
  return response.data;
}

export default {
  getAll,
  addEntry
}