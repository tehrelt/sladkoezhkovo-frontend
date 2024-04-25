import React from 'react';
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyleFull,
} from '../ui/navigation-menu';
import Link from 'next/link';
import { MenuItem } from '@/consts/menu-items.consts';
import { Separator } from '../ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { DASHBOARD, PAGES } from '@/consts/pages.consts';

interface Props {
  title: string;
  items: MenuItem[];
}

export default function SidebarMenuList({ title, items }: Props) {
  return (
    <AccordionItem value={title}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>
        <NavigationMenuList className="flex flex-col">
          {items.map((item) => (
            <NavigationMenuItem key={item.link} className="w-full">
              <Link
                href={`${PAGES.DASHBOARD}/${item.link}`}
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
      </AccordionContent>
    </AccordionItem>
  );

  return <div>SidebarMenuList</div>;
}
