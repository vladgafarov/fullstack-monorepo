module.exports = {
   extends: ['next', 'prettier', 'next/babel', 'next/core-web-vitals'],
   settings: {
      next: {
         rootDir: ['apps/*/', 'packages/*/'],
      },
   },
   rules: {
      '@next/next/no-html-link-for-pages': 'off',
   },
}
