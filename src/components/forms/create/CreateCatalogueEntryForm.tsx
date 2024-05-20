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
import { Product } from '@/lib/types/domain/product.dto';

type Props = {
  // productId: string;
  product: Product;
  callback?: () => any;
};

const schema = z.object({
  price: z.preprocess(
    (e) => parseFloat(z.string().parse(e)),
    z.number().min(1),
  ),
  packageId: z.string().uuid(),
});

const CreateCatalogueEntryForm = ({ product, callback }: Props) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const { data: packages, isLoading: pLoading } = usePackages();
  const { data: units, isLoading: uLoading } = useUnits();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['products', product.id, 'catalogue', 'create'],
    mutationFn: (dto: CreateCatalogueEntryDto) => CatalogueService.create(dto),
    onSuccess: (dto) => {
      toast.success('Продукт создан');
      queryClient.invalidateQueries({ queryKey: ['products', product.id] });
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = async (dto: z.infer<typeof schema>) => {
    await mutate({
      productId: product.id,
      ...dto,
    });
    callback && callback();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormItem>
          <FormLabel>Товар</FormLabel>
          <div className="border py-2 px-2 rounded-sm text-sm text-muted-foreground flex items-center gap-x-2">
            {product.name}
          </div>
        </FormItem>

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
                      {(function () {
                        const pp = packages?.items.filter(
                          (p) =>
                            !product.catalogueEntries
                              ?.map((ce) => ce.package.id)
                              .includes(p.id),
                        );

                        if (pp?.length === 0) {
                          return <>Нет доступных фасовок</>;
                        }

                        return pp?.map((p) => (
                          <SelectItem value={p.id} key={p.id}>
                            {p.name}
                          </SelectItem>
                        ));
                      })()}
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
              <FormLabel>
                Цена {'(если товар весовой, указывать цену за 100г)'}
              </FormLabel>
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
