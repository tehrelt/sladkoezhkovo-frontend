'use client';
import { User } from '@/lib/types/user';
import { useMutation } from '@tanstack/react-query';
import React, { forwardRef, useImperativeHandle } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

type Props = {
  user: User;
};

// eslint-disable-next-line react/display-name
export const EditUserForm = forwardRef(({ user }: Props, ref) => {
  const { mutate } = useMutation({
    mutationKey: ['editUser', user.handle],
    mutationFn: async () => 1,
    onSuccess: () => {
      toast.success(`Пользователь ${user.handle} успешно обновлен`);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  useImperativeHandle(ref, () => ({
    submit: () => {
      mutate();
    },
  }));

  return (
    <div>
      EditUser
      <Button ref={ref}>Сохранить</Button>
    </div>
  );
});

export default EditUserForm;
