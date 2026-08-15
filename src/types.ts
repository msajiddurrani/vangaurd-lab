export interface User {
  id: string;
  name: string;
  email: string;
  membershipTier?: 'free' | 'pro' | 'elite';
}
