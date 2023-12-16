import { Actions, CardList, TCard } from '@/components/CardList/CardList';
import Header from '@/components/Header';
import { Box } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import DetailsIcon from '@mui/icons-material/Info';
import { useMemo } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useFetchPlaylists } from '@/hooks/useFetchPlaylists';

export const Playlists = () => {
  const { playlists, currentPage, isLoading, pageLimit, handleSearch, handleGetMore } = useFetchPlaylists();

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
    ],
    [],
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header searchFunction={handleSearch} hideGenreFilter={true} />
      <Box
        sx={{
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 64px)',
        }}
      >
        <CardList
          isLoading={isLoading}
          cards={playlists}
          actions={SongActions}
          currentPage={currentPage}
          pageLimit={pageLimit}
          onLoadContent={handleGetMore}
          onCardClick={(card: TCard) => {
            location.assign(`/playlists/detail/${card.id}`);
          }}
        />
      </Box>
    </Box>
  );
};
