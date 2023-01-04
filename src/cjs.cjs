/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const Module = require("module");
const { pathToFileURL } = require("url");

const defaultTransformer = Module._extensions[".js"];

function transformer(module, filePath) {
  const start = Date.now();
  const result = defaultTransformer(module, filePath);
  const end = Date.now();
  const payload = { uri: pathToFileURL(filePath), start, end, type: "cjs" };
  console.log(`BENCHMARK_MODULE_LOAD_TIME_START${JSON.stringify(payload)}BENCHMARK_MODULE_LOAD_TIME_END`);
  return result;
}

const extensions = Module._extensions;
extensions[".js"] = transformer;

Object.defineProperty(extensions, ".mjs", {
  value: transformer,

  // Prevent Object.keys from detecting these extensions
  // when CJS loader iterates over the possible extensions
  enumerable: false,
});
