let plugins = {
  autoprefixer: {},
  'rucksack-css': {},
};

if (process.env.NODE_ENV === 'production') {
  plugins = Object.assign({}, plugins, { cssnano: {} });
}

module.exports = {
  plugins: plugins,
};
