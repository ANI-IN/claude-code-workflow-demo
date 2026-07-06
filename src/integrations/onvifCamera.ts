// src/integrations/onvifCamera.ts
// Pulls a raw JPEG snapshot from a camera over a TLS ONVIF endpoint.
export async function pullSnapshot(host: string, token: string): Promise<Uint8Array> {
  const url = `https://${host}/onvif/snapshot`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const buf = await res.arrayBuffer();
  return new Uint8Array(buf);
}
