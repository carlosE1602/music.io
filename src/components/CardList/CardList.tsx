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
  },
  media: {
    height: 225,
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
  title: string;
  isLoading: boolean;
  cards: TCard[];
  actions: Actions[];
};

export const CardList = (props: TCardListProps) => {
  const { title, isLoading, cards, actions } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [clickedCard, setClickedCard] = useState<TCard>();

  const classes = useStyles();

  const handleMenuClick = (event: any, song: any) => {
    setAnchorEl(event.currentTarget);
    setClickedCard(song);
    // You can use the 'song' object to perform actions related to the selected song
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        {!isLoading && cards.length === 0 ? 'Não há resultados para sua busca...' : title}
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {isLoading &&
          [1, 2, 3, 4, 5].map((id) => (
            <Grid item key={`load-${id}`}>
              <Skeleton variant="rectangular" width={225} height={325} />
            </Grid>
          ))}
        {!isLoading && (
          <>
            {cards.map((card: TCard) => {
              return (
                <Grid item key={card.id}>
                  <Card className={classes.card}>
                    <CardMedia className={classes.media} image={card.imgUrl} title={card.title} />
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <Typography variant="subtitle1">{card.title}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {card.label}
                        </Typography>
                      </Box>
                      <IconButton sx={{ padding: '0px' }} onClick={(e) => handleMenuClick(e, card)}>
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
                    console.log(clickedCard);
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
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          <Button variant="contained" color="primary" onClick={() => console.log('eueu')}>
            <Typography variant="Body1SemiBold" color="#FFF">
              Carregar Mais Músicas
            </Typography>
          </Button>
        </Box>
      )}
    </div>
  );
};
