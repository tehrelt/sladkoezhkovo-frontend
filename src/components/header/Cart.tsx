'use client';
import { useCartStore } from '@/store/cart';
import { ShoppingCart, Trash } from 'lucide-react';
import React from 'react';
import { Popover } from '../ui/popover';
import {
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Price } from '../ui/price-range';
import Link from 'next/link';
import { PAGES } from '@/consts/pages.consts';

type Props = {};

const Cart = (props: Props) => {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.remove);

  return (
    <div>
      <Popover modal={false}>
        <PopoverTrigger>
          <Button className="flex gap-x-2">
            <ShoppingCart />
            {items.length}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="bg-white border rounded py-2 px-4 mt-1 space-y-4 w-80">
          {items.length === 0 ? (
            <p>Ваша корзина пуста</p>
          ) : (
            items.map((item) => (
              <div
                key={item.entry.id}
                className="flex justify-between items-center gap-x-4"
              >
                <div>
                  <Link
                    href={`${PAGES.PRODUCTS}/${item.entry.productId}`}
                    className="hover:underline text-sm"
                  >
                    {item.entry.name}
                  </Link>
                  <div className="flex gap-x-2 items-center">
                    {item.unit}x<Price value={item.entry.price} />
                  </div>
                </div>
                <Button
                  className="px-2 py-1"
                  onClick={() => removeItem(item.entry.id)}
                >
                  <Trash />
                </Button>
              </div>
            ))
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Cart;
