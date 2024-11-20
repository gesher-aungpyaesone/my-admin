import { Button, Box, Grid, Paper, Typography } from '@mui/material';
import {
  BooleanInput,
  Form,
  TextInput,
  useLogin,
  useNotify,
  required,
  useTranslate,
} from 'react-admin';

const LoginPage = () => {
  const login = useLogin();
  const notify = useNotify();
  const translate = useTranslate();
  const handleSubmit = ({ email, password, rememberMe }) => {
    login({ email, password, rememberMe }).catch((error) => {
      notify(error.body.errors.root.serverError, { type: 'error' });
    });
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '80vh' }}
    >
      <Grid>
        <Paper
          elevation={6}
          style={{
            padding: '2rem',
            width: '100%',
            minWidth: 350,
            maxWidth: 600,
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            {translate('pages.auth.login.name')}
          </Typography>
          <Form onSubmit={handleSubmit}>
            <Box>
              <TextInput
                name="email"
                label="pages.auth.login.fields.email"
                type="email"
                fullWidth
                validate={[required()]}
              />
            </Box>
            <Box>
              <TextInput
                name="password"
                label="pages.auth.login.fields.password"
                type="password"
                fullWidth
                validate={[required()]}
              />
            </Box>
            <Box>
              <BooleanInput
                name="rememberMe"
                label="pages.auth.login.fields.remember_me"
                source="rememberMe"
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ padding: '10px' }}
            >
              {translate('pages.auth.login.fields.login_btn_name')}
            </Button>
          </Form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
