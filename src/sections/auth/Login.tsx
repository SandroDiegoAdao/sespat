import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Stack, Typography, Link } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// layouts
import LoginLayout from '../../layouts/login';
//
import AuthLoginForm from './AuthLoginForm';

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Login</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">Novo usuário?</Typography>

          <Link component={RouterLink} to={PATH_AUTH.register} variant="subtitle2">
            Criar conta
          </Link>
        </Stack>
      </Stack>

      <AuthLoginForm />
    </LoginLayout>
  );
}
