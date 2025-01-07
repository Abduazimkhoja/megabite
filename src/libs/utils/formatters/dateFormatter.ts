import { Locale } from '@/libs/types/locales.type';

type ConfigList = 'year' | 'day' | 'hour' | 'minute' | 'second';

export type FormatTimestampConfigs = Partial<Record<ConfigList, '2-digit' | 'numeric'>> & {
  month?: 'long' | 'short' | 'narrow' | '2-digit' | 'numeric';
  hour12?: boolean;
  locale?: Locale;
};

const initialDateConfigs: FormatTimestampConfigs = {
  year: 'numeric',
  day: '2-digit',
  month: 'long',
  hour: '2-digit',
  minute: '2-digit',
  // second: "2-digit",
  hour12: false, // 24-hour format
};

type FormatTimestamp = (timestamp: string | number, configs?: FormatTimestampConfigs) => string;

export const formatTimestamp: FormatTimestamp = (timestamp, { locale, ...configs } = {}) => {
  const date = new Date(isFinite(+timestamp) ? Number(timestamp) : timestamp);
  const { locale: initialLocale, ...initialConfigs } = initialDateConfigs;

  const dateConfigs = { ...initialConfigs, ...configs };
  const dateLocale = locale || initialLocale;

  const formattedDate = date.toLocaleDateString(dateLocale, dateConfigs);

  return formattedDate;
};

export const toTimestamp = (dateStr: string | null | undefined) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);

  const timestamp = date.getTime();

  return String(timestamp);
};
