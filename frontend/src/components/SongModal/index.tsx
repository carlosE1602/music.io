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
import { CommentsSection } from '../CommentsSection';

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

export type TComment = {
  text: string;
  date: string;
  user: {
    name: string;
    avatar: string;
  };
  likesCount: number;
  rating: number;
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
          // minWidth: '900px',
          maxWidth: '800px',
          // overflow: 'hidden',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <img src={musicDetails.albumImage} alt="Album Cover" className={classes.albumImage} />
          </Grid>
          <Grid item xs={12} md={9.5} className={classes.musicInfo}>
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

          <Grid item xs={12} md={0.5} className={classes.musicInfo}>
            <IconButton sx={{ padding: '0px' }} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            <CommentsSection
              // classes={classes}
              handleFilterMenuOpen={handleFilterMenuOpen}
              handleFilterMenuClose={handleFilterMenuClose}
              filterMenuAnchor={filterMenuAnchor}
              selectedFilter={selectedFilter}
              inputValue={inputValue}
              setInputValue={setInputValue}
              isLoadingComments={isLoadingComments}
              musicDetails={musicDetails}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
