import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { createValidatedEnv } from '.';

describe('ENV', () => {
  it('validates proper envs', () => {
    const successEnv = createValidatedEnv(testvars(), sharedRawSchema());

    expect(successEnv.NODE_ENV).equal('test');
    expect(successEnv.NEXT_PUBLIC_VAR).equal('demo');
    expect(successEnv.NUMBER).equal(69);
    expect(successEnv.BOOLEAN).toBeTruthy();
    expect(successEnv).to.not.have.key('NONEXISTENT');
  });

  it('errors on improper envs', () => {
    expect(() =>
      createValidatedEnv({}, sharedRawSchema()),
    ).toThrowErrorMatchingInlineSnapshot('"Invalid environment variables"');
  });

  it('errors getting server var on client', () => {
    expect(() => {
      const getter = createValidatedEnv(testvars(), sharedRawSchema(), {
        isServer: false,
      });

      // this show throw the error
      getter.NODE_ENV;
    }).toThrowErrorMatchingInlineSnapshot(
      '"❌ Attempted to access server-side environment variable \'NODE_ENV\' on the client"',
    );
  });
});

function sharedRawSchema() {
  return {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    NUMBER: z.number(),
    BOOLEAN: z.boolean(),
    NEXT_PUBLIC_VAR: z.string(),
  };
}

function testvars() {
  return {
    NODE_ENV: 'test',
    NUMBER: 69,
    BOOLEAN: true,
    NEXT_PUBLIC_VAR: 'demo',
    NONEXISTENT: 'NONEXISTENT',
  };
}
