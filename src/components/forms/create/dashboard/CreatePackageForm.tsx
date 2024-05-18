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
import Link from 'next/link';
import { DASHBOARD, PAGES } from '@/consts/pages.consts';
import { createPackageForm } from '@/lib/forms/package.form';
import { PackageService } from '@/services/package.service';

type targetForm = z.infer<typeof createPackageForm>;

// eslint-disable-next-line react/display-name
export const CreatePackageForm = () => {
  const form = useForm<targetForm>({
    resolver: zodResolver(createPackageForm),
  });

  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['packages', 'create'],
    mutationFn: async (data: targetForm) => PackageService.create(data),
    onSuccess: (dto) => {
      toast.success(
        <span>
          Вид расфасовки{' '}
          <Link
            href={`${PAGES.DASHBOARD}/${DASHBOARD.PACKAGES}/${dto.id}`}
            className="underline"
          >
            {dto.name}
          </Link>{' '}
          создан
        </span>,
      );
      queryClient.invalidateQueries({ queryKey: ['packages'] });
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
          <SheetTitle>Регистрация нового вида расфасовки</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название вида расфасовки</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите вид расфасовки" {...field} />
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

export default CreatePackageForm;
