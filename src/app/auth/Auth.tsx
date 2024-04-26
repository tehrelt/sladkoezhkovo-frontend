'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services/auth.service';
import { SignInDto } from '@/lib/dto/auth.dto';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInForm } from '@/lib/forms/auth.form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export default function Auth() {
  const form = useForm<z.infer<typeof SignInForm>>({
    resolver: zodResolver(SignInForm),
  });

  const { push } = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['auth'],
    mutationFn: (data: SignInDto) => AuthService.signIn(data),
    onSuccess: () => {
      toast('Успешная авторизация');
      form.reset();
      push('/');
    },
    onError: (error) => {
      toast(error.message);
    },
  });

  const onSubmit: SubmitHandler<SignInDto> = async (data) => {
    await mutate(data);
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/3 p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Логин</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Введите имя пользователя или email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Введите пароль"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Минимум 8 символов.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Авторизоваться</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
