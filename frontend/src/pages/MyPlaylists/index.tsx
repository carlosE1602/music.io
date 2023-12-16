import { Actions, CardList, TCard } from '@/components/CardList/CardList';
import Header from '@/components/Header';
import { Box, Button, Typography } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailsIcon from '@mui/icons-material/Info';
import { useMemo, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import Store from '@/store';
import { useFetchPlaylists } from '@/hooks/useFetchPlaylists';
import { PlaylistService } from '@/services/PlaylistService';
import CreatePlaylistModal from '@/components/CreatePlaylistModal';

export const MyPlaylists = () => {
  const userId = Store?.getUser()?.id;
  const { playlists, currentPage, isLoading, pageLimit, handleSearch, handleGetMore, reload } =
    useFetchPlaylists(userId);
  const [creationModal, setCreationModal] = useState<boolean>(false);

  const deletePlaylist = async (id: string) => {
    try {
      await PlaylistService.deletePlaylist(id);
      enqueueSnackbar('Playlist deletada com sucesso');
      reload();
      return true;
    } catch {
      enqueueSnackbar('Erro ao deletar');
      return false;
    }
  };

  const createPlaylist = async (name: string, description: string) => {
    try {
      await PlaylistService.createPlaylist(Store?.getUser()?.id ?? '', name, description);
      enqueueSnackbar('Playlist criada com sucesso');
      reload();
      return true;
    } catch {
      enqueueSnackbar('Erro ao criar playlist');
      return false;
    }
  };

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
        onClick: async (id: string) => {
          await deletePlaylist(id);
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

          scrollbarWidth: 'thin',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255, 255, 255, 0.5)', // Cor da thumb
            borderRadius: '4px', // Borda arredondada
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Cor de fundo da barra de rolagem
            borderRadius: '4px', // Borda arredondada
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '32px',
            justifyContent: 'space-between',
            padding: '32px',
            maxWidth: '1366px',
            margin: '0 auto',
          }}
        >
          <Typography variant="h2">Minhas Playlists</Typography>
          <Button variant="contained" color="primary" onClick={() => setCreationModal(true)}>
            + Criar playlist
          </Button>
        </Box>
        <CardList
          isLoading={isLoading}
          emptyMessage="Você ainda não criou playlists..."
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

      <CreatePlaylistModal
        isOpen={creationModal}
        onClose={() => setCreationModal(false)}
        onSubmit={createPlaylist}
        isLoading={isLoading}
      />
    </Box>
  );
};
