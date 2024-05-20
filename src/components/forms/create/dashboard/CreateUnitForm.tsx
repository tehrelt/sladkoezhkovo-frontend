'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
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
import { CityService } from '@/services/city.service';
import Link from 'next/link';
import { DASHBOARD, PAGES } from '@/consts/pages.consts';
import { createUnitForm } from '@/lib/forms/unit.form';
import { UnitService } from '@/services/unit.service';

type targetForm = z.infer<typeof createUnitForm>;

// eslint-disable-next-line react/display-name
export const CreateUnitForm = () => {
  const form = useForm<targetForm>({
    resolver: zodResolver(createUnitForm),
  });

  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['units', 'create'],
    mutationFn: async (data: targetForm) => UnitService.create(data),
    onSuccess: (dto) => {
      toast.success(
        <span>
          Ед. измерения{' '}
          <Link
            href={`${PAGES.DASHBOARD}/${DASHBOARD.UNITS}/${dto.id}`}
            className="underline"
          >
            {dto.name}
          </Link>{' '}
          созданa
        </span>,
      );
      queryClient.invalidateQueries({ queryKey: ['units'] });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onSubmit = async (data: targetForm) => {
    await mutate(data);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Button className="px-3 py-1 self-end">Создать</Button>
      </SheetTrigger>
      <SheetContent className="py-4">
        <SheetHeader>
          <SheetTitle>Регистрация новой единицы измерения</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Единица измерения</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Введите единицу измерения (кг, г, л и т.д.)"
                      {...field}
                    />
                  </FormControl>
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

export default CreateUnitForm;
