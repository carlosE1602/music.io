import { Avatar, Box, Grid, IconButton, Menu, MenuItem, Rating, Skeleton, TextField, Typography } from '@mui/material';
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
import { CommentModal } from './CommentModal';
import { useState } from 'react';

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
    flexDirection: 'column',
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
    handleReview,
  } = props;
  console.log(musicDetails);
  const classes = useStyles();
  const [isModalOpen, setModalOpen] = useState(false);
  const handleCommentSubmit = () => {
    // Open the modal
    if (inputValue) setModalOpen(true);
  };

  const handleCloseModal = () => {
    // Close the modal and clear the input
    setModalOpen(false);
    setInputValue('');
  };

  console.log(musicDetails);

  return (
    <Grid item xs={12} overflow="auto" width="100%">
      <div className={classes.commentsSection}>
        <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <Typography variant="h6">Comentários</Typography>
          {/* <Box
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
          </Menu> */}
        </Box>
        <div className={classes.inputComment}>
          <TextField
            label="Adicione seu comentario"
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 100 }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <IconButton className={classes.sendIcon} onClick={handleCommentSubmit}>
            <SendIcon />
          </IconButton>
        </div>

        <div>
          {!isLoadingComments && musicDetails?.data
            ? musicDetails?.data?.map((comment: TComment, index: number) => (
                <div key={index} className={classes.comment}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Avatar src={comment?.criador} alt={comment?.criador} className={classes.commentAvatar} />
                      <Typography variant="body2" color="textSecondary">
                        {comment?.criador}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="4px"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    width="100%"
                  >
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-start' }}>
                      <Rating
                        name="half-rating-read"
                        defaultValue={comment.rating}
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
                      <Typography variant="body2" color="textSecondary">
                        {new Date(comment?.t_date ?? 0).toLocaleDateString('pt-BR')}
                      </Typography>
                    </div>
                    <Typography variant="body1">{comment?.comment}</Typography>
                  </Box>
                </div>
              ))
            : [1, 2].map((elem) => (
                <div key={elem} className={classes.comment}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Skeleton variant="circular" width={50} height={50} />
                      <Skeleton variant="rectangular" width={50} height={17} />
                    </Box>
                  </Box>

                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="4px"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    width="100%"
                  >
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-start' }}>
                      <Skeleton variant="rectangular" width={50} height={17} />
                      <Skeleton variant="rectangular" width={50} height={17} />
                    </div>
                    <Skeleton variant="rectangular" width={150} height={17} />
                  </Box>
                </div>
              ))}
          {/* {!isLoadingComments && musicDetails?.NumElements > 0 && (
            <div className={classes.moreComments} onClick={() => handleGetComments && handleGetComments()}>
              <AddIcon />
              <Typography variant="body2">Carregar mais comentários</Typography>
            </div>
          )} */}

          {!isLoadingComments && musicDetails?.NumElements === 0 && (
            <div>
              <Typography variant="body1">Não há comentários até o momento...</Typography>
            </div>
          )}
        </div>
        <CommentModal
          open={isModalOpen}
          onClose={handleCloseModal}
          commentText={inputValue}
          handleReview={handleReview}
        />
      </div>
    </Grid>
  );
};
