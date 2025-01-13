# minimal reproducible example  of [vite#19194](https://github.com/vitejs/vite/issues/19194)

## Steps to reproduce

1. clone [GianfrancoBazzani/vite-react-wasm-webwokers-example](https://github.com/GianfrancoBazzani/vite-react-wasm-webwokers-example)
2. `cd vite-react-wasm-webwokers-example`
3. `nvm use` to ensure node v20.18.0
4. `yarn` to install deps
5. `yarn build-wasm-worker` to build the wasm worker and the js bidings
6. `yarn build` to build the production page
7. `yarn dev` to start the dev server at http://localhost:5173/
8. `yarn preview` to start production preview at http://localhost:4173/
9. Press Greet from worker in both instances, you will see that in dev server the wasm worker is returning the string "Hello from the web worker!" while in prod is not  :(.

![image](https://github.com/user-attachments/assets/cc5dd46a-c12f-4fd6-8b23-6be0ba1a65e5)


## Update: Fix [`91560a4`](https://github.com/GianfrancoBazzani/vite-react-wasm-webwokers-example/commit/91560a41dd4eea7f3ea2da9cb7fc2ddcdaa0c43c)

The problem was that `wasm-pack` was generating local static urls for `.wasm` imports in `web_worker.js` artifact, Also, we were importing the worker as well with static hardcoded urls in `App.tsx`. Vite has specific import statements for both cases so for the bundler to handle them we need to use vite specific syntax.

1. [vite features Web Workers](https://vite.dev/guide/features.html#web-workers): ` import minerWorker from  "./lib/web-worker/worker.ts?worker";`
2. [vite features Accessing the WebAssembly Module ](https://vite.dev/guide/features.html#accessing-the-webassembly-module): `import wasmUrl from "./web_worker_bg.wasm?url"`