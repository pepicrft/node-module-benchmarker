export const resolve: Resolve = async function (ident, context, fallback) {
  // We delegate resolving the module ID to the next loader
  return fallback(ident, context, fallback);
};
