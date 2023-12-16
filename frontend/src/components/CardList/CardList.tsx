import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';

const useStyles = makeStyles((theme: any) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    justifyContent: 'center',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  card: {
    width: 225,
    margin: theme.spacing(1),
    cursor: 'pointer',
    border: '1px solid #FFFFFF10',
  },
  media: {
    height: 225,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(40,40,40)',
  },
}));

export type Actions = {
  label: string;
  icon: JSX.Element;
  onClick: (id: string) => void;
};

export type TCard = {
  title: string;
  label: string;
  imgUrl: string;
  id: string;
};

type TCardListProps = {
  emptyMessage?: string;
  isLoading: boolean;
  cards: TCard[];
  actions: Actions[];
  onCardClick: (card: TCard) => void;
  onLoadContent?: (page: number) => void;
  pageLimit?: number;
  currentPage?: number;
};

export const CardList = (props: TCardListProps) => {
  const { emptyMessage, isLoading, cards, actions, onCardClick, onLoadContent, pageLimit = 1, currentPage = 1 } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [clickedCard, setClickedCard] = useState<TCard>();

  const classes = useStyles();

  const handleMenuClick = (event: any, song: any) => {
    setAnchorEl(event.currentTarget);
    setClickedCard(song);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    if (onLoadContent) {
      onLoadContent(nextPage);
    }
  };

  const handleLoadPrevious = () => {
    const previousPage = currentPage - 1;
    if (onLoadContent) {
      onLoadContent(previousPage <= 0 ? 1 : previousPage);
    }
  };

  return (
    <div className={classes.root}>
      {!isLoading && cards.length === 0 && (
        <Typography variant="h4" className={classes.title}>
          {emptyMessage ?? 'Não há resultados para sua busca...'}
        </Typography>
      )}
      <Grid container spacing={2} justifyContent="center" maxWidth="1366px" margin="0 auto">
        {isLoading &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
            <Grid item key={`load-${id}`}>
              <Skeleton variant="rectangular" width={225} height={325} />
            </Grid>
          ))}
        {!isLoading && (
          <>
            {cards.map((card: TCard) => {
              return (
                <Grid item key={card.id}>
                  <Card className={classes.card} onClick={(e) => onCardClick(card)}>
                    {!card.imgUrl ? (
                      <Box className={classes.media}>
                        <AudiotrackIcon fontSize="large" />
                      </Box>
                    ) : (
                      <CardMedia className={classes.media} image={card.imgUrl} title={card.title} />
                    )}
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '130px' }}
                        >
                          {card.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '130px',
                          }}
                        >
                          {card.label}
                        </Typography>
                      </Box>
                      <IconButton
                        sx={{ padding: '0px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMenuClick(e, card);
                        }}
                      >
                        <MoreVertIcon htmlColor="#FFF" />
                      </IconButton>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              {actions.map((elem, id) => (
                <MenuItem
                  key={`action-${id}`}
                  onClick={() => {
                    handleMenuClose();
                    elem.onClick(clickedCard?.id ?? '');
                  }}
                >
                  {elem.icon}
                  {elem.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </Grid>
      {!isLoading && cards.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
          <Button variant="contained" color="primary" onClick={handleLoadPrevious} disabled={currentPage === 1}>
            Anterior
          </Button>
          <Typography variant="body1" color="textPrimary" sx={{ marginLeft: '16px', marginRight: '16px' }}>
            Página {currentPage} de {pageLimit}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleLoadMore} disabled={currentPage === pageLimit}>
            Próxima
          </Button>
        </Box>
      )}
    </div>
  );
};
