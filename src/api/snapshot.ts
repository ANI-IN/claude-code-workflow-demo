// src/api/snapshot.ts
// Public route: validates host, pulls a frame, runs it through the pipeline.
import { pullSnapshot } from "../integrations/onvifCamera";
import { processFrame } from "../pipeline/imagePipeline";

const HOST_PATTERN = /^[a-zA-Z0-9.-]+$/;

export async function handleSnapshot(host: string, token: string): Promise<Uint8Array> {
  if (!HOST_PATTERN.test(host)) {
    throw new Error("Invalid host");
  }
  const raw = await pullSnapshot(host, token);
  return processFrame(raw);
}
