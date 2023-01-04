export const resolve: Resolve = async function (ident, context, fallback) {
  // We delegate resolving the module ID to the next loader
  const result = await fallback(ident, context, fallback);

  // Since the parent URL is not passed to the load function,
  // use the url attribute to carry that information to the loader.
  return { ...result, url: result.url };
};
