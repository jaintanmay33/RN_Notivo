module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // REQUIRED: Must be the LAST plugin in this array
      "react-native-reanimated/plugin",
    ],
  };
};
