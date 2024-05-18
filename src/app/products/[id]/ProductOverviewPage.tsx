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
import React, { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
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

type Props = {
  id: string;
};

const ProductOverviewPage = ({ id }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { product, isLoading } = useProduct(id);
  const { productOwner, isLoading: productOwnerLoading } = useProductOwner(id);
  const { user, isLoading: userLoading } = useProfile();

  const [selectedEntry, setSelectedEntry] = useState<CatalogueEntry>();

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

  const router = useRouter();

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
                      router.push(`/factory/${product?.factory.handle}`)
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
                  )}
                  onClick={(e) => {
                    selectedEntry
                      ? selectedEntry?.id == entry.id
                        ? setSelectedEntry(undefined)
                        : setSelectedEntry(entry)
                      : setSelectedEntry(entry);
                  }}
                >
                  <span className="text-lg">
                    {entry.quantity}x{entry.price}
                  </span>{' '}
                  рублей
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
          <CardFooter>
            <Button disabled={!selectedEntry || isOwner}>
              {isOwner ? (
                <span>Вы владелец</span>
              ) : !selectedEntry ? (
                <span>Выберите вариацию</span>
              ) : (
                <span>Добавить в корзину</span>
              )}
            </Button>
          </CardFooter>
        </Card>
        {!productOwnerLoading && !userLoading && isOwner && (
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
                      Добавление новой вариaции для товара &quot;{product?.name}
                      &quot;
                    </span>
                    <CreateCatalogueEntryForm
                      productId={id}
                      callback={() => setIsOpen(false)}
                    />
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProductOverviewPage;
