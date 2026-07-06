// tests/imagePipeline.test.ts
// The source of truth for "correct". The WebP cases are written to fail
// until the feature is implemented during the Code step.
import { processFrame } from "../src/pipeline/imagePipeline";

// Minimal JPEG magic-byte header for a fake raw frame.
const RAW_JPEG = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10]);
// WebP files start with "RIFF" .... "WEBP".
const WEBP_MAGIC = [0x52, 0x49, 0x46, 0x46]; // "RIFF"

export function run(): void {
  // jpeg passthrough should work today
  const jpeg = processFrame(RAW_JPEG, { format: "jpeg" });
  assert(jpeg.length > 0, "jpeg passthrough returns bytes");

  // these should pass once WebP conversion is implemented
  const webp = processFrame(RAW_JPEG, { format: "webp" });
  assert(
    WEBP_MAGIC.every((b, i) => webp[i] === b),
    "output starts with RIFF/WEBP magic bytes",
  );

  console.log("all tests passed");
}

function assert(cond: boolean, msg: string): void {
  if (!cond) throw new Error(`FAILED: ${msg}`);
}
