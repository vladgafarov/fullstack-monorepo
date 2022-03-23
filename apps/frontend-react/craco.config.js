const path = require('path')
const { getLoader, loaderByName } = require('@craco/craco')
const absolutePath = path.join(__dirname, '../../packages/ui')

module.exports = {
   webpack: {
      alias: {
         '@components': 'src/components',
         '@api': 'src/api',
         '@public': 'public',
         '@lib': 'src/lib',
      },
      plugins: [],
      configure: {
         target: ['web', 'es5'],
         module: {
            rules: [
               {
                  exclude: [
                     path.resolve(__dirname, 'node_modules/react-table'),
                  ],
               },
            ],
         },
      },
      configure: (webpackConfig, { env, paths }) => {
         const { isFound, match } = getLoader(
            webpackConfig,
            loaderByName('babel-loader')
         )
         if (isFound) {
            const include = Array.isArray(match.loader.include)
               ? match.loader.include
               : [match.loader.include]
            match.loader.include = include.concat[absolutePath]
         }
         return webpackConfig
      },
   },
}
