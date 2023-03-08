import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Tab, Tabs, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
// sections
import {
  AccountGeneral,
  AccountNotifications,
  AccountChangePassword,
} from '../../sections/@dashboard/user/account';

// ----------------------------------------------------------------------

export default function UserAccountPage() {
  const { themeStretch } = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('general');

  const TABS = [
    {
      value: 'general',
      label: 'Geral',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <AccountGeneral />,
    },
    {
      value: 'notifications',
      label: 'Notificações',
      icon: <Iconify icon="eva:bell-fill" />,
      component: <AccountNotifications />,
    },
    {
      value: 'change_password',
      label: 'Alterar senha',
      icon: <Iconify icon="ic:round-vpn-key" />,
      component: <AccountChangePassword />,
    },
  ];

  return (
    <>
      <Helmet>
        <title> Conta | SESPAT</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Conta"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Usuários', href: PATH_DASHBOARD.user.list },
            { name: 'Meus Dados' },
          ]}
        />

        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {TABS.map(
          (tab) =>
            tab.value === currentTab && (
              <Box key={tab.value} sx={{ mt: 5 }}>
                {tab.component}
              </Box>
            )
        )}
      </Container>
    </>
  );
}
