import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Modal,
  Rating,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export const CommentModal = ({
  open,
  onClose,
  commentText,
  handleReview,
}: {
  open: boolean;
  onClose: () => void;
  commentText: string;
  handleReview?: (rating: number | null, commentText: string) => boolean;
}) => {
  const [rating, setRating] = useState<number | null>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRatingChange = (event: any, newValue: number | null) => {
    if (newValue == null) setRating(null);
    setRating(+event.target.value);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    if (handleReview) {
      const isOk = handleReview(rating, commentText);
      if (isOk) onClose();
      setIsLoading(false);
    }
  };

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
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
        <Box sx={{ display: 'flex', gap: '8px', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Avalie com até 5 estrelas!</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={handleRatingChange}
          sx={{
            '& .MuiRating-iconFilled': {
              color: '#ffF',
            },
            '& .MuiRating-iconHover': {
              color: '#999999',
            },
          }}
        />
        <Typography variant="body1" sx={{ overflowWrap: 'break-word' }}>
          {commentText}
        </Typography>
        <Box sx={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
          <Button onClick={onClose}>Fechar</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {isLoading ? <CircularProgress size="25px" /> : 'Comentar'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
