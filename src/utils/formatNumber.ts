import { replace } from 'lodash';
import numeral from 'numeral';

type InputValue = string | number | null;

export function fNumber(number: InputValue) {
  return numeral(number).format();
}

export function fCurrency(
  number: string | number,
  isBrazilianCurrency: boolean = true,
  prefix: boolean = true
) {
  const displayPrefix = prefix ? 'R$ ' : '';
  return isBrazilianCurrency
    ? replace(
        parseFloat(String(number)).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        displayPrefix
      )
    : parseFloat(String(number)).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
}

export function fPercent(number: InputValue) {
  const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

  return result(format, '.0');
}

export function fShortenNumber(number: InputValue) {
  const format = number ? numeral(number).format('0.00a') : '';

  return result(format, '.00');
}

export function fData(number: InputValue) {
  const format = number ? numeral(number).format('0.0 b') : '';

  return result(format, '.0');
}

function result(format: string, key = '.00') {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, '') : format;
}
