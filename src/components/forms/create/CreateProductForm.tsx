'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { useConfectionaryTypes } from '@/hooks/dashboard/useConfectionaryTypes';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { ConfectionaryType } from '@/lib/types/domain/confectionary-type.dto';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useFactory, useProfileFactories } from '@/hooks/useFactory';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CreateProductDto } from '@/lib/dto/create-product.dto';
import { ProductService } from '@/services/product.service';

type Props = { factoryHandle: string };

const zForm = z.object({
  name: z.string(),
  confectionaryTypeId: z.string().uuid(),
  weight: z.preprocess((v) => Number(v), z.number().min(0)),
  file: z.instanceof(File).refine((file) => file.size < 7 << 20, {
    message: 'Размер фото не должен превышать 7MB.',
  }),
});

const CreateProductForm = ({ factoryHandle }: Props) => {
  const form = useForm<z.infer<typeof zForm>>({
    resolver: zodResolver(zForm),
  });

  const { data: cts, isLoading: ctLoading } = useConfectionaryTypes();
  const { factory, isLoading: factoryLoading } = useFactory(factoryHandle);

  const { mutate } = useMutation({
    mutationKey: ['factories', factoryHandle, 'products', 'create'],
    mutationFn: (dto: CreateProductDto) => ProductService.create(dto),
    onSuccess: (dto) => {
      toast.success('Продукт создан');
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = async (dto: z.infer<typeof zForm>) => {
    await mutate({ ...dto, factoryId: factory?.id! });
  };

  return (
    <div className="flex justify-center">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Зарегистрировать новый продукт</CardTitle>
            </CardHeader>
            <CardContent>
              <FormItem>
                <FormLabel>Фабрика</FormLabel>
                <div className="border py-2 px-2 rounded-sm text-sm text-muted-foreground flex items-center gap-x-2">
                  <Avatar className="w-[32px] h-[32px]">
                    <AvatarImage src={factory?.image} />
                    <AvatarFallback>{factory?.handle}</AvatarFallback>
                  </Avatar>
                  {factory?.name}
                </div>
                {/* <Input disabled value={factory?.name} /> */}
              </FormItem>

              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название продукта</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите название продукта"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="weight"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Вес продукта</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите вес"
                        type="number"
                        min={1}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="confectionaryTypeId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Категория кондитерского изделия?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ctLoading ? (
                          <p>Загрузка</p>
                        ) : (
                          <>
                            {cts!.items.map((ct: ConfectionaryType) => (
                              <SelectItem key={ct.id} value={ct.id}>
                                {ct.name}
                              </SelectItem>
                            ))}
                          </>
                        )}
                      </SelectContent>
                    </Select>
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

export default CreateProductForm;
