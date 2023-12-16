import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Avatar, Menu, MenuItem, Box, Chip } from '@mui/material';
import { Search as SearchIcon, AccountCircle as AccountCircleIcon, MusicNote, QueueMusic } from '@mui/icons-material';
import debounce from 'lodash/debounce';
import CreatePlaylistModal from '../CreatePlaylistModal';
import Store from '@/store';
import { GenreService } from '@/services/GenreService';
import { string } from 'yup';
import { PlaylistService } from '@/services/PlaylistService';
import { enqueueSnackbar } from 'notistack';

type THeaderProps = {
  showSearchBar?: boolean;
  searchFunction?: (key: string, genre?: string) => void;
  selectedGenreId?: string;
  hideGenreFilter?: boolean;
};

function Header(props: THeaderProps) {
  const { showSearchBar = true, searchFunction, selectedGenreId, hideGenreFilter = false } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const userData = Store.getUser();

  const [playlistMenuAnchorEl, setPlaylistMenuAnchorEl] = React.useState(null);
  const [creationModal, setCreationModal] = React.useState<boolean>(false);
  const handlePlaylistMenu = (event: any) => setPlaylistMenuAnchorEl(event.currentTarget);
  const closePlaylistMenu = () => setPlaylistMenuAnchorEl(null);

  const [genres, setGenres] = useState<{ id: string; name: string }[]>();

  useEffect(() => {
    const getGenres = async () => {
      try {
        const data = await GenreService.getGenres();
        setGenres(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (!hideGenreFilter) getGenres();
  }, [hideGenreFilter]);

  // Função para deslogar o usuário (substitua pelo seu próprio método)
  const handleLogout = () => {
    Store.logout();
    location.assign('/login');
    handleClose();
  };

  // Função de debounce para a pesquisa
  const debouncedSearch = debounce((value: string) => {
    if (searchFunction) searchFunction(value, selectedGenreId);
  }, 500);

  const handleSearchChange = (event: any) => {
    const newValue = event.target.value;

    debouncedSearch(newValue);
  };

  const handleGenreChange = (genre: string) => {
    if (searchFunction) searchFunction('', genre === selectedGenreId ? '' : genre);
  };

  return (
    <AppBar position="static" sx={{ display: 'flex' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', gap: '24px' }}>
          <Typography variant="CTA2" color="#FFF" sx={{ cursor: 'pointer' }} onClick={() => location.assign('/')}>
            Músicas
          </Typography>
          <Typography
            variant="CTA2"
            color="#FFF"
            sx={{ cursor: 'pointer' }}
            onClick={handlePlaylistMenu} // Abrir o menu de playlists ao clicar
          >
            Playlists
          </Typography>
          {/* Menu de playlists */}
          <Menu
            anchorEl={playlistMenuAnchorEl}
            open={Boolean(playlistMenuAnchorEl)}
            onClose={closePlaylistMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={() => location.assign('/my-playlists')}>Minhas Playlists</MenuItem>
            <MenuItem onClick={() => location.assign('/playlists')}>Buscar Playlists</MenuItem>
          </Menu>
        </Box>
        <div style={{ flexGrow: 1, padding: '0px 24px' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              marginLeft: 0,
              display: !showSearchBar ? 'none' : 'flex',
              gap: '8px',
              alignItems: 'center',
              width: '100%',
              maxWidth: '300px',
            }}
          >
            <IconButton size="large" style={{ position: 'absolute', left: 0, padding: '10px' }}>
              <SearchIcon />
            </IconButton>
            <InputBase
              placeholder="Pesquisar..."
              style={{ color: 'inherit', paddingLeft: '40px' }}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer' }} onClick={handleMenu}>
          <Avatar>{userData?.username?.charAt(0)}</Avatar>
          <Typography variant="CTA2">{userData?.username}</Typography>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl) && !!userData}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleLogout}>Sair</MenuItem>
        </Menu>
      </Toolbar>
      {!hideGenreFilter && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            padding: '8px 24px',
            width: '100%',
            overflowX: 'auto',
            boxSizing: 'border-box',
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
          {genres &&
            genres.map((genre) => {
              return (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  variant={selectedGenreId === genre.id ? 'filled' : 'outlined'}
                  onClick={() => handleGenreChange(genre.id)}
                  sx={{ marginRight: '8px' }}
                />
              );
            })}
        </Box>
      )}
    </AppBar>
  );
}

export default Header;
