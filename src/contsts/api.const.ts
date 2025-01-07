export const API_DOMEN = process?.env?.NEXT_PUBLIC_API_DOMEN;
export const API_URL = API_DOMEN ? `https://${API_DOMEN}/api/v1` : '';

export const getAPIUrl = () => {
  const domain = process.env.NEXT_PUBLIC_API_DOMEN || '';
  return domain ? `https://${domain}/api/v1` : '';
};
