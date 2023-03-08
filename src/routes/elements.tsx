import { Suspense, lazy, ElementType } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
export const VerifyCodePage = Loadable(lazy(() => import('../pages/auth/VerifyCodePage')));
export const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPasswordPage')));
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));

// DASHBOARD: GENERAL
export const GeneralAppPage = Loadable(lazy(() => import('../pages/dashboard/GeneralAppPage')));

// DASHBOARD: INVOICE
export const InvoiceListPage = Loadable(lazy(() => import('../pages/dashboard/InvoiceListPage')));
export const InvoiceRequestPage = Loadable(
  lazy(() => import('../pages/dashboard/InvoiceRequestListPage'))
);
export const InvoiceDetailsPage = Loadable(
  lazy(() => import('../pages/dashboard/InvoiceDetailsPage'))
);
export const InvoiceCreatePage = Loadable(
  lazy(() => import('../pages/dashboard/InvoiceCreatePage'))
);
export const InvoiceEditPage = Loadable(lazy(() => import('../pages/dashboard/InvoiceEditPage')));

// DASHBOARD: USER
export const UserListPageView = Loadable(lazy(() => import('../pages/dashboard/UserListPageView')));
export const UserAccountPage = Loadable(lazy(() => import('../pages/dashboard/UserAccountPage')));
export const UserCreatePage = Loadable(lazy(() => import('../pages/dashboard/UserCreatePage')));
export const UserEditPage = Loadable(lazy(() => import('../pages/dashboard/UserEditPage')));

// DASHBOARD: PRODUCT
export const ProductListPageView = Loadable(
  lazy(() => import('../pages/dashboard/ProductListPageView'))
);

// DASHBOARD: APP
export const CalendarPage = Loadable(lazy(() => import('../pages/dashboard/CalendarPage')));

// TEST RENDER PAGE BY ROLE
export const PermissionDeniedPage = Loadable(
  lazy(() => import('../pages/dashboard/PermissionDeniedPage'))
);

// BLANK PAGE
export const BlankPage = Loadable(lazy(() => import('../pages/dashboard/BlankPage')));

// MAIN
export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
export const Page403 = Loadable(lazy(() => import('../pages/Page403')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const ComingSoonPage = Loadable(lazy(() => import('../pages/ComingSoonPage')));
export const MaintenancePage = Loadable(lazy(() => import('../pages/MaintenancePage')));
