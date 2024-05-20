'use client';
import { ShoppingCart, Trash } from 'lucide-react';
import React from 'react';
import { Popover } from '../ui/popover';
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PAGES } from '@/consts/pages.consts';
import { useCart } from '@/hooks/useCart';
import { Skeleton } from '../ui/skeleton';
import { Price } from '../ui/price-range';

type Props = {};

const Cart = (props: Props) => {
  const { data: cart, isLoading } = useCart();

  return (
    <div>
      <Popover modal={false}>
        <PopoverTrigger>
          <Button className="flex gap-x-2">
            <>
              <ShoppingCart />
              {!isLoading && cart ? (
                cart.count
              ) : (
                <Skeleton className="w-2 h-2" />
              )}
            </>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="bg-white border rounded py-2 px-4 mt-1 space-y-4 w-80 flex flex-col">
          {!isLoading && cart ? (
            cart.count === 0 ? (
              <p>Ваша корзина пуста</p>
            ) : (
              cart.items.map((item) => (
                <div
                  key={item.catalogueEntry.id}
                  className="flex justify-between items-center gap-x-4"
                >
                  <div className="flex gap-x-2 items-center">
                    <div>
                      <Image src={item.image} alt="" width={64} height={64} />
                    </div>
                    <div>
                      <Link
                        href={`${PAGES.PRODUCTS}/${item.catalogueEntry.product.id}`}
                        className="hover:underline text-sm"
                      >
                        {item.catalogueEntry.product.name}{' '}
                        {item.catalogueEntry.package.name}
                      </Link>
                      <div className="flex gap-x-2 items-center">
                        {item.quantity} x
                        <Price value={item.catalogueEntry.price} />
                      </div>
                    </div>
                  </div>
                  <Button
                    className="px-2 py-1"
                    // onClick={() => removeItem(item.entry.id)}
                  >
                    <Trash />
                  </Button>
                </div>
              ))
            )
          ) : (
            <Skeleton />
          )}

          <Link href={PAGES.CART}>
            <Button className="w-full">Перейти в корзину</Button>
          </Link>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Cart;
