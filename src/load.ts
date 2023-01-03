export const load: Load = async function (uri, context, fallback) {
  const benchmarkPath = process.env.BENCHMARK_PATH;
  const start = Date.now()
  const result = await fallback(uri, context, fallback)
  const end = Date.now()
  const payload = { uri, start, end}
  console.log(`BENCHMARK_MODULE_LOAD_TIME_START${JSON.stringify(payload)}BENCHMARK_MODULE_LOAD_TIME_END`)
  return result;
}
