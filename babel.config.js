module.exports = (env) => {
  env.cache(true);

  return {
    presets: [
      '@babel/typescript',
      [
        '@babel/env',
        {
          useBuiltIns: 'usage',
          targets: {
            browsers: 'Last 2 Chrome versions, Firefox ESR',
            node: '8.9',
          },
        },
      ],
      '@babel/react',
    ],
    plugins: [
      'lodash',
      ['babel-plugin-styled-components', { ssr: true }],
      ['babel-plugin-webpack-alias', { config: './webpack.config.resolve.js' }],
      '@babel/transform-runtime',
    ],
    env: {
      server: {
        plugins: ['dynamic-import-node'],
      },
      client: {
        plugins: ['dynamic-import-webpack'],
      },
      test: {
        presets: ['@babel/typescript', '@babel/env', '@babel/react'],
        plugins: [
          ['babel-plugin-styled-components', { ssr: true }],
          [
            'babel-plugin-webpack-alias',
            { config: './webpack.config.resolve.js' },
          ],
        ],
      },
    },
  };
};
