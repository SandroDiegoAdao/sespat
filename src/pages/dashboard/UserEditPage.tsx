import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { getUserById } from 'src/hooks/user/useUser';
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import UserNewEditForm from '../../sections/@dashboard/user/UserNewEditForm';

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const { data: currentUser } = getUserById(id as string);

  return (
    <>
      <Helmet>
        <title> Editar Usuário | SESPAT</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Editar Usuário"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Usuários',
              href: PATH_DASHBOARD.user.list,
            },
            { name: currentUser?.nomeCompleto },
          ]}
        />
        <UserNewEditForm isEdit currentUser={currentUser} />
      </Container>
    </>
  );
}
