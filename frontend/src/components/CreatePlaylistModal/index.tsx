import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { CircularProgress } from '@mui/material';

const CreatePlaylistModal = ({
  isOpen,
  onSubmit,
  onClose,
  isLoading,
}: {
  isOpen: boolean;
  isLoading: boolean;
  onSubmit: (name: string, description: string) => Promise<boolean>;
  onClose: () => void;
}) => {
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');

  const handleNameChange = (e: any) => {
    setPlaylistName(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setPlaylistDescription(e.target.value);
  };

  const handleCreatePlaylist = async () => {
    // Chama a função onSubmit passando os dados da playlist
    await onSubmit(playlistName, playlistDescription);

    // Fecha o dialog após a criação
    onClose();

    // Limpa os campos
    setPlaylistName('');
    setPlaylistDescription('');
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Criar Playlist</DialogTitle>
      <DialogContent>
        <TextField
          label="Nome da Playlist"
          value={playlistName}
          onChange={handleNameChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Descrição"
          value={playlistDescription}
          onChange={handleDescriptionChange}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions sx={{ padding: '20px' }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="contained"
          color="primary"
          disabled={isLoading || !playlistName || !playlistDescription}
          onClick={handleCreatePlaylist}
        >
          {isLoading ? <CircularProgress size="25px" /> : 'Criar Playlist'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePlaylistModal;
