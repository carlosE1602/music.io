import { useState } from 'react';
import { Box, Button, Grid, IconButton, Menu, MenuItem, Rating, Tab, Tabs, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';

import Header from '@/components/Header';
import { SongModal, TComment } from '@/components/SongModal';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import { TCard } from '@/components/CardList/CardList';
import SongListItem from './components/SongListItem';
import { CommentsSection } from '@/components/CommentsSection';

const useStyles = makeStyles((theme: any) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  albumImage: {
    height: '260px',
    width: '260px',
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
  moreOptionsButton: {
    marginLeft: 'auto',
  },
}));

const playlistDetail = {
  name: 'Playlist Name',
  description: 'Uma bela playlist para curtir com os amigos',
  duration: '10 horas',
  userName: 'Joao da Silva',
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

const songsTemplate: TCard[] = [
  {
    id: '1',
    title: 'Song 1',
    label: 'Artist 1',
    imgUrl:
      'https://lh3.googleusercontent.com/tntNX15loRQ3Bqmw4MJunOy_lC43qU2Dqu3eBGWBSbQodGgzIDbnNDLtHCYpsKggh592RmaHnDdSacEe=w225-h225-l90-rj',
  },
  {
    id: '2',
    title: 'Song 2',
    label: 'Artist 2',
    imgUrl:
      'https://lh3.googleusercontent.com/tntNX15loRQ3Bqmw4MJunOy_lC43qU2Dqu3eBGWBSbQodGgzIDbnNDLtHCYpsKggh592RmaHnDdSacEe=w225-h225-l90-rj',
  },
  {
    id: '3',
    title: 'Song 3',
    label: 'Artist 3',
    imgUrl:
      'https://lh3.googleusercontent.com/tntNX15loRQ3Bqmw4MJunOy_lC43qU2Dqu3eBGWBSbQodGgzIDbnNDLtHCYpsKggh592RmaHnDdSacEe=w225-h225-l90-rj',
  },
  {
    id: '4',
    title: 'Song 4',
    label: 'Artist 4',
    imgUrl:
      'https://lh3.googleusercontent.com/tntNX15loRQ3Bqmw4MJunOy_lC43qU2Dqu3eBGWBSbQodGgzIDbnNDLtHCYpsKggh592RmaHnDdSacEe=w225-h225-l90-rj',
  },
  {
    id: '5',
    title: 'Song 5',
    label: 'Artist 5',
    imgUrl:
      'https://lh3.googleusercontent.com/tntNX15loRQ3Bqmw4MJunOy_lC43qU2Dqu3eBGWBSbQodGgzIDbnNDLtHCYpsKggh592RmaHnDdSacEe=w225-h225-l90-rj',
  },
  {
    id: '6',
    title: 'Song 6',
    label: 'Artist 6',
    imgUrl:
      'https://lh3.googleusercontent.com/tntNX15loRQ3Bqmw4MJunOy_lC43qU2Dqu3eBGWBSbQodGgzIDbnNDLtHCYpsKggh592RmaHnDdSacEe=w225-h225-l90-rj',
  },
  {
    id: '7',
    title: 'Song 7',
    label: 'Artist 7',
    imgUrl:
      'https://lh3.googleusercontent.com/tntNX15loRQ3Bqmw4MJunOy_lC43qU2Dqu3eBGWBSbQodGgzIDbnNDLtHCYpsKggh592RmaHnDdSacEe=w225-h225-l90-rj',
  },
];

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

export const PlaylistDetail = () => {
  const { id } = useParams();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState('songs');
  const [songs, setSongs] = useState(songsTemplate);

  const [inputValue, setInputValue] = useState<string>('');
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<'POPULAR' | 'RECENT'>('POPULAR');
  const [selectedSong, setSelectedSong] = useState<TCard | null>();

  const handleFilterMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  const handleFilterMenuClose = (option: 'POPULAR' | 'RECENT') => {
    setFilterMenuAnchor(null);
    setSelectedFilter(option);
  };
  const handleTabChange = (event: any, newTab: string) => {
    setActiveTab(newTab);
  };

  const handleMoreOptionsClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleShareClick = () => {
    // Lógica para compartilhar a playlist
    handleMenuClose();
  };

  const handleEditClick = () => {
    // Lógica para editar a playlist
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    // Lógica para excluir a playlist
    handleMenuClose();
  };

  const handleRemoveSong = (id: string) => {
    setSongs((prev) => prev.filter((elem) => elem.id !== id));
  };

  const handleClickSong = (id: string) => {
    setSelectedSong(songs.find((elem) => elem.id === id));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header />
      <SongModal isOpen={!!selectedSong} handleClose={() => setSelectedSong(null)} isLoadingComments={false} />
      <Box sx={{ overflow: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
        <Grid
          container
          sx={{
            maxWidth: '1366px',
            margin: '0 auto',
            padding: '32px',
          }}
        >
          <Grid item>
            <img src={playlistDetail.albumImage} alt="Album Cover" className={classes.albumImage} />
          </Grid>
          <Grid item className={classes.musicInfo}>
            <Typography variant="h1" gutterBottom>
              {playlistDetail.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Criada por: {playlistDetail.userName}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Duração: {playlistDetail.duration}
            </Typography>
            <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <Typography variant="body1" color="textSecondary">
                Avaliação:
              </Typography>
              <Rating
                name="half-rating-read"
                defaultValue={playlistDetail.rating}
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
            <Typography variant="body1" color="textSecondary" mt="32px">
              {playlistDetail.description}
            </Typography>
            {/* Botões de compartilhar e editar */}
            <Box sx={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <Button variant="outlined" onClick={handleShareClick}>
                Adicionar Músicas
              </Button>
              <Button variant="outlined" onClick={handleEditClick}>
                Editar
              </Button>

              {/* Ícone de três pontinhos para mais opções */}
              <IconButton className={classes.moreOptionsButton} onClick={handleMoreOptionsClick}>
                <MoreVertIcon />
              </IconButton>
            </Box>
            {/* Menu de opções */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleDeleteClick} sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <DeleteIcon />
                Excluir
              </MenuItem>

              <MenuItem onClick={handleShareClick} sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShareIcon />
                Compartilhar
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>

        <Grid sx={{ width: '100%', maxWidth: '1366px', margin: '0 auto', padding: '0px 32px 32px 32px' }}>
          <Tabs value={activeTab} onChange={handleTabChange} sx={{ marginTop: '16px' }}>
            <Tab label="Músicas" value="songs" />
            <Tab label="Comentários" value="comments" />
          </Tabs>

          {activeTab === 'comments' && (
            <Grid container>
              <CommentsSection
                // classes={classes}
                handleFilterMenuOpen={handleFilterMenuOpen}
                handleFilterMenuClose={handleFilterMenuClose}
                filterMenuAnchor={filterMenuAnchor}
                selectedFilter={selectedFilter}
                inputValue={inputValue}
                setInputValue={setInputValue}
                // handleClose={handleClose}
                isLoadingComments={false}
                musicDetails={musicDetails}
              />
            </Grid>
          )}

          {activeTab === 'songs' && (
            <Grid container sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {songs.map((song) => (
                <SongListItem
                  key={`song-${song.id}`}
                  onRemove={handleRemoveSong}
                  song={song}
                  onClick={handleClickSong}
                />
              ))}
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};
