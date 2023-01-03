#!/usr/bin/env node

process.removeAllListeners('warning')

import { run } from "../dist/node-esm-benchmark.js"

await run()
