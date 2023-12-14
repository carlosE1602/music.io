import { HttpService } from '../config';

const getGenres = async () => {
  const { data } = await HttpService.get(`/genres`);
  console.log(data);
  return data;
};

export const GenreService = {
  getGenres,
};
