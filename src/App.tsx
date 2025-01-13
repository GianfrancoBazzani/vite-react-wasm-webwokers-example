import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import type { WorkerInputs, WorkerOutputs } from "./lib/web-worker/worker.ts";
import { WorkerState } from "./lib/web-worker/worker.ts";

function App() {
  function greetFromWorker() {
    const url = new URL("./lib/web-worker/worker.ts", import.meta.url);
    const worker = new Worker(url, { type: "module" });

    worker.postMessage({ initialize: true } as WorkerInputs);

    worker.onmessage = (msg: MessageEvent<WorkerOutputs>) => {
      const outputs: WorkerOutputs = msg.data;
      if (outputs.workerState === WorkerState.INITIALIZED) {
        /**1. Initialize wasm*/
        worker.postMessage({});
      }
    };
  }
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => greetFromWorker()}>
          Greet from worker
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
