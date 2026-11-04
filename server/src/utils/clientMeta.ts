import type { Request } from "express";
import { createHash } from "crypto";

export function buildClientMeta(req: Request) {
  const ip = req.ip ?? req.socket.remoteAddress ?? "";
  const ipHash = ip
    ? createHash("sha256").update(ip).digest("hex").slice(0, 16)
    : undefined;
  const userAgent = req.get("user-agent");
  return {
    ipHash,
    userAgent: userAgent ? userAgent.slice(0, 200) : undefined,
  };
}
