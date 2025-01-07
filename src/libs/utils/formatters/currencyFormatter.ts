import { Currencies } from '@/libs/types/currency.type';
import { Locale } from '@/libs/types/locales.type';

export type FormatCurrencyConfigs = {
  locale?: Locale;
  maximumFractionDigits?: number;
} & (
  | {
      style?: 'currency';
      currency?: Currencies | (string & {});
      format?: 'code' | 'name' | 'symbol';
    }
  | {
      style?: 'decimal';
      currency?: never;
      format?: never;
    }
);

type FormatCurrency = (price: number, configs?: FormatCurrencyConfigs) => string;

const initialCurrencyConfig: FormatCurrencyConfigs = {
  style: 'currency',
  currency: 'USD',
  format: 'code',

  locale: 'ru-RU',
  maximumFractionDigits: 0,
};

export const formatCurrency: FormatCurrency = (value, { locale: newLocale, ...configs } = {}) => {
  const { locale: initialLocale, ...initialConfigs } = initialCurrencyConfig;
  const currencyFormat = { ...initialConfigs, ...configs };
  const currencyLocale = newLocale || initialLocale;

  const formatter = new Intl.NumberFormat(currencyLocale, currencyFormat);

  return formatter.format(value);
};

// import { Currencies } from '@/types/currency.type';
// import { Locale } from '@/types/locales.type';

// type Configs = {
//   currency?: Currencies | (string & {});
//   format?: 'code' | 'name' | 'symbol';
//   locale?: Locale;
// };

// type FormatCurrency = (price: number, configs?: Configs) => string;

// const initalCurrencyConfig: Configs & { style: 'currency' } = {
//   style: 'currency' as const,
//   currency: 'USD',
//   format: 'symbol',
//   locale: 'en-US',
// };

// export const formatCurrency: FormatCurrency = (value, { locale: newLocale, ...configs } = {}) => {
//   const { locale: initialLocale, ...initialConfigs } = initalCurrencyConfig;
//   const currencyFormat = { ...initialConfigs, ...configs };
//   const currencyLocale = newLocale || initialLocale;

//   const formatter = new Intl.NumberFormat(currencyLocale, currencyFormat);

//   return formatter.format(value);
// };

// EXAMPLE 📝
// const formattedCurrency = formatCurrency(20000, {
//   currency: 'USD',
//   format: 'code',
//   locale: 'en-US',
// });
// console.log(formattedCurrency) // $ 20 000
