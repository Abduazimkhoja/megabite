import { MEDIA_URL } from '@/consts/url.consts';

export const getFullMediaUrl = (url: string | undefined) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${MEDIA_URL}/${url}`;
};
