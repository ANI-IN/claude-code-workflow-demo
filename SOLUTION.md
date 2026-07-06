# Reference Solution: WebP Conversion

This branch, `solution/webp-conversion`, holds the finished result of the lesson's exercise. It is the completed version of the Explore, Plan, Code, Commit demo, with WebP conversion implemented in the snapshot pipeline.

Use it only as a reference to compare against your own work. The `main` branch is the correct starting point, so do the exercise there first and check this branch afterward.

## What changed

The feature lives in `src/pipeline/imagePipeline.ts`:

- `processFrame(raw, { format: "webp" })` now returns WebP bytes instead of throwing.
- `encodeWebp` wraps the raw frame in a structurally valid `RIFF/WEBP` container, so the pipeline emits WebP output without pulling in a native dependency.
- `processFrameKeepingOriginal` returns both the original frame and the processed output, so the original is always available alongside the converted copy.
- The JPEG passthrough behaves exactly as before.

## Success criteria met

- `processFrame()` can return WebP bytes.
- The original frame is still available.
- `tests/imagePipeline.test.ts` passes: the JPEG passthrough case returns bytes, and the WebP case now starts with the `RIFF` magic bytes that begin every WebP file.

## How to run the tests

Install dependencies with `npm install`, which provides `ts-node` and `typescript`, then run:

```bash
npm test
```

On this branch the WebP case passes, so the run prints `all tests passed`.

## Note on the encoder

This demo builds a WebP container by hand so it stays self contained and matches the tiny fake frame used by the test suite. A production pipeline would hand the frame to a real WebP encoder, for example the sharp library, and encode actual image data. The teaching point is the workflow, not the codec.
