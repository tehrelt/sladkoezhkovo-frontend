'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useProduct, useProductOwner } from '@/hooks/useProduct';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/hooks/useProfile';
import { PackagePlus, Pencil } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import CreateCatalogueEntryForm from '@/components/forms/create/CreateCatalogueEntryForm';
import { cn } from '@/lib/utils';
import { CatalogueEntry } from '@/lib/types/domain/catalogue-entry.dto';
import { Price, PriceRange } from '@/components/ui/price-range';
import OwnerRequired from '@/components/utils/OwnerRequired';
import { Input } from '@/components/ui/input';
import { PAGES } from '@/consts/pages.consts';
import { useAddToCart, useCart } from '@/hooks/useCart';
import AuthRequired from '@/components/utils/RoleRequired';

type Props = {
  id: string;
};

const ProductOverviewPage = ({ id }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { product, isLoading } = useProduct(id);
  const { productOwner, isLoading: productOwnerLoading } = useProductOwner(id);
  const { user, isLoading: userLoading } = useProfile();

  const [selectedEntry, setSelectedEntry] = useState<CatalogueEntry>();
  const [unit, setUnit] = useState<number>();

  const router = useRouter();

  const { checkProduct } = useCart();
  const { mutate, isPending } = useAddToCart({});

  const canAdd =
    !isLoading && selectedEntry && !checkProduct(selectedEntry!.id);

  const handleAddCartItem = (catalogueId: string, quantity: number) => {
    if (user && unit) {
      mutate({
        catalogueId,
        quantity,
      });
    }
  };

  const isOwner = productOwner?.handle === user?.handle;

  const priceRange = () => {
    if (
      !product ||
      !product.catalogueEntries ||
      product.catalogueEntries.length === 0
    ) {
      return undefined;
    }

    const prices = product!.catalogueEntries!.map((e) => e.price);
    const [min, max] = [Math.min(...prices), Math.max(...prices)];
    return { min, max };
  };

  return (
    <div className="grid grid-cols-[2fr_1.5fr] gap-x-4">
      {isLoading ? (
        <Skeleton className="w-[256px] h-[256px]" />
      ) : (
        <div className="flex justify-center">
          <div>
            <Image
              className="hover:brightness-75 hover:bg-slate-50 transition-all duration-200 rounded hover:shadow-md "
              src={product?.image!}
              alt={product?.name!}
              width={512}
              height={512}
            />
          </div>
        </div>
      )}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>
              {isLoading ? (
                <Skeleton className="w-[256px] h-[24px]" />
              ) : (
                <span>{product?.name}</span>
              )}
            </CardTitle>
            <CardDescription>
              {isLoading ? (
                <Skeleton className="w-[96px] h-[18px]" />
              ) : (
                <span>
                  <Button
                    variant={'link'}
                    className="p-0 text-muted-foreground m-0"
                    onClick={() =>
                      router.push(`${PAGES.FACTORY}/${product?.factory.handle}`)
                    }
                  >
                    {product?.factory.name}
                  </Button>
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-3 gap-x-2 gap-y-2">
              {product?.catalogueEntries?.map((entry) => (
                <Button
                  key={entry.id}
                  variant={'outline'}
                  className={cn(
                    selectedEntry?.id === entry.id && 'border-blue-500',
                    'text-lg',
                  )}
                  onClick={(e) => {
                    selectedEntry
                      ? selectedEntry?.id == entry.id
                        ? setSelectedEntry(undefined)
                        : setSelectedEntry(entry)
                      : setSelectedEntry(entry);
                  }}
                >
                  {entry.unitUsage}/{entry.package.unit.name}/
                  {entry.package.name}
                </Button>
              ))}
            </div>
            <div>
              {!selectedEntry ? (
                product?.catalogueEntries?.length !== 1 ? (
                  <span>
                    <PriceRange range={priceRange()} />
                  </span>
                ) : (
                  <Price value={product.catalogueEntries.at(0)!.price} />
                )
              ) : (
                <Price value={selectedEntry.price} />
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <AuthRequired roles={['SHOP_OWNER']}>
              <div className="flex items-center gap-x-2">
                <p>Количество: </p>
                <div className="">
                  <Input
                    min={1}
                    value={unit}
                    onChange={(e) => {
                      console.log(e.target.value, Number.isNaN(e.target.value));
                      const num = Number(e.target.value);
                      setUnit((o) => (!Number.isNaN(num) ? num : o));
                    }}
                  />
                </div>
              </div>
              <Button
                disabled={
                  !selectedEntry ||
                  isOwner ||
                  user?.role !== 'SHOP_OWNER' ||
                  unit == 0 ||
                  !canAdd
                }
                onClick={() => handleAddCartItem(selectedEntry?.id!, unit!)}
              >
                {isOwner ? (
                  <span>Вы владелец</span>
                ) : user?.role !== 'SHOP_OWNER' ? (
                  <span>Заказывать могут только владельцы магазинов</span>
                ) : !selectedEntry ? (
                  <span>Выберите вариацию</span>
                ) : !canAdd ? (
                  <span>Уже добавлено</span>
                ) : (
                  <span>Добавить в корзину</span>
                )}
              </Button>
            </AuthRequired>
          </CardFooter>
        </Card>
        {!productOwnerLoading && !userLoading && productOwner && (
          <OwnerRequired ownerHandle={productOwner.handle}>
            <Card>
              <CardHeader>
                <CardTitle>Управление</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-start">
                <Button variant={'link'} className="space-x-2">
                  <Pencil /> <span>Редактировать</span>
                </Button>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button variant={'link'} className="space-x-2">
                      <PackagePlus /> <span>Добавить вариацию</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>Добавить вариацию</DialogHeader>
                    <DialogDescription className="space-y-2">
                      <span>
                        Добавление новой вариaции для товара &quot;
                        {product?.name}
                        &quot;
                      </span>
                      {product && (
                        <CreateCatalogueEntryForm
                          product={product!}
                          callback={() => setIsOpen(false)}
                        />
                      )}
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </OwnerRequired>
        )}
      </div>
    </div>
  );
};

export default ProductOverviewPage;
