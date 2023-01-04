# node-module-benchmarker

[![node-module-benchmarker](https://github.com/pepicrft/node-module-benchmarker/actions/workflows/node-module-benchmarker.yml/badge.svg)](https://github.com/pepicrft/node-module-benchmarker/actions/workflows/node-module-benchmarker.yml)

## Usage

Install the dependency: `pnpm install -D node-module-benchmarker` and use the `node-module-benchmarker` executable instead of `node` specifying the output path with the environment variable `BENCHMARK_OUTPUT_PATH`.

For example, `BENCHMARK_OUTPUT_PATH=benchmark.json pnpm exec node-module-benchmarker src/index.js` instead of `node src/index.js`.
The tool will benchmark the time it takes to load the CJS and ESM modules, stop the execution after 5 seconds, and output the results.


## Development

### Setup

1. Clone the repository: `git clone https://github.com/pepicrft/node-module-benchmarker.git`.
2. Install dependencies: `pnpm install`.
3. Build: `pnpm build`
4. Test: `pnpm test`.

### System requirements

- [NodeJS](https://nodejs.org) 19.1.0
- [PNPM](https://pnpm.io) 7.17.0

## References

- [tsm loader](https://github.com/lukeed/tsm)
- [loaders documentation](https://nodejs.org/api/esm.html#loaders)
- [Trace Event Format](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/edit)
- [Chrome Tracing as Profiler Frontend](https://aras-p.info/blog/2017/01/23/Chrome-Tracing-as-Profiler-Frontend/)
- [ESBuild CJS loader](https://github.com/esbuild-kit/cjs-loader)
