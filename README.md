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
