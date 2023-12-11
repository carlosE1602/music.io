import { Actions, CardList, TCard } from '@/components/CardList/CardList';
import Header from '@/components/Header';
import { Box } from '@mui/material';

import AddToPlaylistIcon from '@mui/icons-material/PlaylistAdd';
import DetailsIcon from '@mui/icons-material/Info';
import { useMemo } from 'react';

const songs: TCard[] = [
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
  const SongActions: Actions[] = useMemo(
    () => [
      {
        label: 'Adicionar à Playlist',
        icon: <AddToPlaylistIcon sx={{ marginRight: 1 }} />,
        onClick: (id) => console.log(id),
      },
      {
        label: 'Ver mais detalhes',
        icon: <DetailsIcon sx={{ marginRight: 1 }} />,
        onClick: (id) => console.log(id),
      },
    ],
    [],
  );
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header />

      <Box
        sx={{
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 64px)',
        }}
      >
        <CardList isLoading={false} title="Músicas recomendadas" cards={songs} actions={SongActions} />
      </Box>
    </Box>
  );
};
