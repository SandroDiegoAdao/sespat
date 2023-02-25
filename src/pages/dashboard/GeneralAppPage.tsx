import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
// @mui
import { Container, Grid, Button } from '@mui/material';
// auth
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useAuthContext } from '../../auth/useAuthContext';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import { AppWelcome } from '../../sections/@dashboard/general/app';
// assets
import { SeoIllustration } from '../../assets/illustrations';

// ----------------------------------------------------------------------

export default function GeneralAppPage() {
  const { user } = useAuthContext();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> App | SESPAT</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AppWelcome
              title={`Seja bem-vindo! \n ${user?.name}`}
              description="Acompanhe as requisições de compras e aprovações de pedidos."
              img={
                <SeoIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
              action={
                <Button variant="contained" component={Link} to={PATH_DASHBOARD.invoice.list}>
                  Ver Requisições
                </Button>
              }
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
