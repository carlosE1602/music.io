import React from 'react';
import Typography from '@mui/material/Typography';
import ErrorIcon from '@mui/icons-material/Error';

const NotFoundPage = () => {
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '50px',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#000',
      }}
    >
      <ErrorIcon style={{ fontSize: '50px', color: '#ff0000' }} />
      <Typography variant="h4" gutterBottom>
        Página não encontrada
      </Typography>
      <Typography variant="body1">
        Desculpe, a página que você está procurando não existe. Por favor, verifique o URL e tente novamente.
      </Typography>
    </div>
  );
};

export default NotFoundPage;
