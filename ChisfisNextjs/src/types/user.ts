export interface User {
  id: string;
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  account_type: string;
  auth_type: string;
  avatar?: string;
  password?: string;
} 