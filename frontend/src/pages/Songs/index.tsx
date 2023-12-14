import { Actions, CardList, TCard } from '@/components/CardList/CardList';
import Header from '@/components/Header';
import { Box } from '@mui/material';

import AddToPlaylistIcon from '@mui/icons-material/PlaylistAdd';
import DetailsIcon from '@mui/icons-material/Info';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SongModal } from '@/components/SongModal';
import { AddToPlaylistModal } from '@/components/AddToPlaylistModal';
import Store from '@/store';
import { SongService } from '@/services/SongService';

const fixedSongs: TCard[] = [
  {
    id: '1',
    title: 'Song 1',
    label: 'Artist 1',
    imgUrl:
      'https://lh3.googleusercontent.com/tntNX15loRQ3Bqmw4MJunOy_lC43qU2Dqu3eBGWBSbQodGgzIDbnNDLtHCYpsKggh592RmaHnDdSacEe=w225-h225-l90-rj',
  },
  {
    id: '2',
    title: 'Song 2',
    label: 'Artist 2',
    imgUrl:
      'https://lh3.googleusercontent.com/tntNX15loRQ3Bqmw4MJunOy_lC43qU2Dqu3eBGWBSbQodGgzIDbnNDLtHCYpsKggh592RmaHnDdSacEe=w225-h225-l90-rj',
  },
  {
    id: '3',
    title: 'Song 3',
    label: 'Artist 3',
    imgUrl:
      'https://lh3.googleusercontent.com/tntNX15loRQ3Bqmw4MJunOy_lC43qU2Dqu3eBGWBSbQodGgzIDbnNDLtHCYpsKggh592RmaHnDdSacEe=w225-h225-l90-rj',
  },
  {
    id: '4',
    title: 'Song 4',
    label: 'Artist 4',
    imgUrl:
      'https://lh3.googleusercontent.com/tntNX15loRQ3Bqmw4MJunOy_lC43qU2Dqu3eBGWBSbQodGgzIDbnNDLtHCYpsKggh592RmaHnDdSacEe=w225-h225-l90-rj',
  },
  {
    id: '5',
    title: 'Song 5',
    label: 'Artist 5',
    imgUrl:
      'https://lh3.googleusercontent.com/tntNX15loRQ3Bqmw4MJunOy_lC43qU2Dqu3eBGWBSbQodGgzIDbnNDLtHCYpsKggh592RmaHnDdSacEe=w225-h225-l90-rj',
  },
  {
    id: '6',
    title: 'Song 6',
    label: 'Artist 6',
    imgUrl:
      'https://lh3.googleusercontent.com/tntNX15loRQ3Bqmw4MJunOy_lC43qU2Dqu3eBGWBSbQodGgzIDbnNDLtHCYpsKggh592RmaHnDdSacEe=w225-h225-l90-rj',
  },
  {
    id: '7',
    title: 'Song 7',
    label: 'Artist 7',
    imgUrl:
      'https://lh3.googleusercontent.com/tntNX15loRQ3Bqmw4MJunOy_lC43qU2Dqu3eBGWBSbQodGgzIDbnNDLtHCYpsKggh592RmaHnDdSacEe=w225-h225-l90-rj',
  },
];

export const Songs = () => {
  const [selectedSong, setSelectedSong] = useState<TCard | null>();
  const [playListModalId, setPlaylistModalId] = useState<string>('');
  const [songs, setSongs] = useState<TCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageLimit, setPageLimit] = useState<number>(1);

  const userData = Store.getUser();

  const SongActions: Actions[] = useMemo(
    () => [
      {
        label: 'Adicionar à Playlist',
        icon: <AddToPlaylistIcon sx={{ marginRight: 1 }} />,
        onClick: (id) => setPlaylistModalId(id),
      },
      {
        label: 'Ver mais detalhes',
        icon: <DetailsIcon sx={{ marginRight: 1 }} />,
        onClick: (id) => {
          const selectedSongById = songs.find((elem) => elem.id == id);
          setSelectedSong(selectedSongById);
        },
      },
    ],
    [songs],
  );

  const getSongs = useCallback(
    async (currentPage: number) => {
      if (!userData) return [] as TCard[];
      setIsLoading(true);
      const response = await SongService.getSongRecommendations(userData.id, currentPage);
      setIsLoading(false);
      setPageLimit(response.NumPag);
      return response?.data?.map((elem: any) => ({
        title: elem.name,
        id: elem.id,
        imgUrl: elem.image,
        label: elem.artist,
      }));
    },
    [userData],
  );

  useEffect(() => {
    const fetch = async () => {
      const newData = await getSongs(1);
      setSongs(newData);
    };
    fetch();
  }, []);

  const handleSearch = (key: string) => {
    // setIsLoading(true);
    // setTimeout(() => {
    //   if (!key) setSongs([]);
    //   else setSongs(fixedSongs);
    //   setIsLoading(false);
    // }, 1000);
  };

  const handleGetMore = async (nextPage: number) => {
    const newData = await getSongs(nextPage);
    setSongs(newData);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header searchFunction={handleSearch} />

      <AddToPlaylistModal isOpen={!!playListModalId} onClose={() => setPlaylistModalId('')} />
      <SongModal isOpen={!!selectedSong} handleClose={() => setSelectedSong(null)} isLoadingComments={false} />
      <Box
        sx={{
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 64px)',
        }}
      >
        <CardList
          isLoading={isLoading}
          onLoadContent={handleGetMore}
          title="Músicas recomendadas"
          cards={songs}
          actions={SongActions}
          onCardClick={(card: TCard) => setSelectedSong(card)}
          pageLimit={pageLimit}
        />
      </Box>
    </Box>
  );
};
