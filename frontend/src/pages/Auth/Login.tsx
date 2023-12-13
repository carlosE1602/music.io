import React, { useState } from 'react';
import { Container, Paper, Typography, Button, Box, CircularProgress } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import logo from '@/assets/imgs/logo.png';
import { AuthService } from '@/services/AuthService';
import axios from 'axios';
import Store from '@/store';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex !important',
    paddingTop: '32px',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 'calc(100vh - 100px)',
    margin: '0px auto',
  },
  paper: {
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px',
    borderRadius: 8,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    marginBottom: '16px',
    width: '300px',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '300px',
  },
  button: {
    width: '300px',
    borderRadius: '500px !important',
  },
}));

const validationSchema = yup.object({
  username: yup.string().required('Usuário ou E-mail é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
});

export const Login = () => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async () => {
    const data = getValues();
    setIsLoading(true);
    try {
      const response = await AuthService.login(data.password, data.username);
      Store.saveUser({ username: response.nickname, email: response.email, id: response.id });
      location.assign('/');
      setErrorMessage(null);
    } catch (err) {
      if (axios.isAxiosError(err)) setErrorMessage(err?.response?.data?.error);
      else setErrorMessage('Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={logo} alt="Logo" width={350} height={100} />
      </Box>
      <Container className={classes.container}>
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Login
          </Typography>
          <Box className={classes.form}>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  className={classes.input}
                  label="Usuário ou E-mail"
                  variant="outlined"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  required
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  className={classes.input}
                  label="Senha"
                  type="password"
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  required
                />
              )}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading}
              className={classes.button}
              onClick={handleSubmit(onSubmit)}
            >
              {isLoading ? <CircularProgress size="25px" /> : 'Login'}
            </Button>

            {!!errorMessage && (
              <Typography variant="caption" color="red">
                * {errorMessage}
              </Typography>
            )}
            <Typography
              sx={{ cursor: 'pointer' }}
              onClick={() => location.assign(`/register`)}
              variant="caption"
              color="primary"
            >
              Não tem cadastro? Clique aqui.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
