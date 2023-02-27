import { Helmet } from 'react-helmet-async';
// import { paramCase } from 'change-case';
// import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { User } from 'src/@types/user';
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import UserNewEditForm from '../../sections/@dashboard/user/UserNewEditForm';

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();

  // const { name } = useParams();

  // const currentUser = _userList.find((user) => paramCase(user.name) === name);

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
            // { name: currentUser?.name },
            { name: 'Fulano' },
          ]}
        />

        {/* <UserNewEditForm isEdit currentUser={currentUser} /> */}
        <UserNewEditForm isEdit currentUser={{} as User} />
      </Container>
    </>
  );
}
