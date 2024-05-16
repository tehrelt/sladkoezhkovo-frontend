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
import { createCityForm } from '@/lib/forms/city.form';
import { CityService } from '@/services/city.service';
import Link from 'next/link';
import { DASHBOARD, PAGES } from '@/consts/pages.consts';
import { createConfectionaryTypeForm } from '@/lib/forms/confectionary-type.form';
import { ConfectionaryTypeService } from '@/services/confectionary-type.service';

type targetForm = z.infer<typeof createConfectionaryTypeForm>;

// eslint-disable-next-line react/display-name
export const CreateConfectionaryTypeForm = () => {
  const form = useForm<targetForm>({
    resolver: zodResolver(createConfectionaryTypeForm),
  });

  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['confectionaryTypes', 'create'],
    mutationFn: async (data: targetForm) =>
      ConfectionaryTypeService.create(data),
    onSuccess: (dto) => {
      toast.success(
        <span>
          Тип сладости{' '}
          <Link
            href={`${PAGES.DASHBOARD}/${DASHBOARD.CONFECTIONARY_TYPES}/${dto.id}`}
            className="underline"
          >
            {dto.name}
          </Link>{' '}
          создан
        </span>,
      );
      queryClient.invalidateQueries({ queryKey: ['confectionaryTypes'] });
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
          <SheetTitle>
            Регистрация новой категории кондитерских изделий
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название категории</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Введите название типа кондитерского изделия"
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

export default CreateConfectionaryTypeForm;
