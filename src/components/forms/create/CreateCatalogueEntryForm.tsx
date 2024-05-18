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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { CatalogueService } from '@/services/catalogue.service';
import { CreateCatalogueEntryDto } from '@/lib/dto/create/catalogue-entry.dto';
import { usePackages } from '@/hooks/dashboard/usePackages';
import { useUnits } from '@/hooks/dashboard/useUnits';
import { Package } from '@/lib/types/domain/package.dto';
import { Unit } from '@/lib/types/domain/unit.dto';

type Props = {
  productId: string;
  callback?: () => any;
};

const schema = z.object({
  price: z.preprocess(
    (e) => parseFloat(z.string().parse(e)),
    z.number().min(1),
  ),
  quantity: z.preprocess(
    (e) => parseInt(z.string().parse(e)),
    z.number().min(1),
  ),
  packageId: z.string().uuid(),
  unitId: z.string().uuid(),
});

const CreateCatalogueEntryForm = ({ productId, callback }: Props) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const { data: packages, isLoading: pLoading } = usePackages();
  const { data: units, isLoading: uLoading } = useUnits();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['products', productId, 'catalogue', 'create'],
    mutationFn: (dto: CreateCatalogueEntryDto) => CatalogueService.create(dto),
    onSuccess: (dto) => {
      toast.success('Продукт создан');
      queryClient.invalidateQueries({ queryKey: ['products', productId] });
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = async (dto: z.infer<typeof schema>) => {
    await mutate({
      productId,
      ...dto,
    });
    callback && callback();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* <FormItem>
          <FormLabel>Товар</FormLabel>
          <div className="border py-2 px-2 rounded-sm text-sm text-muted-foreground flex items-center gap-x-2">
            {productId}
          </div>
        </FormItem> */}

        <FormField
          name="unitId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ед. измерения?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите ед. измерения" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {uLoading ? (
                    <p>Загрузка</p>
                  ) : (
                    <>
                      {units!.items.map((u: Unit) => (
                        <SelectItem key={u.id} value={u.id}>
                          {u.name}
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
          name="packageId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Вид фасовки?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите вид фасовки" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {pLoading ? (
                    <p>Загрузка</p>
                  ) : (
                    <>
                      {packages!.items.map((p: Package) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
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
          name="price"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Цена?</FormLabel>
              <Input {...field} type="number" />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="quantity"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Количество?</FormLabel>
              <Input {...field} type="number" />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Добавить</Button>
      </form>
    </Form>
  );
};

export default CreateCatalogueEntryForm;
