// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/label';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [{ title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard }],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // USER
      {
        title: 'usuários',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
      },

      // INVOICE
      {
        title: 'pedidos',
        path: PATH_DASHBOARD.invoice.root,
        icon: ICONS.invoice,
        roles: ['solicitante'],
        info: <Label color="info">+20</Label>,
      },
      {
        title: 'pedidos',
        path: PATH_DASHBOARD.invoice.root,
        icon: ICONS.invoice,
        roles: ['admin', 'supervisor'],
        info: <Label color="info">+20</Label>,
        children: [
          {
            title: 'meus pedidos',
            path: PATH_DASHBOARD.invoice.list,
            roles: ['admin', 'supervisor'],
          },
          {
            title: 'pedidos de solicitantes',
            path: PATH_DASHBOARD.invoice.requestInvoice,
            roles: ['admin', 'supervisor'],
          },
        ],
      },

      // PRODUCT
      {
        title: 'produtos',
        path: PATH_DASHBOARD.product.root,
        icon: ICONS.ecommerce,
        roles: ['admin'],
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'app',
    items: [
      {
        title: 'calendário',
        path: PATH_DASHBOARD.calendar,
        icon: ICONS.calendar,
      },
    ],
  },

  // Others
  // {
  //   subheader: 'Other cases',
  //   items: [
  //     {
  //       // default roles : All roles can see this entry.
  //       // roles: ['user'] Only users can see this item.
  //       // roles: ['admin'] Only admin can see this item.
  //       // roles: ['admin', 'manager'] Only admin/manager can see this item.
  //       // Reference from 'src/guards/RoleBasedGuard'.
  //       title: 'item_by_roles',
  //       path: PATH_DASHBOARD.permissionDenied,
  //       icon: ICONS.lock,
  //       roles: ['admin'],
  //       caption: 'only_admin_can_see_this_item',
  //     },
  //   ],
  // },
];

export default navConfig;
