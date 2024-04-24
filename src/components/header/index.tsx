'use client';

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { navigationMenuTriggerStyle } from '../ui/navigation-menu';
import UserHeaderCard from './UserHeaderCard';

type Props = {};

function Header({}: Props) {
  return (
    <header className="flex justify-between py-2 px-48 border border-b-1 items-center">
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Главная
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div>
        <UserHeaderCard />
      </div>
    </header>
  );
}

export default Header;
