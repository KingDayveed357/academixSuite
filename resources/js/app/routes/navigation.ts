import { Role } from '../types/roles';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  CreditCard, 
  GraduationCap, 
  Wallet, 
  History, 
  Building2,
  FileText,
  BookOpen
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: any;
  roles: Role[];
  badge?: string;
}

export const navigationItems: NavItem[] = [
  // Super Admin
  { label: 'Platform Dashboard', href: '/platform', icon: LayoutDashboard, roles: ['SUPER_ADMIN'] },
  { label: 'Tenants', href: '/platform/tenants', icon: Building2, roles: ['SUPER_ADMIN'] },
  { label: 'Billing', href: '/platform/billing', icon: CreditCard, roles: ['SUPER_ADMIN'] },
  { label: 'Platform Logs', href: '/platform/audit-logs', icon: History, roles: ['SUPER_ADMIN'] },

  // School Owner
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['SCHOOL_OWNER'] },
  { label: 'Analytics', href: '/dashboard/analytics', icon: FileText, roles: ['SCHOOL_OWNER'] },
  { label: 'Staff Management', href: '/staff', icon: Users, roles: ['SCHOOL_OWNER'] },
  { label: 'System Settings', href: '/settings', icon: Settings, roles: ['SCHOOL_OWNER'] },
  { label: 'Subscription & Billing', href: '/billing', icon: CreditCard, roles: ['SCHOOL_OWNER'] },

  // School Admin
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, roles: ['SCHOOL_ADMIN'] },
  { label: 'Students', href: '/students', icon: GraduationCap, roles: ['SCHOOL_ADMIN'] },
  { label: 'Classes', href: '/classes', icon: Building2, roles: ['SCHOOL_ADMIN'] },
  { label: 'Fee Structures', href: '/fees', icon: FileText, roles: ['SCHOOL_ADMIN'] },
  { label: 'Reports', href: '/audit-logs', icon: BookOpen, roles: ['SCHOOL_ADMIN'] },

  // Bursar
  { label: 'Dashboard', href: '/finance', icon: LayoutDashboard, roles: ['BURSAR'] },
  { label: 'Payments', href: '/finance/payments', icon: Wallet, roles: ['BURSAR'] },
  { label: 'Receipts', href: '/finance/receipts', icon: FileText, roles: ['BURSAR'] },
  { label: 'Credit Notes', href: '/finance/credit-notes', icon: FileText, roles: ['BURSAR'] },
  { label: 'Ledger', href: '/finance/ledger', icon: BookOpen, roles: ['BURSAR'] },
  { label: 'Reconciliation', href: '/finance/reconciliation', icon: History, roles: ['BURSAR'] },
];
