export const getDateJoined = (dateString: string | null): string => {
  if (!dateString) return "";
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = date.toLocaleString('us-US', { month: 'long' });
  
  return `${month} ${year}`;
};

export const redirect = (accountType: 'renter' | 'property' | 'default') => {
  switch (accountType) {
    case 'renter':
      return '/listing-stay';
    case 'property':
      return '/author';
    default:
      return '/';
  }
};