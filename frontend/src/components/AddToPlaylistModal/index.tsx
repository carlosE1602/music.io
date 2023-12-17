import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useFetchPlaylists } from '@/hooks/useFetchPlaylists';
import Store from '@/store';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import CloseIcon from '@mui/icons-material/Close';
import { TCard } from '../CardList/CardList';
import { PlaylistService } from '@/services/PlaylistService';

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  musicid: string;
};

export const AddToPlaylistModal = (props: TProps) => {
  const { isOpen, onClose, musicid } = props;
  const userId = Store?.getUser()?.id;
  const [inputValue, setInputValue] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState<TCard>();

  const { playlists, handleSearch } = useFetchPlaylists(userId);

  const handleClose = () => {
    setInputValue('');
    setSelectedPlaylist(undefined);
    handleSearch('');
    onClose();
  };

  const onClick = async () => {
    if (!userId || !musicid || !selectedPlaylist) return;
    try {
      await PlaylistService.addSong(userId ?? '', selectedPlaylist?.id ?? '', musicid);

      enqueueSnackbar('Música adicionada com sucesso');
    } catch (err) {
      enqueueSnackbar('Falha ao adicionar música');
    }
    handleClose();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!value) setSelectedPlaylist(undefined);
    setInputValue(value);
    handleSearch(value);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle sx={{ display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h3">Salvar na playlist</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'justify',
          maxWidth: '500px',
          minWidth: '500px',
        }}
      >
        <TextField label="Buscar playlist" fullWidth value={inputValue} onChange={handleInputChange} margin="normal" />

        {/* Updated playlist rendering based on user input */}
        {inputValue &&
          playlists.map((playlist) => (
            <Box
              key={`playlist-${playlist.id}`}
              border={selectedPlaylist?.id === playlist.id ? '1px solid #999999' : ''}
              borderColor="divider"
              maxHeight="60px"
              width="100%"
              sx={{
                padding: '10px',
                borderRadius: '4px',
                cursor: 'pointer',
                '&:hover': {
                  border: '1px solid #999999',
                },
              }}
              onClick={() => setSelectedPlaylist(playlist)}
            >
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  {playlist?.imgUrl ? (
                    <img
                      src={playlist.imgUrl} // Assuming there's an imageUrl property in the playlist object
                      alt="Album Cover"
                      style={{ height: '35px', width: '35px', borderRadius: '4px' }}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: 35,
                        width: 35,

                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgb(40,40,40)',
                      }}
                    >
                      <AudiotrackIcon fontSize="small" />
                    </Box>
                  )}
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="body1">{playlist.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {`${playlist.label} `}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        <Button variant="contained" color="primary" onClick={onClick} disabled={!selectedPlaylist}>
          Confirmar Escolha
        </Button>
      </DialogContent>
    </Dialog>
  );
};
