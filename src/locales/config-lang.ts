// @mui
import { enUS, ptBR } from '@mui/material/locale';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'Português',
    value: 'pt',
    systemValue: ptBR,
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
];

export const defaultLang = allLangs[0]; // English
