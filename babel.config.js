module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:react-native-dotenv'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            components: './src/components',
            constants: './src/constants',
            features: './src/features',
            navigation: './src/navigation',
            screens: './src/screens',
            services: './src/services',
            shared: './src/shared',
            state: './src/state',
            utils: './src/utils',
            assets: './assets',
          },
        },
      ],
    ],
  };
};
