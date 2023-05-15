
export const cacheClientEnabled = () => {
  return process.env.NEXT_PUBLIC_CACHE_CLIENT.toLowerCase() === 'yes' ||
    process.env.NEXT_PUBLIC_CACHE_CLIENT.toLowerCase() === 'true';
};
