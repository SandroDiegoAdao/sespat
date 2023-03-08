import { format, getTime, formatDistanceToNow } from 'date-fns';
import { getCurrentLocale } from './getCurrentLocale';

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy';

  return date
    ? format(new Date(date), fm, {
        locale: getCurrentLocale(),
      })
    : '';
}

export function fTime(date: Date | string | number) {
  return format(new Date(date), 'p');
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: getCurrentLocale(),
      })
    : '';
}
