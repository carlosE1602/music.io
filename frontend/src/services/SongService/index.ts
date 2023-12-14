import { HttpService } from '../config';

type TPagSong = { NumPag: number; NumElements: number; data: any };

export const getSongRecommendations = async (userId: string, page: number): Promise<TPagSong> => {
  const { data } = await HttpService.get(`/recomendation/${userId}`, {
    params: {
      limit: 10,
      page,
    },
  });

  return data;
};

export const SongService = {
  getSongRecommendations,
};
