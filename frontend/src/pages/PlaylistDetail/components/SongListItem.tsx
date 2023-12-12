import React from 'react';
import { Box, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { TCard } from '@/components/CardList/CardList';

const SongListItem = ({
  song,
  onRemove,
  onClick,
}: {
  song: TCard;
  onRemove: (id: string) => void;
  onClick: (id: string) => void;
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMoreOptionsClick = (event: any) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    onRemove(song.id);
    handleMenuClose();
  };

  return (
    <Box
      borderBottom="1px solid #999999"
      borderColor="divider"
      maxHeight="60px"
      width="100%"
      sx={{ cursor: 'pointer' }}
      onClick={() => onClick(song.id)}
    >
      <Grid container alignItems="center" spacing={2} sx={{ padding: '16px' }}>
        <Grid item xs={1}>
          <img src={song.imgUrl} alt="Album Cover" style={{ height: '35px', width: '35px', borderRadius: '4px' }} />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1">{song.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {song.label}
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={handleMoreOptionsClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleRemoveClick}>
              <DeleteIcon />
              Remover da Playlist
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SongListItem;
