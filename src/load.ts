export const load: Load = async function (uri, context, fallback) {
  const benchmarkPath = process.env.BENCHMARK_PATH;


  const result = await fallback(uri, context, fallback)

  return result;
}
