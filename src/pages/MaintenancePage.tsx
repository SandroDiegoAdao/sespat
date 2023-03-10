import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button, Typography, Stack } from '@mui/material';
// assets
import { MaintenanceIllustration } from '../assets/illustrations';

// ----------------------------------------------------------------------

export default function MaintenancePage() {
  return (
    <>
      <Helmet>
        <title> Manutenção | SESPAT</title>
      </Helmet>

      <Stack sx={{ alignItems: 'center' }}>
        <Typography variant="h3" paragraph>
          Página em manutenção
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Estamos trabalhando para melhorar a experiência do usuário.
        </Typography>

        <MaintenanceIllustration sx={{ my: 10, height: 240 }} />

        <Button component={RouterLink} to="/" size="large" variant="contained">
          Inicio
        </Button>
      </Stack>
    </>
  );
}
