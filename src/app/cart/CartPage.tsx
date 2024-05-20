'use client';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Price } from '@/components/ui/price-range';
import { Skeleton } from '@/components/ui/skeleton';
import { PAGES } from '@/consts/pages.consts';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useCart, useRemoveFromCart } from '@/hooks/useCart';
import { CartEntry } from '@/lib/dto/cart-entry.dto';
import { Input } from '@/components/ui/input';
import { Trash, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {};

const CartItem = ({ item }: { item?: CartEntry }) => {
  const [quantity, setQuantity] = React.useState(item?.quantity);

  const { mutate, isPending } = useRemoveFromCart({});

  return (
    <Card>
      <CardHeader className="grid grid-cols-[2fr_0.7fr] overflow-hidden h-32">
        <div className="flex gap-x-2">
          {!item ? (
            <Skeleton className="w-128 h-128" />
          ) : (
            <Image
              src={item.image}
              width={72}
              height={72}
              alt="photo"
              className="hover:brightness-90 rounded"
            />
          )}
          {!item ? (
            <Skeleton className="w-[512px] h-4" />
          ) : (
            <div className="flex flex-col justify-between">
              <Link
                href={`${PAGES.PRODUCTS}/${item.catalogueEntry.productId}`}
                className="hover:underline"
              >
                {item.catalogueEntry.product.name}
                {', '}
                {item.catalogueEntry.package.name}
              </Link>

              <div className="">
                <Button
                  variant={'outline'}
                  className="px-2 py-0"
                  onClick={() => mutate({ catalogueId: item.catalogueId })}
                >
                  <Trash size={12} />
                </Button>
              </div>
            </div>
          )}
        </div>
        <div>
          {!item ? (
            <Skeleton className="w-4 h-4" />
          ) : (
            <div className="flex flex-col justify-around h-full">
              <div className="flex items-center justify-between gap-x-2">
                <Input
                  className="w-24"
                  min={1}
                  value={quantity}
                  onChange={(e) => {
                    console.log(e.target.value, Number.isNaN(e.target.value));
                    const num = Number(e.target.value);
                    setQuantity((o) => (!Number.isNaN(num) ? num : o));
                  }}
                />
                <X />
                <Price value={item.catalogueEntry.price} />
              </div>
              <div className="flex justify-end">
                <Price value={item.total} />
              </div>
            </div>
          )}
        </div>
      </CardHeader>
    </Card>
  );
};

const CartPage = (props: Props) => {
  const { data: cartItems, isLoading } = useCart();

  return (
    <div>
      <CardTitle className="mb-2">Корзина</CardTitle>
      {!isLoading && cartItems ? (
        <div className="grid grid-cols-[2.5fr_1fr] gap-x-4">
          <div className="flex-1">
            {cartItems.count !== 0 ? (
              <div className="space-y-2">
                {cartItems.items.map((item) => (
                  <CartItem key={item.catalogueId} item={item} />
                ))}
              </div>
            ) : (
              <div>Корзина пуста</div>
            )}
          </div>
          <div className="flex-2">
            <Card>
              <CardHeader>
                <CardTitle>К оплате</CardTitle>
                <Price value={cartItems.total} />
              </CardHeader>
            </Card>
          </div>
        </div>
      ) : (
        [1, 2, 3].map((u) => <Skeleton key={u} className="w-full h-[64px]" />)
      )}
    </div>
  );
};

export default CartPage;
