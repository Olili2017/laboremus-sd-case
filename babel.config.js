module.exports = function (api) {
  api.cache(true)

  const presets = ['next/babel', '@babel/preset-env', '@babel/preset-react']
  const plugins = [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-runtime',
    [
      'styled-components',
      { ssr: false, displayName: true, preprocess: false },
    ],
  ]
  const env = {
    production: {
      plugins: [
        ['react-remove-properties', { properties: ['data-testid'] }],
      ],
    },
    test: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-modules-commonjs',
      ],
    },
  }

  return {
    presets,
    plugins,
    env,
  }
}
