export interface User {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  displayName: string;
  accountType: string;
  auth_type: string;
  avatar?: string;
  password?: string;
} 