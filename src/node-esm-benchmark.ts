import {execa} from 'execa';
import chalk from 'chalk'
import {promises} from "fs";
import { fileURLToPath } from 'url';
import { dirname, relative } from 'path';
import {findUp, pathExists} from 'find-up';

export async function run() {
  const benchmarkOutputPath: string | undefined = process.env.BENCHMARK_OUTPUT_PATH;
  if (!benchmarkOutputPath) {
    console.error(chalk.bold.red(`The expected environment variable BENCHMARK_OUTPUT_PATH is missing`))
    process.exit(1);
  }

  const modules: {[uri: string]: { start: number, end: number, diff: number}} = {}
  const executableIndex = process.argv.findIndex((value) => value.includes("node-esm-benchmark"))
  let args = [...process.argv].slice(executableIndex + 1, process.argv.length)
  console.log(chalk.bold.green(`Benchmarking: ${args.join(" ")}`))
  args = [ '--loader', 'node-esm-benchmark', ...args]

  const nodeProcess = execa('node', args, {
    stdout: 'pipe',
    stderr: 'pipe',
    stdin: 'inherit'
  })
  nodeProcess.stdout.on('data', (message: string) => {
    const regex = /BENCHMARK_MODULE_LOAD_TIME_START(.+)BENCHMARK_MODULE_LOAD_TIME_END/
    const matches = message.toString().match(regex)
    if (matches) {
      const payload = JSON.parse(matches[1] as string)
      console.log(chalk.gray(`  Module loaded: ${payload.uri}`))
      modules[payload.uri] = { start: payload.start, end: payload.end, diff: parseFloat(payload.end) - parseFloat(payload.start)}
    }
  })
  nodeProcess.stderr.on('data', (message: string) => {
    process.stderr.write(message)
  })
  await nodeProcess
  const fileContent = {
    traceEvents: await Promise.all(Object.keys(modules).map(async (uri) => {
      return {
        ...(await eventMetadata(uri)),
        ts: modules[uri]?.start,
        dur: modules[uri]?.diff,
        ph: 'X',
        args: {
          ms: modules[uri]?.diff
        }
      }
    })),
    displayTimeUnit: 'ms'
  }
  await promises.writeFile(benchmarkOutputPath, JSON.stringify(fileContent, null, 2))
}

async function eventMetadata(uri: string): Promise<any> {
  if (!uri.includes("file://")) { return {pid: 'node', name: uri} }
  const path = fileURLToPath(uri)
  const packageJsonPath = await findUp('package.json', {cwd: path}) as string
  const packageJson = await promises.readFile(packageJsonPath)
  const packageName = JSON.parse(packageJson.toString())['name']
  const id = `${packageName}:${relative(dirname(packageJsonPath), path)}`
  return { pid: packageName, tid: id, name: id}
}
