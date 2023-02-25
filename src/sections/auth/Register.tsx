import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Stack, Typography, Link } from '@mui/material';
// layouts
import LoginLayout from '../../layouts/login';
// routes
import { PATH_AUTH } from '../../routes/paths';
//
import AuthRegisterForm from './AuthRegisterForm';

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <LoginLayout title="Com SESPAT você garante total controle aos seus pedidos.">
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Registro</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2"> Já tem uma conta?</Typography>

          <Link to={PATH_AUTH.login} component={RouterLink} variant="subtitle2">
            Login
          </Link>
        </Stack>
      </Stack>

      <AuthRegisterForm />

      <Typography
        component="div"
        sx={{ color: 'text.secondary', mt: 3, typography: 'caption', textAlign: 'center' }}
      >
        {'Ao se registrar, você concorda com os nossos '}
        <Link underline="always" color="text.primary">
          Termos de uso
        </Link>
        {' e '}
        <Link underline="always" color="text.primary">
          Política de privacidade
        </Link>
        .
      </Typography>
    </LoginLayout>
  );
}
