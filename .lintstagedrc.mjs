import micromatch from 'micromatch'

export default {
  '*.{ts,mjs,js}': (files) => {
    const match = micromatch.not(files, '**/classnames.ts')
    return `prettier --write ${match.join(' ')}`
  },
}
