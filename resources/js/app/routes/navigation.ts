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
  id: string;
  label: string;
  href: string;
  icon: any;
  roles: Role[];
  badge?: string;
}

export const navigationItems: NavItem[] = [
  // Super Admin
  { id: 'super-dash', label: 'Platform Dashboard', href: '/platform', icon: LayoutDashboard, roles: ['SUPER_ADMIN'] },
  { id: 'super-tenants', label: 'Tenants', href: '/platform/tenants', icon: Building2, roles: ['SUPER_ADMIN'] },
  { id: 'super-billing', label: 'Billing', href: '/platform/billing', icon: CreditCard, roles: ['SUPER_ADMIN'] },
  { id: 'super-logs', label: 'Platform Logs', href: '/platform/audit-logs', icon: History, roles: ['SUPER_ADMIN'] },

  // School Owner
  { id: 'owner-dash', label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['SCHOOL_OWNER'] },
  { id: 'owner-analytics', label: 'Analytics', href: '/dashboard/analytics', icon: FileText, roles: ['SCHOOL_OWNER'] },
  { id: 'owner-staff', label: 'Staff Management', href: '/staff', icon: Users, roles: ['SCHOOL_OWNER'] },
  { id: 'owner-settings', label: 'System Settings', href: '/settings', icon: Settings, roles: ['SCHOOL_OWNER'] },
  { id: 'owner-billing', label: 'Subscription & Billing', href: '/settings/billing', icon: CreditCard, roles: ['SCHOOL_OWNER'] },

  // School Admin
  { id: 'admin-dash', label: 'Dashboard', href: '/admin', icon: LayoutDashboard, roles: ['SCHOOL_ADMIN'] },
  { id: 'admin-students', label: 'Students', href: '/students', icon: GraduationCap, roles: ['SCHOOL_ADMIN'] },
  { id: 'admin-classes', label: 'Classes', href: '/classes', icon: Building2, roles: ['SCHOOL_ADMIN'] },
  { id: 'admin-fees', label: 'Fee Structures', href: '/fees', icon: FileText, roles: ['SCHOOL_ADMIN'] },
  { id: 'admin-reports', label: 'Reports', href: '/audit-logs', icon: BookOpen, roles: ['SCHOOL_ADMIN'] },

  // Bursar
  { id: 'bursar-dash', label: 'Dashboard', href: '/finance', icon: LayoutDashboard, roles: ['BURSAR'] },
  { id: 'bursar-payments', label: 'Payments', href: '/finance/payments', icon: Wallet, roles: ['BURSAR'] },
  { id: 'bursar-receipts', label: 'Receipts', href: '/finance/receipts', icon: FileText, roles: ['BURSAR'] },
  { id: 'bursar-credits', label: 'Credit Notes', href: '/finance/credit-notes', icon: FileText, roles: ['BURSAR'] },
  { id: 'bursar-ledger', label: 'Ledger', href: '/finance/ledger', icon: BookOpen, roles: ['BURSAR'] },
  { id: 'bursar-recon', label: 'Reconciliation', href: '/finance/reconciliation', icon: History, roles: ['BURSAR'] },
];
