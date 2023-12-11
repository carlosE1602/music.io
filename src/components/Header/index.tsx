// Importações necessárias
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Avatar, Menu, MenuItem, Box } from '@mui/material';
import { Search as SearchIcon, AccountCircle as AccountCircleIcon, MusicNote, QueueMusic } from '@mui/icons-material';
import debounce from 'lodash/debounce';

// Componente principal
function Header() {
  // Lógica para o menu do avatar
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Função para deslogar o usuário (substitua pelo seu próprio método)
  const handleLogout = () => {
    // Sua lógica de deslogar aqui
    handleClose();
  };

  // Função de debounce para a pesquisa
  const debouncedSearch = debounce((value: string) => {
    console.log(value); // Aqui você pode fazer o que quiser com o valor pesquisado
  }, 500);

  const handleSearchChange = (event: any) => {
    const newValue = event.target.value;
    debouncedSearch(newValue);
  };

  return (
    <AppBar position="static" sx={{ display: 'flex', gap: '24px' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', gap: '24px' }}>
          <Typography variant="CTA2" color="#FFF" sx={{ cursor: 'pointer' }} onClick={() => location.assign('/home')}>
            Músicas
          </Typography>
          <Typography
            variant="CTA2"
            color="#FFF"
            sx={{ cursor: 'pointer' }}
            onClick={() => location.assign('/playlists')}
          >
            Playlists
          </Typography>
        </Box>

        <div style={{ flexGrow: 1, padding: '0px 24px' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              marginLeft: 0,
              display: 'flex',
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

        <IconButton size="large" color="inherit" onClick={handleMenu}>
          <Avatar>U</Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleLogout}>Sair</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;