export type UserRole =
  | 'SUPER_ADMIN'
  | 'SCHOOL_OWNER'
  | 'SCHOOL_ADMIN'
  | 'BURSAR'

export interface AuthUser {
  id: number
  name: string
  email: string
  role: UserRole
  avatar?: string
  school?: {
    id: number
    name: string
    subdomain: string
  }
}

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
}
