# Build the wasm bin + js bindings for the web-worker
wasm-pack build --target web --release --no-pack
# Replace  hard-coded import statement in the generated js file with Vite Wasm import sytax https://vite.dev/guide/features.html#accessing-the-webassembly-module
sed -i '1i import wasmUrl from "./web_worker_bg.wasm?url"' pkg/web_worker.js
sed -i "s|new URL('web_worker_bg.wasm', import.meta.url);|wasmUrl|g" pkg/web_worker.js