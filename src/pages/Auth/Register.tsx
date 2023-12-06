import React, { useState } from 'react';
import { Container, Paper, Typography, Button, Box, Stepper, Step, StepLabel } from '@mui/material';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';

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
    width: '100%',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '300px',
  },
  button: {
    width: '100%',
    borderRadius: '500px !important',
  },
  stepper: {
    width: '100%',
  },
}));

const steps = ['Acesso', 'Informações', 'Preferências'];

export const Register = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const validationSchema = yup.object({
    email:
      activeStep === 0
        ? yup
            .string()
            .required('E-mail é obrigatório')
            .email('E-mail inválido')
            .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Insira um email válido.')
        : yup.string(),
    password: activeStep === 0 ? yup.string().required('Senha é obrigatória') : yup.string(),
    nickname: activeStep === 1 ? yup.string().required('Nickname é obrigatório') : yup.string(),
    birthday:
      activeStep === 1
        ? yup
            .date()
            .required('Informe a Data de Aniversário')
            .typeError('Informe uma Data de Aniversário válida')
            .test('valid-year', 'Data informada inválida', (value) => {
              if (value) {
                const year = new Date(value).getFullYear();
                const currentYear = new Date().getFullYear();
                return year > 1900 && year <= currentYear;
              }
              return true;
            })
        : yup.date(),
    musicGenres: activeStep === 2 ? yup.array().min(1, 'Selecione pelo menos um gênero de música') : yup.array(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      birthday: new Date(),
    },
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const onSubmit = (data: {
    email?: string | undefined;
    password?: string | undefined;
    nickname?: string | undefined;
    birthday?: Date | undefined;
    musicGenres?: string[] | undefined;
  }) => {
    if (activeStep === steps.length - 1) {
      console.log('Dados do formulário:', data);
      // Adicione lógica de registro aqui
    } else {
      console.log('eueue');
      handleNext();
    }
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          Registro
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box className={classes.form}>
          {activeStep === 0 && (
            <>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    className={classes.input}
                    label="E-mail"
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email?.message}
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
            </>
          )}
          {activeStep === 1 && (
            <>
              <Controller
                name="nickname"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    className={classes.input}
                    label="Nickname"
                    variant="outlined"
                    error={!!errors.nickname}
                    helperText={errors.nickname?.message}
                    required
                  />
                )}
              />
              <Controller
                name="birthday"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className={classes.input}
                    label="Data de Aniversário"
                    type="date"
                    variant="outlined"
                    error={!!errors.birthday}
                    helperText={errors.birthday?.message}
                    required
                  />
                )}
              />
            </>
          )}
          {activeStep === 2 && (
            <>
              <Controller
                name="musicGenres"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    id="userRoles"
                    variant="outlined"
                    label="Selecione seu gênero favorito"
                    SelectProps={{
                      multiple: true,
                    }}
                  >
                    <MenuItem value="admin">Pop</MenuItem>
                    <MenuItem value="user1">Rock</MenuItem>
                    <MenuItem value="user2">Sertanejo</MenuItem>
                  </TextField>
                )}
              />
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
            onClick={handleSubmit(onSubmit)}
          >
            {activeStep === steps.length - 1 ? 'Registrar' : 'Próximo'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
