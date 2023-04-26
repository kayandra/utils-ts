import { describe, expect, it } from 'vitest';

import { cva } from '.';

describe('CVA', () => {
  it('types are valid', () => {
    const cvaObject = cva(['basic'], {
      variants: { trigger: { true: 'classes' } },
    });

    expect(cvaObject({ trigger: true })).toMatchInlineSnapshot(
      '"basic classes"',
    );
  });
});
