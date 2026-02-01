module.exports = function (options, webpack) {
  return {
    ...options,
    externals: {
      bcrypt: "commonjs bcrypt",
    },
    plugins: [
      ...options.plugins,
      new webpack.IgnorePlugin({
        resourceRegExp: /^(nock|mock-aws-s3)$/,
      }),
    ],
  };
};
