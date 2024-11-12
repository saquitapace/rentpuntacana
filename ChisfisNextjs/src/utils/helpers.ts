export const getDateJoined = (dateString: string | null): string => {
  if (!dateString) return "";
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = date.toLocaleString('us-US', { month: 'long' });
  
  return `${month} ${year}`;
};
