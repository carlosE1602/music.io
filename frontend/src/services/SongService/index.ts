import { HttpService } from '../config';

type TPagSong = { NumPag: number; NumElements: number; data: any };

export const getSongRecommendations = async (
  userId: string,
  page: number,
  genre?: string,
  contain?: string,
): Promise<TPagSong> => {
  const params: Record<string, any> = {
    limit: 10,
    page,
  };

  if (genre) {
    params.genre = genre;
  }

  if (contain) {
    params.contain = contain;
  }

  const { data } = await HttpService.get(`/recomendation/${userId}`, {
    params,
  });

  return data;
};

export const SongService = {
  getSongRecommendations,
};
