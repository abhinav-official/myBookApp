import axios from 'axios';
import { Book } from '~/types';

const API_URL = 'https://my-json-server.typicode.com/cutamar/mock/books';
const cache: { [key: string]: Book[] } = {};

export const fetchBooks = async (): Promise<Book[]> => {
  if (cache[API_URL]) {
    return cache[API_URL];
  }

  try {
    const response = await axios.get<Book[]>(API_URL);
    cache[API_URL] = response.data;
    return response.data;
  } catch (error) {
    console.error('Failed to fetch books:', error);
    throw error;
  }
};