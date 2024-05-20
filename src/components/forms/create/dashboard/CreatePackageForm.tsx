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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUnits } from '@/hooks/dashboard/useUnits';
import { Skeleton } from '@/components/ui/skeleton';
import { Unit } from '@/lib/types/domain/unit.dto';

type targetForm = z.infer<typeof createPackageForm>;

// eslint-disable-next-line react/display-name
export const CreatePackageForm = () => {
  const form = useForm<targetForm>({
    resolver: zodResolver(createPackageForm),
  });

  const [isOpen, setIsOpen] = useState(false);

  const { data: units, isLoading: unitsLoading } = useUnits();

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

            <FormField
              name="unitId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Единица измерения</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={unitsLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            unitsLoading ? 'Загрузка...' : 'Выберите город'
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {unitsLoading
                        ? [1, 2, 3].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              <Skeleton className="w-[256px] h-[16px]" />
                            </SelectItem>
                          ))
                        : units?.items.map((i: Unit) => (
                            <SelectItem key={i.id} value={i.id}>
                              {i.name}
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

export default CreatePackageForm;
