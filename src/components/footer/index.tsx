import { cn } from '@/lib/utils';
import React from 'react';

export const Footer = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        className,
        'py-4 bg-slate-900 text-white flex flex-col items-center justify-center italic',
      )}
    >
      <p>Разработано студентом группы ПИ-21а</p>
      <p>Евтеев Дмитрий Сергеевич 2024</p>
    </div>
  );
};
