'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Price } from '@/components/ui/price-range';
import { Skeleton } from '@/components/ui/skeleton';
import { PAGES } from '@/consts/pages.consts';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import {
  useBuyAction,
  useCart,
  useRemoveFromCart,
  useUpdateCartEntry,
} from '@/hooks/useCart';
import { CartEntry } from '@/lib/dto/cart-entry.dto';
import { Input } from '@/components/ui/input';
import { Trash, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { debounce } from 'lodash';
import { UpdateCartEntryDto } from '@/lib/dto/update-cart-entry.dto';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
} from '@/components/ui/select';
import { useUserOwnerships } from '@/hooks/useUserFactories';
import { useProfile } from '@/hooks/useProfile';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

type Props = {};

const CartItem = ({ item }: { item?: CartEntry }) => {
  const [quantity, setQuantity] = React.useState(item?.quantity);

  const { mutate: removeFromCart, isPending: removePending } =
    useRemoveFromCart({});
  const { mutate: updateCartEntry, isPending: updatePending } =
    useUpdateCartEntry({
      onSuccess: () => {
        // toast.success('Цена обновлена');
      },
    });

  const debouncedUpdate = debounce(
    ({ catalogueId, quantity }: UpdateCartEntryDto) => {
      updateCartEntry({ catalogueId, quantity });
    },
    500,
  );

  const updateQuantity = debouncedUpdate;

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
            <div className="flex flex-col ">
              <Link
                href={`${PAGES.PRODUCTS}/${item.catalogueEntry.productId}`}
                className="hover:underline"
              >
                {item.catalogueEntry.product.name}
                {', '}
                {item.catalogueEntry.package.name}
                {` (${item.catalogueEntry.unitUsage} ${item.catalogueEntry.package.unit.name})`}
              </Link>

              <div>
                <Button
                  variant={'outline'}
                  className="px-2 py-0 border-0"
                  onClick={() =>
                    removeFromCart({ catalogueId: item.catalogueId })
                  }
                >
                  <Trash size={12} className="py-0" />
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
                    const num = Number(e.target.value);
                    if (!Number.isNaN(num)) {
                      setQuantity(num);
                      updateQuantity({
                        catalogueId: item.catalogueId,
                        quantity: num,
                      });
                    }
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

  const { user } = useProfile();
  const { data: shops, isLoading: shopsLoading } = useUserOwnerships(
    user?.handle ?? '',
  );

  const { mutate: buy, isPending: txPending } = useBuyAction({
    onSuccess: () => {
      toast.success('Спасибо! Покупка прошла успешно!');
    },
  });

  const [shop, setShop] = useState<string | undefined>(undefined);

  const handleBuy = () => {
    if (shop) {
      buy({ shop: shop });
    }
  };

  return (
    <div>
      <CardTitle className="mb-2">Корзина</CardTitle>
      <div className="grid grid-cols-[2.5fr_1fr] gap-x-4">
        <div className="flex-1">
          {!isLoading && cartItems ? (
            cartItems.count !== 0 ? (
              <div className="space-y-2">
                {cartItems.items.map((item) => (
                  <CartItem key={item.catalogueId} item={item} />
                ))}
              </div>
            ) : (
              <div>Корзина пуста</div>
            )
          ) : (
            <div className="space-y-2">
              {[1, 3].map((i) => (
                <Skeleton key={i} className="w-full h-28" />
              ))}
            </div>
          )}
        </div>
        <div className="flex-2">
          <Card>
            <CardHeader>
              <CardTitle>К оплате</CardTitle>
            </CardHeader>
            <CardContent>
              {!isLoading && cartItems ? (
                <Price value={cartItems.total} />
              ) : (
                <Skeleton className="w-48 h-8" />
              )}
            </CardContent>
            <CardFooter className="flex-col">
              <div className="flex flex-col w-full gap-y-4">
                <div className="space-y-1 w-full">
                  <Label>Выберите магазин</Label>
                  <Select
                    value={shop}
                    disabled={
                      shopsLoading || (shops && shops.items.length === 0)
                    }
                    onValueChange={(e) => setShop(e)}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          shops?.items.length !== 0
                            ? 'Выберите магазин'
                            : 'Магазинов нет в наличии'
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {!shopsLoading && shops ? (
                          shops.items.map((shop) => (
                            <SelectItem key={shop.handle} value={shop.handle}>
                              {shop.name}
                            </SelectItem>
                          ))
                        ) : (
                          <Skeleton className="w-48 h-8" />
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Button disabled={!shop || txPending} onClick={handleBuy}>
                  {shop ? <p>Купить</p> : <p>Выберите магазин</p>}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
