import {
  LucideIcon,
  Users,
  ShieldCheck,
  Building,
  MapPin,
  MapPinned,
  Boxes,
  Ruler,
  Candy,
  Store,
  Factory,
  Truck,
  FileStack,
  Barcode,
  ScrollText,
} from 'lucide-react';

export type MenuItem = {
  label: string;
  link: string;
  icon: LucideIcon;
};

export const MODERATOR_ITEMS: MenuItem[] = [
  {
    label: 'Заявки на регистрацию',
    link: 'applications',
    icon: FileStack,
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Пользователи',
    link: 'users',
    icon: Users,
  },
  // {
  //   label: 'Роли',
  //   link: 'roles',
  //   icon: ShieldCheck,
  // },
];

export const MENU_GUIDE_ITEMS: MenuItem[] = [
  {
    label: 'Города',
    link: 'cities',
    icon: MapPin,
  },
  {
    label: 'Районы',
    link: 'districts',
    icon: MapPinned,
  },
  {
    label: 'Типы собственности',
    link: 'property-types',
    icon: Building,
  },
  {
    label: 'Ед. измерения',
    link: 'units',
    icon: Ruler,
  },
  {
    label: 'Тип фасовки',
    link: 'packages',
    icon: Boxes,
  },
  {
    label: 'Тип сладости',
    link: 'confectionary-types',
    icon: Candy,
  },
];

export const MENU_TABLE_ITEMS: MenuItem[] = [
  {
    label: 'Магазины',
    link: 'shops',
    icon: Store,
  },
  {
    label: 'Фабрики',
    link: 'factories',
    icon: Factory,
  },
  {
    label: 'Продукция',
    link: 'products',
    icon: Barcode,
  },
  {
    label: 'Каталог',
    link: 'catalogue',
    icon: ScrollText,
  },
  {
    label: 'Поставки',
    link: 'shipments',
    icon: Truck,
  },
];
