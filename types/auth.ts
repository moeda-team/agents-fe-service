export interface UserData {
  id: string;
  organizationId: string;
  email: string;
  fullName: string;
  username: string;
  role: string;
  company: string | null;
  jobTitle: string | null;
  plan: string;
  timezone: string;
  language: string;
  avatarUrl: string | null;
  bio: string | null;
  phone: string | null;
  socials: Record<string, string>;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface RegisterResult {
  user: UserData;
  tokens: AuthTokens;
}

export interface LoginResult {
  user: UserData;
  tokens: AuthTokens;
}

