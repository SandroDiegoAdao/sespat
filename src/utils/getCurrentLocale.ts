import { ptBR } from 'date-fns/locale';

const getCurrentLocale = () => {
  switch (localStorage.getItem('i18nextLng')) {
    case 'en':
      return ptBR;
    case 'es':
      return ptBR;
    default:
      return ptBR;
  }
};

export { getCurrentLocale };
