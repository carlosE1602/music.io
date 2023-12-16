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

export const Songs = () => {
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);
  const [playListModalId, setPlaylistModalId] = useState<string>('');
  const [songs, setSongs] = useState<TCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageLimit, setPageLimit] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedGenreId, setSelectedGenreId] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  const userData = Store.getUser();

  const SongActions: Actions[] = useMemo(
    () => [
      {
        label: 'Adicionar à Playlist',
        icon: <AddToPlaylistIcon sx={{ marginRight: 1 }} />,
        onClick: (id) => {
          setPlaylistModalId(id);
          // setSelectedSongId(id)
        },
      },
      {
        label: 'Ver mais detalhes',
        icon: <DetailsIcon sx={{ marginRight: 1 }} />,
        onClick: (id) => {
          setSelectedSongId(id);
        },
      },
    ],
    [songs],
  );

  const getSongs = useCallback(
    async (currentPage: number, genreId?: string, key?: string) => {
      if (!userData) return [] as TCard[];
      setIsLoading(true);
      const response = await SongService.getSongRecommendations(
        userData.id,
        currentPage,
        genreId ?? selectedGenreId,
        key,
      );

      setPageLimit(response.NumPag);

      setIsLoading(false);
      return response?.data?.map((elem: any) => ({
        title: elem.name,
        id: elem.id,
        imgUrl: elem.image,
        label: elem.artist,
      }));
    },
    [userData, currentPage, selectedGenreId],
  );

  useEffect(() => {
    const fetch = async () => {
      const newData = await getSongs(1);
      setSongs(newData);
      setCurrentPage(1);
    };
    fetch();
  }, []);

  const handleSearch = async (key: string, genreId?: string) => {
    const newData = await getSongs(1, genreId, key ?? undefined);

    setSelectedGenreId(genreId ?? '');
    setInputValue(key ?? '');
    setSongs(newData);
    setCurrentPage(1);
  };

  const handleGetMore = async (nextPage: number) => {
    const newData = await getSongs(nextPage, selectedGenreId, inputValue);
    setCurrentPage(nextPage);
    setSongs(newData);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header searchFunction={handleSearch} selectedGenreId={selectedGenreId} />

      <AddToPlaylistModal
        musicid={playListModalId ?? ''}
        isOpen={!!playListModalId}
        onClose={() => setPlaylistModalId('')}
      />
      <SongModal isOpen={!!selectedSongId} handleClose={() => setSelectedSongId(null)} songId={selectedSongId} />
      <Box
        sx={{
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 120px)',
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
        <CardList
          isLoading={isLoading}
          onLoadContent={handleGetMore}
          cards={songs}
          actions={SongActions}
          onCardClick={(card: TCard) => setSelectedSongId(card.id)}
          pageLimit={pageLimit}
          currentPage={currentPage}
        />
      </Box>
    </Box>
  );
};
