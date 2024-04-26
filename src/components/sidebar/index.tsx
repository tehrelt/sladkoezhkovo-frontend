'use client';
import { NavigationMenu } from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import {
  MENU_GUIDE_ITEMS,
  MENU_ITEMS,
  MENU_TABLE_ITEMS,
  MODERATOR_ITEMS,
} from '@/consts/menu-items.consts';
import SidebarAccountCard from './SidebarAccountCard';
import SidebarMenuList from './SidebarMenuList';
import { Accordion } from '../ui/accordion';
import { PAGES } from '@/consts/pages.consts';

export default function DashboardSidebar() {
  return (
    <aside className="border-r-2 px-8 flex flex-col gap-4">
      <Link href={PAGES.ROOT}>
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/sladkoezhkovo.jpeg"
            width={128}
            height={128}
            alt={'logo'}
          />

          <p className="text-purple-700 font-bold">SLADKOEZHKOVO / ADMIN</p>
        </div>
      </Link>
      <hr />
      <SidebarAccountCard className="px-2" />
      <hr />
      <NavigationMenu>
        {/* @ts-ignore */}
        <Accordion type="multiple">
          <SidebarMenuList title="Модерация" items={MODERATOR_ITEMS} />
          <SidebarMenuList title="Пользователи" items={MENU_ITEMS} />
          <SidebarMenuList title="Таблицы" items={MENU_TABLE_ITEMS} />
          <SidebarMenuList title="Справочники" items={MENU_GUIDE_ITEMS} />
        </Accordion>
      </NavigationMenu>
    </aside>
  );
}
