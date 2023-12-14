import { Actions, CardList, TCard } from '@/components/CardList/CardList';
import Header from '@/components/Header';
import { Box } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailsIcon from '@mui/icons-material/Info';
import { useMemo } from 'react';
import { enqueueSnackbar } from 'notistack';

const myPlaylists: TCard[] = [
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
];

export const Playlists = () => {
  const SongActions: Actions[] = useMemo(
    () => [
      {
        label: 'Compartilhar playlist',
        icon: <ShareIcon sx={{ marginRight: 1 }} />,
        onClick: async (id: string) => {
          await navigator.clipboard.writeText(`localhost:5173/playlists/detail/${id}`);
          enqueueSnackbar('Link copiado para a area de transferência!');
        },
      },
      {
        label: 'Ver mais detalhes',
        icon: <DetailsIcon sx={{ marginRight: 1 }} />,
        onClick: (id: string) => {
          location.assign(`/playlists/detail/${id}`);
        },
      },
      {
        label: 'Excluir playlist',
        icon: <DeleteIcon sx={{ marginRight: 1 }} />,
        onClick: (id: string) => {
          console.log('deletando playlist');
        },
      },
    ],
    [myPlaylists],
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
        <CardList
          isLoading={false}
          title="Minhas playlists"
          cards={myPlaylists}
          actions={SongActions}
          onCardClick={(card: TCard) => {
            location.assign(`/playlists/detail/${card.id}`);
          }}
        />
      </Box>

      {/* <CardList
        isLoading={false}
        title="Playlists encontradas"
        cards={[]}
        actions={[]}
        onCardClick={() => {
          console.log();
        }}
      /> */}
    </Box>
  );
};
