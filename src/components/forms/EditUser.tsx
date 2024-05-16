'use client';
import { User } from '@/lib/types/domain/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
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
} from '../ui/form';
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  Sheet,
} from '../ui/sheet';
import { Pencil } from 'lucide-react';
import { Input } from '../ui/input';
import { UserService } from '@/services/user.service';

type Props = {
  user: User;
};

// eslint-disable-next-line react/display-name
export const EditUserForm = ({ user }: Props) => {
  const editForm = z.object({
    lastName: z.string().min(1),
    firstName: z.string().min(1),
    middleName: z.string().min(1),
  });

  const form = useForm<z.infer<typeof editForm>>({
    resolver: zodResolver(editForm),
  });

  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    form.setValue('lastName', user.lastName);
    form.setValue('firstName', user.firstName);
    form.setValue('middleName', user.middleName);
  }, []);

  const { mutate } = useMutation({
    mutationKey: ['users', user.id, 'edit'],
    mutationFn: async (data: z.infer<typeof editForm>) =>
      UserService.update({
        id: user.id,
        lastName: data.lastName,
        firstName: data.firstName,
        middleName: data.middleName,
      }),
    onSuccess: () => {
      toast.success(`Пользователь ${user.handle} успешно обновлен`);
      queryClient.invalidateQueries({ queryKey: ['users', user.id] });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onSubmit = async (data: z.infer<typeof editForm>) => {
    await mutate(data);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Button className="px-3 py-1 self-end">
          <Pencil width={16} height={16} />
        </Button>
      </SheetTrigger>
      <SheetContent className="py-4">
        <SheetHeader>
          <SheetTitle>Редактирование пользователя</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="py-4">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Фамилия</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите фамилию" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите имя" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Отчество</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите отчетсво" {...field} />
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

export default EditUserForm;
