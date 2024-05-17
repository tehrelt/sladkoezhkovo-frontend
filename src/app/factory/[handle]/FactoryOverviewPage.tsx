'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Mention from '@/components/ui/mention';
import { Skeleton } from '@/components/ui/skeleton';
import { useFactory, useFactoryProducts } from '@/hooks/useFactory';
import { useProfile } from '@/hooks/useProfile';
import { Car, MapPinned, Phone, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  handle: string;
};

const FactoryOverviewPage = ({ handle }: Props) => {
  const { user, isLoading: profileLoading } = useProfile();
  const { factory, isLoading: factoryLoading } = useFactory(handle);
  const { products, isLoading: productsLoading } = useFactoryProducts(handle);

  const isOwner = user?.handle === factory?.owner?.handle;

  return (
    <div>
      <div className="flex flex-col gap-y-4">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <div className="flex gap-x-4">
              {factory?.image && (
                <Image
                  src={factory.image}
                  alt={`${factory?.name}`}
                  width={96}
                  height={96}
                />
              )}
              <div className="">
                <CardTitle className="flex justify-between items-center">
                  {factoryLoading ? (
                    <Skeleton className="w-[512px] h-[32px]" />
                  ) : (
                    <>
                      <p>{factory?.name}</p>
                    </>
                  )}
                </CardTitle>
                <CardDescription>@{factory?.handle}</CardDescription>
              </div>
            </div>
            <div className="flex gap-x-4">
              {!profileLoading && isOwner && (
                <>
                  <Button>Статистика</Button>
                  <Button>Редактировать</Button>
                  <Link href={`/factory/${factory?.handle}/create`}>
                    <Button>Зарегистрировать продукт</Button>
                  </Link>
                </>
              )}
            </div>
          </CardHeader>
        </Card>
        <div className="flex gap-x-4">
          <div className="flex-3">
            <Card>
              <CardHeader>
                <CardTitle>Информация о фабрике</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  {factoryLoading ? (
                    <Skeleton className="w-[128px] h-[32px]" />
                  ) : (
                    <ul className="space-y-2">
                      <li className="flex gap-x-4">
                        <MapPinned /> {factory?.city.name}
                      </li>
                      <li className="flex gap-x-4 items-center">
                        <User />
                        <Mention
                          handle={factory?.owner.handle!}
                          className="px-0"
                        />
                      </li>

                      <li className="flex gap-x-4 items-center">
                        <Phone />
                        <Link
                          className="hover:underline"
                          href={`tel:${factory?.phoneNumber}`}
                        >
                          +{factory?.phoneNumber}
                        </Link>{' '}
                      </li>
                    </ul>
                  )}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-y-2 gap-x-2">
              {productsLoading
                ? [1, 2, 3].map((t) => (
                    <Card key={t}>
                      <CardHeader>
                        <CardTitle>
                          <Skeleton className="w-[192px] h-[24px]" />
                        </CardTitle>
                        <CardDescription>
                          <Skeleton className="w-1/4 h-[16px]" />
                        </CardDescription>
                        <CardContent></CardContent>
                      </CardHeader>
                    </Card>
                  ))
                : products?.items.map((p) => (
                    <Card key={p.id} className="hover:shadow-lg transition-all">
                      <CardHeader className="flex flex-col justify-between h-full">
                        <div className="flex flex-wrap justify-center gap-x-2 overflow-hidden h-[224px]">
                          {p.image ? (
                            <Image
                              key={p.image}
                              src={p.image}
                              alt={`${p.name}`}
                              width={256}
                              height={256}
                            />
                          ) : (
                            <Skeleton className="w-[256px] h-[192px]" />
                          )}
                        </div>
                        <div>
                          <CardTitle>
                            <Link
                              href={`/products/${p.id}`}
                              className="hover:underline "
                            >
                              {p.name}
                            </Link>
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {p.confectionaryType.name}
                          </CardDescription>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactoryOverviewPage;
