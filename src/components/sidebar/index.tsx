'use client';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { navigationMenuTriggerStyleFull } from '../ui/navigation-menu';
import { MENU_ITEMS } from '@/consts/menu-items.consts';
import AdminAccountCard from './AdminAccountCard';

export default function Sidebar() {
  return (
    <aside className="border-r-2 px-8 flex flex-col gap-4">
      <Link href="/admin">
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
      <AdminAccountCard className="px-2" />
      <hr />
      <NavigationMenu>
        <NavigationMenuList>
          {MENU_ITEMS.map((item) => (
            <NavigationMenuItem key={item.link} className="w-full">
              <Link
                href={`/admin/${item.link}`}
                className="w-full"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyleFull()}`}
                >
                  <item.icon className="mr-3" />
                  <p className="w-full">{item.label}</p>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </aside>
  );
}
