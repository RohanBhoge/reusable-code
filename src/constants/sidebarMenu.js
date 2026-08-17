import {
  LayoutDashboard,
  UserPlus,
  Users,
  GraduationCap,
  Landmark,
  FileText,
  CalendarCheck,
  Briefcase,
  Wallet,
  BookOpen,
  UserCheck,
  CalendarDays,
  Bus,
  Building2,
  MessageSquare,
  Award,
  Medal,
  MonitorPlay,
  Target,
  BarChart3,
  Settings,
} from 'lucide-react';

/**
 * University Admin Portal Sidebar Menu Configuration
 * Separated into distinct groups separated by dividers as required.
 */
export const SIDEBAR_MENU_GROUPS = [
  {
    groupId: 'main',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard',
        icon: LayoutDashboard,
      },
      {
        id: 'admissions',
        label: 'Admissions',
        path: '/admissions',
        icon: UserPlus,
      },
      {
        id: 'students',
        label: 'Students',
        path: '/students',
        icon: Users,
      },
      {
        id: 'academics',
        label: 'Academics',
        path: '/academics',
        icon: GraduationCap,
      },
      {
        id: 'fees-finance',
        label: 'Fees & Finance',
        path: '/fees-finance',
        icon: Landmark,
      },
      {
        id: 'examinations',
        label: 'Examinations',
        path: '/examinations',
        icon: FileText,
      },
    ],
  },
  {
    groupId: 'operations',
    items: [
      {
        id: 'attendance',
        label: 'Attendance',
        path: '/attendance',
        icon: CalendarCheck,
      },
      {
        id: 'staff',
        label: 'Staff',
        path: '/staff',
        icon: Briefcase,
      },
      {
        id: 'payroll',
        label: 'Payroll',
        path: '/payroll',
        icon: Wallet,
      },
      {
        id: 'library',
        label: 'Library',
        path: '/library',
        icon: BookOpen,
      },
    ],
  },
  {
    groupId: 'services',
    items: [
      {
        id: 'parents',
        label: 'Parents',
        path: '/parents',
        icon: UserCheck,
      },
      {
        id: 'events',
        label: 'Events',
        path: '/events',
        icon: CalendarDays,
      },
      {
        id: 'transport',
        label: 'Transport',
        path: '/transport',
        icon: Bus,
      },
      {
        id: 'hostel',
        label: 'Hostel',
        path: '/hostel',
        icon: Building2,
      },
      {
        id: 'communication',
        label: 'Communication',
        path: '/communication',
        icon: MessageSquare,
      },
      {
        id: 'certificates',
        label: 'Certificates',
        path: '/certificates',
        icon: Award,
      },
      {
        id: 'scholarships',
        label: 'Scholarships',
        path: '/scholarships',
        icon: Medal,
      },
      {
        id: 'lms',
        label: 'LMS',
        path: '/lms',
        icon: MonitorPlay,
      },
      {
        id: 'placements',
        label: 'Placements',
        path: '/placements',
        icon: Target,
      },
    ],
  },
  {
    groupId: 'system',
    items: [
      {
        id: 'reports',
        label: 'Reports',
        path: '/reports',
        icon: BarChart3,
      },
      {
        id: 'settings',
        label: 'Settings',
        path: '/settings',
        icon: Settings,
      },
    ],
  },
];

// Flat menu list export for quick reference or search
export const FLAT_SIDEBAR_MENU = SIDEBAR_MENU_GROUPS.flatMap((group) => group.items);
