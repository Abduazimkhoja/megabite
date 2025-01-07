import { Locale } from '@/libs/types/locales.type';
import { Unit } from '@/libs/types/units.type';

type Configs = {
  format?: 'short' | 'long' | 'narrow';
  locale?: Locale;
};

type FormatUnit = (value: number, unit: Unit, configs?: Configs) => string;

const initialUnitConfigs: Configs & { style: 'unit' } = {
  style: 'unit' as const,
  format: 'short',
  locale: 'ru-RU',
};

export const formatUnit: FormatUnit = (value, unit, { locale: newLocale, ...configs } = {}) => {
  const { locale: initialLocale, ...initialConfigs } = initialUnitConfigs;
  const unitConfigs = { ...initialConfigs, ...configs, unit };
  const unitLocale = newLocale || initialLocale;

  const formatter = new Intl.NumberFormat(unitLocale, unitConfigs);

  return formatter.format(value);
};

// EXAMPLE 📝
// const formattedUnit = formatUnit(20000, 'byte', {
//   format: 'long',
//   locale: 'en-US',
// });
// console.log(formattedUnit); // 20,000 byte
