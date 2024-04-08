// next.config.js

module.exports = {
    webpack: (config, { isServer }) => {
      // Exclude HTML files from being processed by webpack
      config.module.rules.push({
        test: /\.html$/,
        use: 'raw-loader', // You may need to install raw-loader
      });
  
      return config;
    },
  };
  