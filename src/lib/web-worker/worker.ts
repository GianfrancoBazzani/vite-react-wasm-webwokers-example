import {
  default as init_wasm,
  greet
} from "./pkg/web_worker";

export type WorkerInputs = {
  initialize: boolean;
};

export type WorkerOutputs = {
  workerState: WorkerState;
};

export enum WorkerState {
  NON_INITIALIZED,
  INITIALIZED,
  MINED,
}

let workerState: WorkerState = WorkerState.NON_INITIALIZED;

self.onmessage = async (msg: MessageEvent<WorkerInputs>) => {
  const inputs: WorkerInputs = msg.data;

  if (inputs.initialize) {
    /** 1. Initialize wasam */
    await init_wasm();
    workerState++;
    self.postMessage({ workerState } as WorkerOutputs);
  } else if (workerState === WorkerState.INITIALIZED) {
    /** 2. Greet*/
    const greeting: string = greet();
    console.log("Web worker greet:", greeting);
  }
};
