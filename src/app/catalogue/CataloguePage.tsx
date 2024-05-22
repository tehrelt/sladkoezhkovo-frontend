'use client';
import { useCatalogue } from '@/hooks/useCatalogue';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CatalogueEntry } from '@/lib/types/domain/catalogue-entry.dto';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { PAGES } from '@/consts/pages.consts';
import { Price } from '@/components/ui/price-range';
import { Check, Factory, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useConfectionaryTypes } from '@/hooks/dashboard/useConfectionaryTypes';
import { Checkbox } from '@/components/ui/checkbox';
import { ConfectionaryType } from '@/lib/types/domain/confectionary-type.dto';
import { useQueryClient } from '@tanstack/react-query';
import { usePackages } from '@/hooks/dashboard/usePackages';
import { Label } from '@/components/ui/label';
import { useCart } from '@/hooks/useCart';
import { Badge } from '@/components/ui/badge';

type Props = {};

type Context = {
  confectionaryTypeId?: string[];
  packagesId?: string[];
};

const CATALOGUE_CONTEXT = createContext<Context>({});

const CatalogueItem = ({
  item,
  has,
}: {
  item?: CatalogueEntry;
  has?: boolean;
}) => {
  return (
    <Card className="hover:shadow-lg cursor-pointer transition-all duration-300">
      <Link
        href={`${PAGES.PRODUCTS}/${item?.product.id}`}
        className="flex flex-col justify-between h-full"
      >
        <CardHeader className="flex items-center justify-center flex-2">
          {item ? (
            item.product.image ? (
              <div className="min-w-[200px] h-[200px]">
                <Image
                  src={item.product.image}
                  width={200}
                  height={200}
                  className="w-full h-full"
                  alt="no image"
                />
              </div>
            ) : (
              <Skeleton className="w-[200px] h-[200px]" />
            )
          ) : (
            <div>
              <Skeleton className="w-[200px] h-[200px]" />
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-2 flex-1">
          {item ? (
            <>
              <div className="flex justify-between">
                <CardTitle className="text-lg">{item.product.name}</CardTitle>
                <Price value={item.price} />
              </div>
              <CardDescription className="flex justify-between text-sm">
                <p>
                  {item.product.confectionaryType} / {item.unitUsage} /{' '}
                  {item.package.name}
                </p>
              </CardDescription>
            </>
          ) : (
            <>
              <Skeleton className="w-full h-10" />
              <div className="flex justify-between">
                <Skeleton className="w-[128px] h-4" />
                <Skeleton className="w-[96px] h-6" />
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex-2">
          {item ? (
            <div className="flex justify-between w-full items-end">
              <Link
                href={`${PAGES.FACTORY}/${item.factory.handle}`}
                className="flex gap-x-2 items-center text-sm"
              >
                <Factory />
                <p className="hover:underline">{item.factory.name}</p>
              </Link>
              <div>
                <Button disabled={!!has} className="p-3 h-fit">
                  {!has ? <ShoppingCart size={16} /> : <Check size={16} />}
                </Button>
              </div>
            </div>
          ) : (
            <Skeleton className="w-full h-4" />
          )}
        </CardFooter>
      </Link>
    </Card>
  );
};

const CatalogueList = ({ className }: { className?: string }) => {
  const ctx = useContext(CATALOGUE_CONTEXT);

  const { data, isLoading } = useCatalogue({ ...ctx });

  const { checkProduct } = useCart();

  return (
    <div className={cn('grid grid-cols-3 gap-x-4 gap-y-3', className)}>
      {!isLoading && data
        ? data.items.map((item) => (
            <CatalogueItem
              item={item}
              key={item.id}
              has={!!checkProduct(item.id)}
            />
          ))
        : [1, 2, 3, 4, 5, 6].map((i) => <CatalogueItem key={i} />)}
    </div>
  );
};

const CataloguePage = () => {
  const { data: ptpt, isLoading: ptLoading } = usePackages();
  const { data: ctct, isLoading: ctLoading } = useConfectionaryTypes();

  const [ctSelected, setCtSelected] = useState<Record<string, boolean>>({});
  const [ptSelected, setPtSelected] = useState<Record<string, boolean>>({});

  const client = useQueryClient();

  const applyFilter = () => {
    client.invalidateQueries({ queryKey: ['catalogue'] });
  };

  return (
    <div>
      <p className="text-3xl font-bold mb-4">Каталог</p>
      <div className="grid grid-cols-[1fr_3fr] gap-x-4">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Фильтры</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {!ctLoading && ctct && (
                <div className="flex flex-col gap-y-1">
                  <Label className="font-semibold">
                    Кондитерская категория
                  </Label>
                  <div className="flex flex-col">
                    {ctct.items.map((ct: ConfectionaryType) => (
                      <div key={ct.id} className="flex gap-x-2 items-center">
                        <Checkbox
                          key={ct.id}
                          value={ctSelected[ct.id] ? 'checked' : ''}
                          onClick={() => {
                            setCtSelected((o) => ({
                              ...o,
                              [ct.id]: !o[ct.id],
                            }));
                          }}
                          className="m-0"
                        />
                        <span>{ct.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!ptLoading && ptpt && (
                <div className="flex flex-col gap-y-1">
                  <Label className="font-semibold">Вид фасовки</Label>
                  <div className="flex flex-col">
                    {ptpt.items.map((i) => (
                      <div key={i.id} className="flex gap-x-2 items-center">
                        <Checkbox
                          key={i.id}
                          value={ctSelected[i.id] ? 'checked' : ''}
                          onClick={() => {
                            setPtSelected((o) => ({ ...o, [i.id]: !o[i.id] }));
                          }}
                        />
                        <span>{i.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-y-2">
              <Button onClick={applyFilter} className="w-full">
                Применить
              </Button>
            </CardFooter>
          </Card>
        </div>
        <CATALOGUE_CONTEXT.Provider
          value={{
            confectionaryTypeId: Object.keys(ctSelected).filter(
              (id) => ctSelected[id],
            ),
            packagesId: Object.keys(ptSelected).filter((id) => ptSelected[id]),
          }}
        >
          <CatalogueList className="col-start-2" />
        </CATALOGUE_CONTEXT.Provider>
      </div>
    </div>
  );
};

export default CataloguePage;
