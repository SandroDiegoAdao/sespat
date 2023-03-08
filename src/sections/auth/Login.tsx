import { Stack, Typography } from '@mui/material';
// routes
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
          <Typography variant="body2">Utilize suas credenciais para acessar.</Typography>
        </Stack>
      </Stack>

      <AuthLoginForm />
    </LoginLayout>
  );
}
