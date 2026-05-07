export type Role = 'SUPER_ADMIN' | 'SCHOOL_OWNER' | 'SCHOOL_ADMIN' | 'BURSAR';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  schoolId?: string;
}

export interface Permission {
  action: string;
  subject: string;
}
