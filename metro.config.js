const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const {
    resolver: { assetExts, sourceExts }
  } = await getDefaultConfig(__dirname)

  return {
    resolver: {
      sourceExts: [...sourceExts, 'mjs']
    },
  }
})()