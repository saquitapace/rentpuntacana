export const formatDateJoined = (dateString: string | null): string => {
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
      return '/listing-search';
    case 'property':
      return '/author';
    default:
      return '/';
  }
};

export const isTokenValid = (exp?: number): boolean => {
  if (!exp) return false;
  const currentTime = Math.floor(Date.now() / 1000); 
  return exp > currentTime;
};

export const generateUserId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

export const getLangPref = () => {
  if (typeof window !== "undefined") 
  {
    return localStorage.getItem("langPref") || 'en';
  }
}

export const getCurrPref = () => {
  if (typeof window !== "undefined") 
  {
    return localStorage.getItem("currPref") || 'USD';
  }
}

export const getCurrencies = () => {
  try {
    if (typeof window !== "undefined") 
    {
      return JSON.parse(localStorage.getItem("currencies") || "null");
    }
  } catch {
    console.error("Invalid JSON in localStorage");
    return null;
  }
}

export const getDefaultTranslations = () => {
  try {
    if (typeof window !== "undefined") 
    {
      return JSON.parse(localStorage.getItem("translations3") || "null");
    }
  } catch {
    console.error("Invalid JSON in localStorage");
    return null;
  }
};

export const getChatLayout = () => {
  try {
    if (typeof window !== "undefined") 
    {
      return JSON.parse(localStorage.getItem("react-resizable-panels:layout") || "null");
    }
  } catch {
    console.error("Invalid JSON in localStorage");
    return null;
  }
};