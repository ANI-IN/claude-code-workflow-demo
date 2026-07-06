// src/pipeline/imagePipeline.ts
// Frame processing. Today it only resizes/returns the raw JPEG bytes.
//
// FEATURE TASK (for the Explore -> Plan -> Code -> Commit demo):
// Add WebP conversion here. The snapshot pipeline should be able to
// return a WebP-encoded frame while preserving the original.
//
// Success criteria:
//   - processFrame() can return WebP bytes.
//   - The original frame is still available.
//   - tests/imagePipeline.test.ts passes.

export interface FrameOptions {
  format?: "jpeg" | "webp"; // webp not implemented yet
}

export function processFrame(raw: Uint8Array, options: FrameOptions = {}): Uint8Array {
  const format = options.format ?? "jpeg";
  if (format === "webp") {
    throw new Error("WebP conversion not implemented yet");
  }
  // passthrough for jpeg today
  return raw;
}
