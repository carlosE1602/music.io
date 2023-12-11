import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Box, IconButton, Rating, Skeleton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FilterListIcon from '@mui/icons-material/FilterList';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddToPlaylistIcon from '@mui/icons-material/PlaylistAdd';

import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles((theme: any) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  albumImage: {
    height: '100px',
    width: '100px',
    borderRadius: theme.spacing(1),
  },
  musicInfo: {
    paddingLeft: theme.spacing(2),
  },
  commentsSection: {
    marginTop: theme.spacing(2),
  },
  comment: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginBottom: theme.spacing(1),
  },
  commentAvatar: {
    marginRight: theme.spacing(1),
  },
  inputComment: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),

    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  sendIcon: {
    marginLeft: theme.spacing(1),
  },
  moreComments: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
}));

type TComment = {
  text: string;
  date: string;
  user: {
    name: string;
    avatar: string;
  };
  likesCount: number;
};

type TSongModalProps = {
  isOpen: boolean;
  isLoadingComments: boolean;
  handleClose: () => void;
};

export const SongModal = (props: TSongModalProps) => {
  const { isOpen, handleClose, isLoadingComments } = props;
  const classes = useStyles();
  const [inputValue, setInputValue] = useState<string>('');
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<'POPULAR' | 'RECENT'>('POPULAR');

  // Exemplo de dados de música
  const musicDetails = {
    name: 'Song Name',
    album: 'Album Name',
    duration: '3:30',
    rating: 4.5,
    albumImage:
      'https://lh3.googleusercontent.com/tntNX15loRQ3Bqmw4MJunOy_lC43qU2Dqu3eBGWBSbQodGgzIDbnNDLtHCYpsKggh592RmaHnDdSacEe=w225-h225-l90-rj',
    comments: [
      {
        text: 'Great song!',
        date: '2023-12-11',
        user: {
          name: 'John Doe',
          avatar: 'avatar_url.jpg',
        },
        likesCount: 10,
      },
      {
        text: 'Love it!',
        date: '2023-12-12',
        user: {
          name: 'Jane Doe',
          avatar: 'avatar_url.jpg',
        },
        likesCount: 0,
      },
      {
        text: 'Great song!',
        date: '2023-12-11',
        user: {
          name: 'John Doe',
          avatar: 'avatar_url.jpg',
        },
        likesCount: 0,
      },
      {
        text: 'Love it!',
        date: '2023-12-12',
        user: {
          name: 'Jane Doe',
          avatar: 'avatar_url.jpg',
        },
        likesCount: 0,
      },
    ] as TComment[],
  };

  const handleFilterMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  const handleFilterMenuClose = (option: 'POPULAR' | 'RECENT') => {
    setFilterMenuAnchor(null);
    setSelectedFilter(option);
  };

  return (
    <Dialog maxWidth="md" open={isOpen} onClose={handleClose}>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'justify',
          minWidth: '900px',
          overflow: 'hidden',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <img src={musicDetails.albumImage} alt="Album Cover" className={classes.albumImage} />
          </Grid>
          <Grid item xs={12} md={9} className={classes.musicInfo}>
            <Typography variant="h5" gutterBottom>
              {musicDetails.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Álbum: {musicDetails.album}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Duração: {musicDetails.duration}
            </Typography>
            <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <Typography variant="body1" color="textSecondary">
                Avaliação:
              </Typography>
              <Rating
                name="half-rating-read"
                defaultValue={musicDetails.rating}
                precision={0.5}
                size="small"
                readOnly
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: '#ffF',
                  },
                  '& .MuiRating-iconHover': {
                    color: '#999999',
                  },
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center', cursor: 'pointer' }}>
              <AddToPlaylistIcon htmlColor="#999999" />
              <Typography variant="body1" color="textSecondary">
                Adicionar à playlist
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={1} className={classes.musicInfo}>
            <IconButton sx={{ padding: '0px' }} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>

          {/* Comentários (abaixo) */}
          <Grid item xs={12} overflow="auto">
            <div className={classes.commentsSection}>
              <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <Typography variant="h6">Comentários</Typography>
                <Box
                  sx={{ display: 'flex', gap: '4px', cursor: 'pointer', alignItems: 'center' }}
                  onClick={handleFilterMenuOpen}
                >
                  <FilterListIcon />
                  <Typography variant="Body1SemiBold">Ordenar por</Typography>
                </Box>
                <Menu
                  anchorEl={filterMenuAnchor}
                  open={Boolean(filterMenuAnchor)}
                  onClose={() => handleFilterMenuClose(selectedFilter)}
                >
                  <MenuItem onClick={() => handleFilterMenuClose('POPULAR')} sx={{ display: 'flex', gap: '4px' }}>
                    {selectedFilter === 'POPULAR' ? <CheckIcon fontSize="small" /> : <> </>} Mais Relevantes
                  </MenuItem>
                  <MenuItem onClick={() => handleFilterMenuClose('RECENT')} sx={{ display: 'flex', gap: '4px' }}>
                    {selectedFilter === 'RECENT' ? <CheckIcon fontSize="small" /> : <> </>} Mais Recentes
                  </MenuItem>
                </Menu>
              </Box>
              <div className={classes.inputComment}>
                <TextField
                  label="Adicione seu comentario"
                  variant="outlined"
                  fullWidth
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <IconButton
                  className={classes.sendIcon}
                  onClick={() => {
                    console.log(inputValue);
                    setInputValue('');
                  }}
                >
                  <SendIcon />
                </IconButton>
              </div>

              <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}>
                {!isLoadingComments
                  ? musicDetails.comments.map((comment, index) => (
                      <div key={index} className={classes.comment}>
                        <Avatar
                          src={comment?.user?.avatar}
                          alt={comment?.user?.name}
                          className={classes.commentAvatar}
                        />
                        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                          <div>
                            <Typography variant="body2" color="textSecondary">
                              {comment?.user?.name} • {comment?.date}
                            </Typography>
                            <Typography variant="body1">{comment?.text}</Typography>
                          </div>
                          <div
                            style={{ display: 'flex', flexDirection: 'column', gap: '2px', justifyContent: 'center' }}
                          >
                            <IconButton className={classes.sendIcon} onClick={() => console.log('like')}>
                              {!!comment.likesCount ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            </IconButton>
                            <Typography variant="body2">{comment.likesCount} Likes</Typography>
                          </div>
                        </Box>
                      </div>
                    ))
                  : [1, 2].map((elem) => (
                      <div key={elem} className={classes.comment}>
                        <Skeleton variant="circular" width={50} height={50} />
                        <Box display="flex" justifyContent="space-between" width="100%">
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <Skeleton variant="rectangular" width={50} height={17} />

                            <Skeleton variant="rectangular" width={150} height={17} />
                          </div>
                        </Box>
                      </div>
                    ))}
                {!isLoadingComments && musicDetails.comments.length > 0 && (
                  <div
                    className={classes.moreComments}
                    onClick={() => {
                      console.log('buscar mais comentarios');
                    }}
                  >
                    <AddIcon />
                    <Typography variant="body2">Carregar mais comentários</Typography>
                  </div>
                )}

                {!isLoadingComments && musicDetails.comments.length === 0 && (
                  <div>
                    <Typography variant="body1">Não há comentários até o momento...</Typography>
                  </div>
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
