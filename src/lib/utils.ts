import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
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
  return [lastName, firstName.charAt(0) + '.', middleName.charAt(0) + '.'].join(
    ' ',
  );
}

export function datef(date: Date, format?: string): string {
  return dayjs(date).format(format ?? 'DD/MM/YYYY HH:mm:ss');
}
