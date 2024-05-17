'use client';
import { User } from '@/lib/types/domain/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../../ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  Sheet,
} from '../../ui/sheet';
import { Pencil } from 'lucide-react';
import { Input } from '../../ui/input';
import { UserService } from '@/services/user.service';
import { Factory } from '@/lib/types/domain/factory.dto';
import { FactoryService } from '@/services/factory.service';

type Props = {
  factory: Factory;
};

// eslint-disable-next-line react/display-name
export const EditFactoryForm = ({ factory }: Props) => {
  const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
  );
  const editForm = z.object({
    name: z.string().min(1),
    phone: z.string().min(11).regex(phoneRegex),
    file: z
      .instanceof(File)
      .optional()
      .refine((file) => !file || (!!file && file.size < 7 << 20), {
        message: 'Размер фото не должен превышать 7MB.',
      }),
  });

  const form = useForm<z.infer<typeof editForm>>({
    resolver: zodResolver(editForm),
  });

  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    form.setValue('name', factory.name);
    form.setValue('phone', factory.phoneNumber);
  }, []);

  const { mutate } = useMutation({
    mutationKey: ['factory', factory.id, 'edit'],
    mutationFn: async (data: z.infer<typeof editForm>) =>
      FactoryService.update({
        ...data,
        id: factory.id,
        phone: data.phone.toString(),
      }),
    onSuccess: () => {
      toast.success(`Фабрика ${factory.handle} успешно обновленa`);
      queryClient.invalidateQueries({
        queryKey: ['factory', factory.handle],
      });
      setIsOpen(false);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onSubmit = async (data: z.infer<typeof editForm>) => {
    await mutate(data);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Button className="px-3 py-1 self-end space-x-2">
          <Pencil width={16} height={16} /> <span>Редактировать</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="py-4">
        <SheetHeader>
          <SheetTitle>Редактирование информации о фабрике</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="py-4">
            <FormItem>
              <FormLabel>Handle</FormLabel>
              <div className="border py-2 px-2 rounded-sm text-sm text-muted-foreground flex items-center gap-x-2">
                {factory?.handle}
              </div>
            </FormItem>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите название" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефон</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Введите телефон"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Фото</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <FormDescription />
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

export default EditFactoryForm;
