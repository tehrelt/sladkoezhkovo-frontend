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
import { PropertyTypeService } from '@/services/property-type.service';

type Props = {};

const zForm = z.object({
  name: z.string(),
  handle: z.string(),
  cityId: z.string().uuid(),
  propertyTypeId: z.string().uuid(),
  phoneNumber: z.string(),
  year: z
    .string()
    .refine((v) => Number(v) >= 1700 && Number(v) <= new Date().getFullYear()),
});

const CreateFactoryForm = (props: Props) => {
  const form = useForm<z.infer<typeof zForm>>({
    resolver: zodResolver(zForm),
  });

  const [cities, setCities] = useState<City[]>([]);
  const [ptpt, setPtpt] = useState<PropertyType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const cities = await CityService.list();
      setCities(cities.items);

      const ptpt = await PropertyTypeService.list();
      setPtpt(ptpt.items);
    };

    fetchData();
  }, []);

  const { mutate } = useMutation({
    mutationKey: ['factories', 'create'],
    mutationFn: (data: z.infer<typeof zForm>) =>
      AccountService.createFactory(data),
    onSuccess: (dto) => {
      toast.success('Фабрика успешно создана');
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = async (data: z.infer<typeof zForm>) => {
    data.year = Number(data.year);
    await mutate(data);
  };

  return (
    <div className="flex justify-center">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Добавить фабрику</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название фабрики</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите название фабрики"
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
                      <Input placeholder="Введите handle фабрики" {...field} />
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
                    <FormLabel>К какому городу принадлежит фабрика?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите город" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cities.map((city: City) => (
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
                name="propertyTypeId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тип собственности?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип собственности" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ptpt.map((pt: PropertyType) => (
                          <SelectItem key={pt.id} value={pt.id}>
                            {pt.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                name="year"
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
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit">Добавить</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CreateFactoryForm;
