#!/usr/bin/env node

process.removeAllListeners("warning");

import { run } from "../dist/index.js";

await run();
