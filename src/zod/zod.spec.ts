import { describe, expect, it } from 'vitest'
import { z } from 'zod'

import { propertiesToCamelCase } from '.'

describe('Zod', () => {
  it('converts object keys to camelCase', () => {
    const schema = z.object({
      'kebab-case': z.string().default('kebabCase'),
      'SCREAMING-KEBAB-CASE': z.string().default('screamingKebabCase'),
      snake_case: z.string().default('snakeCase'),
      camel_Snake_Case: z.string().default('camelSnakeCase'),
      Pascal_Snake_Case: z.string().default('pascalSnakeCase'),
      SCREAMING_SNAKE_CASE: z.string().default('screamingSnakeCase'),
      PascalCase: z.string().default('pascalCase'),
    })

    const parsed = propertiesToCamelCase(schema).parse({})
    expect(parsed).toMatchSnapshot()
  })
})
