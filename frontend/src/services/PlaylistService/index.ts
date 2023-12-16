import { HttpService } from '../config';
type TPagPlaylist = { NumPag: number; NumElements: number; data: any };

const getPlaylists = async (donoid: string) => {};
const getPlaylistDetail = async (playlistid: string) => {};

const createPlaylist = async (donoid: string, name: string, image?: string, descricao?: string) => {};

export const PlaylistService = {
  getPlaylists,
  getPlaylistDetail,
};
