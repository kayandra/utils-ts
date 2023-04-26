import camelCaseKeys from 'camelcase-keys'
import { CamelCasedPropertiesDeep } from 'type-fest'
import * as z from 'zod'

export const propertiesToCamelCase = <T extends z.ZodTypeAny>(
  zod: T,
): z.ZodEffects<z.infer<T>, CamelCasedPropertiesDeep<T['_output']>> =>
  zod.transform<CamelCasedPropertiesDeep<T>>((val) => camelCaseKeys(val))
