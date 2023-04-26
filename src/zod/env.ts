import { z } from 'zod';

export type EnvOptionsType = {
  isServer?: boolean;
  clientPrefix?: string;
  skipValidation?: boolean;
};

export function createValidatedEnv<
  P extends Record<string, unknown>,
  R extends z.ZodRawShape,
>(payload: P, rawShape: R, options: EnvOptionsType = {}) {
  const validator = z.object(rawShape);
  const {
    skipValidation,
    clientPrefix = 'NEXT_PUBLIC_',
    isServer = typeof window === 'undefined',
  } = options;
  const validated = stripServerVars(
    skipValidation
      ? (payload as unknown as z.infer<typeof validator>)
      : validatePayload(payload, validator),
    clientPrefix,
    isServer,
  );

  return new Proxy(validated, {
    get(target, prop) {
      if (typeof prop !== 'string') return undefined;
      if (!isServer && !prop.startsWith(clientPrefix)) {
        throw new Error(
          `❌ Attempted to access server-side environment variable '${prop}' on the client`,
        );
      }

      return target[prop];
    },
  });
}

function validatePayload<
  P extends Record<string, unknown>,
  V extends z.ZodTypeAny,
>(payload: P, validator: V): z.infer<V> {
  const parsed = validator.safeParse(payload);
  if (parsed.success === false) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors,
    );
    throw new Error('Invalid environment variables');
  }
  return parsed.data;
}

function stripServerVars<P extends Record<string, unknown>>(
  payload: P,
  prefix: string,
  isServer: boolean,
) {
  if (isServer) return payload;

  for (const [key] of Object.entries(payload)) {
    if (!key.startsWith(prefix)) {
      delete payload[key];
    }
  }

  return payload;
}
