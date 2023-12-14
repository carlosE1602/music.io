import { Box, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { enqueueSnackbar } from 'notistack';

type TProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddToPlaylistModal = (props: TProps) => {
  const { isOpen, onClose } = props;

  const onClick = (id: string) => {
    enqueueSnackbar('Música adicionada com sucesso');
    onClose();
  };
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h3">Salvar na playlist</Typography>
        <IconButton onClick={onClose}>
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
        {[1, 2, 3].map((elem) => (
          <Box
            key={`playlist-${elem}`}
            borderBottom="1px solid #999999"
            borderColor="divider"
            maxHeight="60px"
            width="100%"
            sx={{ cursor: 'pointer' }}
            onClick={() => onClick(elem.toString())}
          >
            <Grid container alignItems="center">
              <Grid item xs={2}>
                <img
                  src="https://lh3.googleusercontent.com/tntNX15loRQ3Bqmw4MJunOy_lC43qU2Dqu3eBGWBSbQodGgzIDbnNDLtHCYpsKggh592RmaHnDdSacEe=w225-h225-l90-rj"
                  alt="Album Cover"
                  style={{ height: '35px', width: '35px', borderRadius: '4px' }}
                />
              </Grid>
              <Grid item xs={10}>
                <Typography variant="body1">Playlist Name</Typography>
                <Typography variant="body2" color="textSecondary">
                  2 itens
                </Typography>
              </Grid>
            </Grid>
          </Box>
        ))}
      </DialogContent>
    </Dialog>
  );
};
