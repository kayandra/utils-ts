import { cva as globalCva } from 'class-variance-authority';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export { type VariantProps as CvaProps } from 'class-variance-authority';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

type CvaParams<T> = Parameters<typeof globalCva<T>>
export function cva<T>(base: CvaParams<T>[0], config?: CvaParams<T>[1]) {
  const localCva = globalCva(base, config)
  return (props?: Parameters<typeof localCva>[0]) => twMerge(localCva(props))
}
