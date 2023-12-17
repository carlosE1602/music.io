import { TCard } from '@/components/CardList/CardList';
import { PlaylistService } from '@/services/PlaylistService';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';

export const useFetchPlaylists = (userId?: string | null) => {
  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylists] = useState<TCard[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(1);
  const [inputValue, setInputValue] = useState<string>('');

  const getPlaylists = useCallback(async (currentPage: number, key?: string) => {
    setIsLoading(true);
    try {
      const response = await PlaylistService.getPlaylists({ page: currentPage, contain: key, donoid: userId ?? '' });

      setPageLimit(response.NumPag);
      setPlaylists(
        response.data.map(
          (elem: any) =>
            ({
              id: elem.id,
              title: elem.name,
              imgUrl: elem.image || '',
              label: `Autor: ${elem.dono}`,
            }) as TCard,
        ),
      );
    } catch (err) {
      setPlaylists([]);
      enqueueSnackbar('Erro ao buscar playlists.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getPlaylists(1);
  }, []);

  const handleSearch = async (key: string) => {
    await getPlaylists(1, key);
    setCurrentPage(1);
    setInputValue(key);
  };

  const handleGetMore = async (nextPage: number) => {
    await getPlaylists(nextPage, inputValue);
    setCurrentPage(nextPage);
  };

  const reload = async () => {
    await getPlaylists(1, inputValue);
    setCurrentPage(1);
  };

  return {
    isLoading,
    playlists,
    currentPage,
    pageLimit,
    handleSearch,
    handleGetMore,
    reload,
    inputValue,
  };
};
