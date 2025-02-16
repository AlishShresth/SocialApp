export interface User{
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  bio: string | null;
  avatar: string | null;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  created: string;
  updated: string;
}

export interface AuthData {
  refresh: string;
  access: string;
  user: User;
}

export interface AuthTokens {
  access: string;
  refresh?: string;
}