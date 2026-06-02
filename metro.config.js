const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Apply NativeWind first
const finalConfig = withNativeWind(config, { input: "./src/global.css" });

// Lucide ships react-native + browser fields pointing to ESM (.mjs),
// which Metro cannot resolve on any platform. Redirect to the CJS bundle
// AFTER withNativeWind so our override isn't clobbered.
const previousResolve = finalConfig.resolver.resolveRequest;
finalConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "lucide-react-native") {
    return {
      filePath: path.resolve(
        __dirname,
        "node_modules/lucide-react-native/dist/cjs/lucide-react-native.js"
      ),
      type: "sourceFile",
    };
  }
  if (previousResolve) return previousResolve(context, moduleName, platform);
  return context.resolveRequest(context, moduleName, platform);
};

// Also let Metro parse .mjs files it may encounter in other packages
finalConfig.resolver.sourceExts = [
  "mjs",
  ...finalConfig.resolver.sourceExts,
];

module.exports = finalConfig;
