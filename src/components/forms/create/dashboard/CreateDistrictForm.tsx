'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  Sheet,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { createDistrictForm } from '@/lib/forms/district.form';
import { DistrictService } from '@/services/district.service';
import Link from 'next/link';
import { DASHBOARD, PAGES } from '@/consts/pages.consts';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import { City } from '@/lib/types/domain/city.dto';
import { CityService } from '@/services/city.service';

type targetForm = z.infer<typeof createDistrictForm>;

// eslint-disable-next-line react/display-name
export const CreateDistrictForm = () => {
  const form = useForm<z.infer<typeof createDistrictForm>>({
    resolver: zodResolver(createDistrictForm),
  });
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      const cities = await CityService.list();
      setCities(cities.items);
    };

    fetchCities();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['districts', 'create'],
    mutationFn: async (data: targetForm) => DistrictService.create(data),
    onSuccess: (district) => {
      toast.success(
        <span>
          Район{' '}
          <Link
            href={`${PAGES.DASHBOARD}/${DASHBOARD.DISTRICTS}/${district.id}`}
          >
            {district.name}
          </Link>{' '}
          создан
        </span>,
      );
      queryClient.invalidateQueries({ queryKey: ['districts'] });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onSubmit = async (data: z.infer<typeof createDistrictForm>) => {
    await mutate(data);
    form.reset();
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Button className="px-3 py-1 self-end">Создать</Button>
      </SheetTrigger>
      <SheetContent className="py-4">
        <SheetHeader>
          <SheetTitle>Регистрация нового города</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название города</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите название города" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cityId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>К какому городу принадлежит район?</FormLabel>
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
            <SheetFooter>
              <Button className="mt-4" type="submit">
                Сохранить
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateDistrictForm;
