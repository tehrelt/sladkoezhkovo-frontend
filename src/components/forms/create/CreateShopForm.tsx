'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { City } from '@/lib/types/domain/city.dto';
import { CityService } from '@/services/city.service';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { AccountService } from '@/services/account.service';
import { toast } from 'sonner';
import { PropertyType } from '@/lib/types/domain/property-type.dto';
import { useCities } from '@/hooks/dashboard/useCities';
import { usePropertyTypes } from '@/hooks/dashboard/usePropertyTypes';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { PAGES } from '@/consts/pages.consts';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AxiosError } from 'axios';
import { ErrorDto } from '@/lib/types/error.dto';
import { useDistricts } from '@/hooks/dashboard/useDistricts';
import { District } from '@/lib/types/domain/district.dto';
import { CreateShopDto } from '@/lib/dto/create/shop.dto';

type Props = {};

const zForm = z.object({
  name: z.string(),
  handle: z.string(),
  districtId: z.string().uuid(),
  cityId: z.string().uuid(),
  phoneNumber: z.string(),
  employeesCount: z.preprocess((v) => Number(v), z.number().min(1)),
  openSince: z
    .string()
    .refine((v) => Number(v) >= 1700 && Number(v) <= new Date().getFullYear()),
  file: z.instanceof(File).refine((file) => file.size < 7 << 20, {
    message: 'Размер фото не должен превышать 7MB.',
  }),
});

const CreateShopForm = (props: Props) => {
  const form = useForm<z.infer<typeof zForm>>({
    resolver: zodResolver(zForm),
  });

  const router = useRouter();

  const cityId = form.watch('cityId');
  const { data: cities, isLoading: citiesLoading } = useCities();
  const { data: districts, isLoading: districtsLoading } = useDistricts({
    cityId,
  });

  const { mutate, isError, error, isPending } = useMutation({
    mutationKey: ['factories', 'create'],
    mutationFn: (data: CreateShopDto) => AccountService.createShop(data),
    onSuccess: (dto) => {
      console.log(dto);
      toast.success('Магазин успешно создан');
      router.push(`${PAGES.SHOPS}/${dto.handle}`);
    },
    onError: (error: ErrorDto) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: z.infer<typeof zForm>) => {
    await mutate(data);
  };

  return (
    <div>
      <div>
        <Button variant={'link'} onClick={() => router.back()}>
          <ArrowLeft />
          Вернуться назад
        </Button>
      </div>
      <div className="flex flex-col items-center">
        <Card className="py-4 px-4">
          {isError && (
            <Alert variant={'destructive'}>
              <AlertCircle />
              <AlertTitle>Ошибка создания</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Добавить магазин</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Название магазина</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Введите название магазина"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="handle"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Handle фабрики</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Введите handle магазина"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="cityId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        К какому городу принадлежит фабрика?
                      </FormLabel>
                      <Select
                        onValueChange={(e) => {
                          form.resetField('districtId');
                          return field.onChange(e);
                        }}
                        defaultValue={field.value}
                        disabled={citiesLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                citiesLoading ? 'Загрузка...' : 'Выберите город'
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {citiesLoading
                            ? [1, 2, 3].map((i) => (
                                <SelectItem key={i} value={i.toString()}>
                                  <Skeleton className="w-[256px] h-[16px]" />
                                </SelectItem>
                              ))
                            : cities?.items.map((city: City) => (
                                <SelectItem key={city.id} value={city.id}>
                                  {city.name}
                                </SelectItem>
                              ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="districtId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Выберите улицу</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!cityId || districtsLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                !cityId
                                  ? 'Выберите город'
                                  : districtsLoading
                                    ? 'Загрузка...'
                                    : 'Выберите тип собственности'
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {districtsLoading
                            ? [1, 2, 3].map((i) => (
                                <SelectItem key={i} value={i.toString()}>
                                  <Skeleton className="w-[256px] h-[16px]" />
                                </SelectItem>
                              ))
                            : districts?.items.map((d: District) => (
                                <SelectItem key={d.id} value={d.id}>
                                  {d.name}
                                </SelectItem>
                              ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between gap-x-4">
                  <FormField
                    name="phoneNumber"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Номер телефона</FormLabel>
                        <InputOTP maxLength={11} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                            <InputOTPSlot index={6} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={7} />
                            <InputOTPSlot index={8} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={9} />
                            <InputOTPSlot index={10} />
                          </InputOTPGroup>
                        </InputOTP>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="employeesCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Количество сотрудников</FormLabel>
                        <Input type="number" min={1} {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between gap-x-4">
                  <FormField
                    name="openSince"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Год открытия</FormLabel>
                        <InputOTP maxLength={4} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                        </InputOTP>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Фото</FormLabel>
                        <FormControl>
                          <Input
                            {...fieldProps}
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={(event) =>
                              onChange(
                                event.target.files && event.target.files[0],
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button disabled={isPending} type="submit">
                  Добавить
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default CreateShopForm;
