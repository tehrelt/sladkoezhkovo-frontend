import { LucideIcon, Users, ShieldCheck, Building } from 'lucide-react';

type MenuItem = {
  label: string;
  link: string;
  icon: LucideIcon;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Пользователи',
    link: 'users',
    icon: Users,
  },
  {
    label: 'Роли',
    link: 'roles',
    icon: ShieldCheck,
  },
  {
    label: 'Города',
    link: 'cities',
    icon: Building,
  },
];
