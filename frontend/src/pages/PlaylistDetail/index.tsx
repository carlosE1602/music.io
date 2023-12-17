import { useEffect, useState } from 'react';
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
import { enqueueSnackbar } from 'notistack';
import { PlaylistService } from '@/services/PlaylistService';
import { aproximarTempo } from '@/utils/format';
import Store from '@/store';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';

const useStyles = makeStyles((theme: any) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  albumImage: {
    height: '260px',
    width: '260px',
    borderRadius: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #999',
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

export const PlaylistDetail = () => {
  const { id } = useParams();
  const classes = useStyles();
  const userId = Store.getUser()?.id;

  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState('songs');
  const [songs, setSongs] = useState<TCard[]>([]);

  const [inputValue, setInputValue] = useState<string>('');
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<'POPULAR' | 'RECENT'>('POPULAR');
  const [selectedSong, setSelectedSong] = useState<TCard | null>();
  const [playlistDetail, setPlaylistDetail] = useState<any>();

  const fetch = async () => {
    try {
      const data = await PlaylistService.getPlaylistDetail(id ?? '');
      console.log(data.musics);
      setSongs(
        data?.musics?.data?.map(
          (elem: any) =>
            ({
              id: elem.id,
              label: elem.artist,
              imgUrl: elem.image,
              title: elem.name,
            }) as TCard,
        ) ?? [],
      );

      const duration = data?.musics?.data?.reduce((acc: number, elem: any) => {
        console.log(acc, elem);
        return elem.duration + acc;
      }, 0);
      console.log(data);
      if (data)
        setPlaylistDetail({
          name: data.name,
          userName: data.dono,
          description: data.descricao,
          duration,
          albumImage: data.image,
          rating: 0,
          donoid: data.donoid,
        });
    } catch (err) {
      console.error(err);
    }
  };

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

  const handleShareClick = async (id: string) => {
    await navigator.clipboard.writeText(`localhost:5173/playlists/detail/${id}`);
    enqueueSnackbar('Link copiado para a area de transferência!');
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

  const handleRemoveSong = async (toDeleteId: string) => {
    try {
      await PlaylistService.removeSong(userId ?? '', id ?? '', toDeleteId);
      enqueueSnackbar('Música removida com sucesso');
      fetch();
    } catch (err) {
      enqueueSnackbar('Falha ao remover música');
    }
  };

  const handleClickSong = (id: string) => {
    console.log('eeueueu', id);
    setSelectedSong(songs.find((elem) => elem.id === id));
  };

  useEffect(() => {
    if (!id) return;

    fetch();
  }, [id]);

  console.log(playlistDetail?.description);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header showSearchBar={false} hideGenreFilter={true} />
      <SongModal isOpen={!!selectedSong} handleClose={() => setSelectedSong(null)} songId={selectedSong?.id ?? ''} />
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
            {playlistDetail?.albumImage ? (
              <img src={playlistDetail?.albumImage} alt="Album Cover" className={classes.albumImage} />
            ) : (
              <Box className={classes.albumImage}>
                <AudiotrackIcon fontSize="large" />
              </Box>
            )}
          </Grid>
          <Grid item className={classes.musicInfo}>
            <Typography variant="h1" gutterBottom>
              {playlistDetail?.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Criada por: {playlistDetail?.userName}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {songs?.length ?? 0} música(s), {aproximarTempo(playlistDetail?.duration)}
            </Typography>
            <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <Typography variant="body1" color="textSecondary">
                Avaliação:
              </Typography>
              <Rating
                name="half-rating-read"
                defaultValue={playlistDetail?.rating}
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
              {playlistDetail?.description}
            </Typography>
            {userId === playlistDetail?.donoid && (
              <>
                <Box sx={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                  <Button variant="outlined" onClick={() => location.assign('/')}>
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

                  <MenuItem
                    onClick={() => {
                      handleShareClick(id?.toString() ?? '');
                    }}
                    sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <ShareIcon />
                    Compartilhar
                  </MenuItem>
                </Menu>
              </>
            )}
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
                musicDetails={null}
              />
            </Grid>
          )}

          {activeTab === 'songs' && (
            <Grid container sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {songs?.length > 0 ? (
                songs.map((song) => (
                  <SongListItem
                    key={`song-${song.id}`}
                    onRemove={handleRemoveSong}
                    song={song}
                    onClick={handleClickSong}
                    isOwner={userId === playlistDetail?.donoid}
                  />
                ))
              ) : (
                <Typography
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
                  variant="h5"
                >
                  Adicione músicas à sua playlist
                </Typography>
              )}
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};
