import { HttpService } from '../config';

const getGenres = async () => {
  const { data } = await HttpService.get(`/genres`);
  return data;
};

export const GenreService = {
  getGenres,
};
