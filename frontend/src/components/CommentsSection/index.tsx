import { Avatar, Box, Grid, IconButton, Menu, MenuItem, Skeleton, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import FilterListIcon from '@mui/icons-material/FilterList';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddToPlaylistIcon from '@mui/icons-material/PlaylistAdd';

import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { TComment } from '../SongModal';

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

export const CommentsSection = (props: any) => {
  const {
    handleFilterMenuOpen,
    handleFilterMenuClose,
    filterMenuAnchor,
    selectedFilter,
    inputValue,
    setInputValue,
    isLoadingComments,
    musicDetails,
  } = props;

  const classes = useStyles();
  return (
    <Grid item xs={12} overflow="auto" width="100%">
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

        <div>
          {!isLoadingComments
            ? musicDetails.comments.map((comment: TComment, index: number) => (
                <div key={index} className={classes.comment}>
                  <Avatar src={comment?.user?.avatar} alt={comment?.user?.name} className={classes.commentAvatar} />
                  <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                    <div>
                      <Typography variant="body2" color="textSecondary">
                        {comment?.user?.name} • {comment?.date}
                      </Typography>
                      <Typography variant="body1">{comment?.text}</Typography>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', justifyContent: 'center' }}>
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
  );
};
