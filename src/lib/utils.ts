import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fio({
  lastName,
  firstName,
  middleName,
}: {
  lastName: string;
  firstName: string;
  middleName: string;
}) {
  return [
    lastName,
    firstName.charAt(0).toUpperCase() + '.',
    middleName.charAt(0).toUpperCase() + '.',
  ].join(' ');
}
