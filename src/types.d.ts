type Promisable<T> = Promise<T> | T;
type Source = string | SharedArrayBuffer | Uint8Array;
type Format = 'builtin' | 'commonjs' | 'json' | 'module' | 'wasm';

type Resolve = (
	ident: string,
	context: {
		conditions: string[];
		parentURL?: string;
	},
	fallback: Resolve
) => Promisable<{
	url: string;
	shortCircuit: boolean;
	format?: Format;
}>;

type Load = (
	url: string,
	context: { format?: Format },
	fallback: Load
) => Promisable<{
	format: Format;
	shortCircuit: boolean;
	source: Source;
}>;
