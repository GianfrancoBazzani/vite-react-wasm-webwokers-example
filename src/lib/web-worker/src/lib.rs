use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greet() -> String {
    return "Hello from the web worker!".to_string();
}
