import clsx, { ClassValue } from 'clsx'
import { cva as globalCva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}

export { type VariantProps as CvaProps } from 'class-variance-authority'

type CvaParams<T> = Parameters<typeof globalCva<T>>
export function cva<T>(base: CvaParams<T>[0], config?: CvaParams<T>[1]) {
  const localCva = globalCva(base, config)
  return (props?: Parameters<typeof localCva>[0]) => cn( (props))
}
