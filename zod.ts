import * as z from "zod";
import camelCaseKeys from "camelcase-keys";
import { CamelCasedPropertiesDeep } from "type-fest";

const zodToCamelCase = <T extends z.ZodTypeAny>(
  zod: T
): z.ZodEffects<z.infer<T>, CamelCasedPropertiesDeep<T["_output"]>> =>
  zod.transform((val) => camelCaseKeys(val) as CamelCasedPropertiesDeep<T>);
