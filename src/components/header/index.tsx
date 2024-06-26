'use client';

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import Image from 'next/image';
import { navigationMenuTriggerStyle } from '../ui/navigation-menu';
import UserHeaderCard from './UserHeaderCard';
import { cn } from '@/lib/utils';
import { useProfile } from '@/hooks/useProfile';
import Search from './Search';
import AuthRequired from '../utils/RoleRequired';
import Cart from './Cart';
import NotificationCenter from './NotificationCenter';

type Props = {
  className?: string;
};

function Header({ className }: Props) {
  const profile = useProfile();

  return (
    <header
      className={cn(
        'flex justify-between py-2 px-48 border border-b-1 items-center space-x-12 mb-8',
        className,
      )}
    >
      <Link href={'/'} className="flex-none flex items-center space-x-4">
        <Image src="/sladkoezhkovo.jpeg" alt="logo" width={64} height={64} />
        <p className="font-bold text-2xl text-purple-800">
          <span className="hover:underline">SLADKOEZHKOVO</span>
        </p>
      </Link>
      <div className="flex-1 flex justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            {profile.loggedOut && (
              <>
                <NavigationMenuItem>
                  <Link href="/#" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Главная
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/#join" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Присоединиться
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </>
            )}
            <AuthRequired roles={['SHOP_OWNER']}>
              <NavigationMenuItem>
                <Link href="/catalogue" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Каталог
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </AuthRequired>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center gap-x-4 flex-none">
        <AuthRequired>
          <Search className="" />
        </AuthRequired>
        <AuthRequired roles={['SHOP_OWNER']}>
          <Cart />
        </AuthRequired>
        <AuthRequired roles={['FACTORY_OWNER']}>
          <NotificationCenter />
        </AuthRequired>

        <UserHeaderCard />
      </div>
    </header>
  );
}

export default Header;
