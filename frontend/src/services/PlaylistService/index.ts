import { HttpService } from '../config';
type TPagPlaylist = { NumPag: number; NumElements: number; data: any };

type TFullPlaylist = {
  dono: string;
  donoid: string;
  id: string;
  image: string;
  musics: TPagPlaylist;
  name: string;
  descricao: string;
};

const getPlaylists = async ({
  page,
  contain,
  donoid,
}: {
  page: number;
  contain?: string;
  donoid?: string;
}): Promise<TPagPlaylist> => {
  const params: Record<string, any> = {
    limit: 10,
    page,
  };

  if (contain) {
    params.contain = contain;
  }

  if (donoid) {
    params.donoid = donoid;
  }

  const { data } = await HttpService.get<TPagPlaylist>('/playlist', {
    params,
  });

  return data;
};
const getPlaylistDetail = async (playlistid: string) => {
  const { data } = await HttpService.get<TFullPlaylist>('/playlist', {
    params: {
      playlistid,
      limit: 9999999,
    },
  });

  return data;
};

const createPlaylist = async (donoid: string, name: string, descricao: string, image?: string) => {
  const { data } = await HttpService.post('/playlist', {
    donoid,
    image,
    descricao,
    name,
  });

  return data;
};

const deletePlaylist = async (id: string) => {
  const { data } = await HttpService.delete('/playlist', {
    data: { id },
  });

  return data;
};

const removeSong = async (userid: string, playlistid: string, musicid: string) => {
  const { data } = await HttpService.delete('/playlist/remove-song', {
    data: { userid, playlistid, musicid },
  });
  return data;
};

const addSong = async (userid: string, playlistid: string, musicid: string) => {
  const { data } = await HttpService.post('/playlist/add-song', {
    userid,
    playlistid,
    musicid,
  });
  return data;
};

export const PlaylistService = {
  getPlaylists,
  getPlaylistDetail,
  createPlaylist,
  deletePlaylist,
  addSong,
  removeSong,
};
